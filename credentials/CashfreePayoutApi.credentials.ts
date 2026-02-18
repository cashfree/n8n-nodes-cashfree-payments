import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

import { cashfreePayoutApiTest } from './CashfreePayoutApi.credentials.test';

export class CashfreePayoutApi implements ICredentialType {
	name = 'cashfreePayoutApi';

	displayName = 'Cashfree Payout API';

	documentationUrl = 'https://docs.cashfree.com/reference/payout-api-overview';

	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
				{
					name: 'Production',
					value: 'production',
				},
			],
			default: 'sandbox',
			required: true,
			description: 'Environment to use for API calls',
		},
		{
			displayName: 'Client ID',
			name: 'payoutClientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Client ID for Cashfree Payout API',
		},
		{
			displayName: 'Client Secret',
			name: 'payoutClientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Client Secret for Cashfree Payout API',
		},
		{
			displayName: 'Public Key',
			name: 'payoutPublicKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Public Key for Cashfree Payout API. Include the full key with headers (-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----)',
		},
	];

	// Note: Authentication is handled manually in the node using token-based auth
	// because payout API requires encrypted signature generation for token retrieval

	test = cashfreePayoutApiTest as any;
}

