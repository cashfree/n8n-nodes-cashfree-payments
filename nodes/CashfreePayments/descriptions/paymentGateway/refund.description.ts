import type { INodeProperties } from 'n8n-workflow';

export const refundFields: INodeProperties[] = [
	// Create Refund fields
	{
		displayName: 'Order ID',
		name: 'refund_order_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: '',
		required: true,
		description: 'The order ID for which refund is to be created',
	},
	{
		displayName: 'Refund Amount',
		name: 'refund_amount',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: 1,
		required: true,
		description: 'Amount to be refunded',
	},
	{
		displayName: 'Refund ID',
		name: 'refund_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: '',
		required: true,
		description: 'Unique refund identifier',
	},
	{
		displayName: 'Refund Speed',
		name: 'refund_speed',
		type: 'options',
		options: [
			{
				name: 'Standard',
				value: 'STANDARD',
			},
			{
				name: 'Instant',
				value: 'INSTANT',
			},
		],
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: 'STANDARD',
		description: 'Refund processing speed',
	},
	{
		displayName: 'Refund Note',
		name: 'refund_note',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: '',
		description: 'Note for the refund (optional)',
	},
	{
		displayName: 'Request ID',
		name: 'x_request_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: '',
		description: 'Request ID for tracking (optional)',
	},
	{
		displayName: 'Idempotency Key',
		name: 'x_idempotency_key',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createRefund'],
			},
		},
		default: '',
		description: 'Idempotency key for safe retries (optional)',
		placeholder: 'UUID format recommended',
	},

	// Get All Refunds fields
	{
		displayName: 'Order ID',
		name: 'get_refunds_order_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getAllRefundsForOrder'],
			},
		},
		default: '',
		required: true,
		description: 'The order ID to fetch refunds for',
	},
	{
		displayName: 'Request ID',
		name: 'get_refunds_request_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getAllRefundsForOrder'],
			},
		},
		default: '',
		description: 'Request ID for tracking (optional)',
	},
	{
		displayName: 'Idempotency Key',
		name: 'get_refunds_idempotency_key',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getAllRefundsForOrder'],
			},
		},
		default: '',
		description: 'Idempotency key for safe retries (optional)',
		placeholder: 'UUID format recommended',
	},
];

