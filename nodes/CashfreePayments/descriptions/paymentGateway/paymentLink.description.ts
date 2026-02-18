import type { INodeProperties } from 'n8n-workflow';

export const paymentLinkFields: INodeProperties[] = [
	// Required fields
	{
		displayName: 'Customer Email',
		name: 'customer_email',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		required: true,
		description: 'Customer email address',
	},
	{
		displayName: 'Customer Phone',
		name: 'customer_phone',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		required: true,
		description: 'Customer phone number',
	},
	{
		displayName: 'Link ID',
		name: 'link_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		required: true,
		description: 'Unique identifier for the payment link',
	},
	{
		displayName: 'Link Amount',
		name: 'link_amount',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: 100,
		required: true,
		description: 'Payment link amount',
	},
	{
		displayName: 'Link Purpose',
		name: 'link_purpose',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		required: true,
		description: 'Purpose of the payment link',
	},

	// Optional fields
	{
		displayName: 'Customer Name',
		name: 'customer_name',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Customer name (optional)',
	},
	{
		displayName: 'Link Currency',
		name: 'link_currency',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: 'INR',
		description: 'Payment currency (defaults to INR) (optional)',
	},
	{
		displayName: 'Customer Bank Account Number',
		name: 'customer_bank_account_number',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Customer bank account number (optional)',
	},
	{
		displayName: 'Customer Bank IFSC Code',
		name: 'customer_bank_ifsc',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Customer bank IFSC code (optional)',
	},
	{
		displayName: 'Customer Bank Code',
		name: 'customer_bank_code',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Customer bank code (optional)',
	},
	{
		displayName: 'Link Expiry Time',
		name: 'link_expiry_time',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'ISO 8601 format. Example: 2021-07-02T10:20:12+05:30 (optional)',
		placeholder: 'YYYY-MM-DDTHH:MM:SS+05:30',
	},
	{
		displayName: 'Return URL',
		name: 'return_url',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'URL to redirect after payment completion (optional)',
	},
	{
		displayName: 'Notify URL',
		name: 'notify_url',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Webhook URL for payment notifications (optional)',
	},
	{
		displayName: 'Payment Methods',
		name: 'payment_methods',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Allowed payment modes. Comma-separated: cc,dc,upi,nb (optional)',
		placeholder: 'cc,dc,upi,nb',
	},
	{
		displayName: 'Allow UPI Intent',
		name: 'upi_intent',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: false,
		description: 'Whether to enable UPI intent flow (optional)',
	},
	{
		displayName: 'Link Notes',
		name: 'link_notes',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '{}',
		description: 'Custom key-value pairs for internal tracking (optional)',
		placeholder: '{"order_id": "ORD123"}',
	},
	{
		displayName: 'Idempotency Key',
		name: 'payment_link_idempotency_key',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createPaymentLink'],
			},
		},
		default: '',
		description: 'Unique identifier for safe retries (optional)',
		placeholder: 'UUID format recommended',
	},
];

