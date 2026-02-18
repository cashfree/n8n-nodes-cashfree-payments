import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CashfreePaymentGatewayApi implements ICredentialType {
	name = 'cashfreePaymentGatewayApi';

	displayName = 'Cashfree Payment Gateway API';

	documentationUrl = 'https://docs.cashfree.com/reference/pg-new-apis-endpoint';

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
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Cashfree Payment Gateway Client ID',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Cashfree Payment Gateway Client Secret',
		},
		{
			displayName: 'API Version',
			name: 'apiVersion',
			type: 'string',
			default: '2025-01-01',
			required: false,
			description: 'API Version for Payment Gateway operations',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-client-id': '={{$credentials.clientId}}',
				'x-client-secret': '={{$credentials.clientSecret}}',
				'x-api-version': '={{$credentials.apiVersion || "2025-01-01"}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? "https://api.cashfree.com" : "https://sandbox.cashfree.com"}}',
			url: '/pg/incident',
			method: 'GET',
		},
	};
}

