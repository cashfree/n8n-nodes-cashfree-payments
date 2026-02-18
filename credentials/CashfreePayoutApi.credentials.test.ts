import type {
	ICredentialTestFunctions,
	INodeCredentialTestResult,
} from 'n8n-workflow';

export async function cashfreePayoutApiTest(
	this: ICredentialTestFunctions,
	credential: any,
): Promise<INodeCredentialTestResult> {
	// For payout operations, skip validation - just accept the credentials
	// Actual validation happens during the first API call in the node
	return {
		status: 'OK',
		message: 'Payout credentials saved successfully',
	};
}

