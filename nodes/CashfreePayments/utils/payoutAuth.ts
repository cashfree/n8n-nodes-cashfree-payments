import * as crypto from 'crypto';
import { getPayoutBaseUrl, API_ENDPOINTS } from './constants';

/**
 * Generate encrypted signature for payout authentication
 */
export function generateEncryptedSignature(clientIdWithTimestamp: string, publicKeyContent: string): string {
	try {
		// Clean the public key content - remove headers, footers, and ALL whitespace
		const cleanedPublicKey = publicKeyContent
			.replace(/-----BEGIN PUBLIC KEY-----/g, '')
			.replace(/-----END PUBLIC KEY-----/g, '')
			.replace(/\s+/g, '');

		// Create public key from base64 decoded bytes
		const publicKey = crypto.createPublicKey({
			key: Buffer.from(cleanedPublicKey, 'base64'),
			format: 'der',
			type: 'spki',
		});

		// Use OAEP with SHA-1 padding
		const encryptedData = crypto.publicEncrypt(
			{
				key: publicKey,
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: 'sha1',
			},
			Buffer.from(clientIdWithTimestamp, 'utf8')
		);

		return encryptedData.toString('base64');
	} catch (error) {
		throw new Error(`Failed to generate signature: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

/**
 * Create client ID with timestamp
 */
export function createClientIdWithTimestamp(clientId: string): string {
	const epochTimestamp = Math.floor(Date.now() / 1000);
	return `${clientId}.${epochTimestamp}`;
}

/**
 * Get authorization token for payout operations
 */
export async function getPayoutAuthToken(
	clientId: string,
	clientSecret: string,
	publicKey: string,
	environment: string
): Promise<string> {
	try {
		// Validate inputs
		if (!clientId || clientId.trim() === '') {
			throw new Error('Payout Client ID is empty or missing');
		}
		if (!clientSecret || clientSecret.trim() === '') {
			throw new Error('Payout Client Secret is empty or missing');
		}
		if (!publicKey || publicKey.trim() === '') {
			throw new Error('Payout Public Key is empty or missing');
		}

		const clientIdWithTimestamp = createClientIdWithTimestamp(clientId);
		const signature = generateEncryptedSignature(clientIdWithTimestamp, publicKey);

		const baseUrl = getPayoutBaseUrl(environment);

		const response = await fetch(`${baseUrl}${API_ENDPOINTS.PAYOUT.AUTHORIZE}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Client-Id': clientId.trim(),
				'X-Client-Secret': clientSecret.trim(),
				'X-Cf-Signature': signature,
			},
		});

		if (!response.ok) {
			const errorData = await response.text();
			throw new Error(`Authorization failed: ${response.status} - ${errorData}`);
		}

		const authData: any = await response.json();

		// Extract token from SUCCESS response
		if (authData.status === 'SUCCESS' && authData.data && authData.data.token) {
			return authData.data.token;
		}

		// Handle error responses
		if (authData.status === 'ERROR') {
			throw new Error(`Cashfree API Error: ${authData.message} (${authData.subCode})`);
		}

		throw new Error(`No valid token found in authorization response: ${JSON.stringify(authData)}`);
	} catch (error) {
		throw new Error(`Failed to get authorization token: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

