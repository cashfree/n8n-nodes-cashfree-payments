import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { getPayoutAuthToken } from '../../utils/payoutAuth';
import { getPayoutBaseUrl } from '../../utils/constants';

/**
 * Create Cashgram Operation
 */
export async function createCashgram(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	// Get payout authorization token
	const authToken = await getPayoutAuthToken(
		String(credentials.payoutClientId).trim(),
		String(credentials.payoutClientSecret).trim(),
		credentials.payoutPublicKey as string,
		credentials.environment as string
	);

	const cashgramData = {
		cashgramId: this.getNodeParameter('cashgram_id', index) as string,
		amount: this.getNodeParameter('cashgram_amount', index) as number,
		name: this.getNodeParameter('cashgram_name', index) as string,
		email: this.getNodeParameter('cashgram_email', index) as string,
		phone: this.getNodeParameter('cashgram_phone', index) as string,
		linkExpiry: this.getNodeParameter('cashgram_link_expiry', index) as string,
		remarks: this.getNodeParameter('cashgram_remarks', index) as string,
		notifyCustomer: this.getNodeParameter('cashgram_notify_customer', index) as number,
	};

	const payoutBaseUrl = getPayoutBaseUrl(credentials.environment as string);

	const response = await fetch(`${payoutBaseUrl}/payout/v1/createCashgram`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify({
			cashgramId: cashgramData.cashgramId,
			amount: cashgramData.amount,
			name: cashgramData.name,
			email: cashgramData.email,
			phone: cashgramData.phone,
			linkExpiry: cashgramData.linkExpiry,
			remarks: cashgramData.remarks,
			notifyCustomer: cashgramData.notifyCustomer
		}),
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(`Cashgram creation failed: ${response.status} - ${errorData}`);
	}

	const responseData = await response.json() as IDataObject;

	return {
		json: responseData,
		pairedItem: { item: index },
	};
}

/**
 * Deactivate Cashgram Operation
 */
export async function deactivateCashgram(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	// Get payout authorization token
	const authToken = await getPayoutAuthToken(
		credentials.payoutClientId as string,
		credentials.payoutClientSecret as string,
		credentials.payoutPublicKey as string,
		credentials.environment as string
	);

	const cashgramId = this.getNodeParameter('deactivate_cashgram_id', index) as string;

	const payoutBaseUrl = getPayoutBaseUrl(credentials.environment as string);

	const response = await fetch(`${payoutBaseUrl}/payout/v1/deactivateCashgram`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify({
			cashgramId: cashgramId,
		}),
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(`Cashgram deactivation failed: ${response.status} - ${errorData}`);
	}

	const responseData = await response.json() as IDataObject;

	return {
		json: responseData,
		pairedItem: { item: index },
	};
}

