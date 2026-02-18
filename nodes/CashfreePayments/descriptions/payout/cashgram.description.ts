import type { INodeProperties } from 'n8n-workflow';

export const cashgramFields: INodeProperties[] = [
	// Create Cashgram fields
	{
		displayName: 'Cashgram ID',
		name: 'cashgram_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: '',
		required: true,
		placeholder: 'CG_001',
		description: 'Unique identifier for the Cashgram',
	},
	{
		displayName: 'Amount',
		name: 'cashgram_amount',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: 1,
		required: true,
		description: 'Amount in INR',
	},
	{
		displayName: 'Name',
		name: 'cashgram_name',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient name',
	},
	{
		displayName: 'Email',
		name: 'cashgram_email',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient email address',
	},
	{
		displayName: 'Phone',
		name: 'cashgram_phone',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: '',
		required: true,
		description: 'Recipient phone number',
	},
	{
		displayName: 'Link Expiry',
		name: 'cashgram_link_expiry',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: '',
		required: true,
		description: 'Link expiry date/time',
		placeholder: 'YYYY-MM-DD HH:MM:SS',
	},
	{
		displayName: 'Remarks',
		name: 'cashgram_remarks',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: '',
		required: true,
		description: 'Remarks or note for the Cashgram',
	},
	{
		displayName: 'Notify Customer',
		name: 'cashgram_notify_customer',
		type: 'options',
		options: [
			{
				name: 'Yes',
				value: 1,
			},
			{
				name: 'No',
				value: 0,
			},
		],
		displayOptions: {
			show: {
				operation: ['createCashgram'],
			},
		},
		default: 1,
		description: 'Whether to notify the customer about the Cashgram',
	},

	// Deactivate Cashgram fields
	{
		displayName: 'Cashgram ID',
		name: 'deactivate_cashgram_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['deactivateCashgram'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the Cashgram to deactivate',
	},
];

