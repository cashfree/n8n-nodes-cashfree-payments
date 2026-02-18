import type { INodeProperties } from 'n8n-workflow';

export const orderFields: INodeProperties[] = [
	{
		displayName: 'Order Amount',
		name: 'orderAmount',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: 0,
		required: true,
		description: 'Order amount in the specified currency',
	},
	{
		displayName: 'Order Currency',
		name: 'orderCurrency',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: 'INR',
		required: true,
		description: 'Currency code (e.g., INR, USD)',
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		required: true,
		description: 'Unique customer identifier',
	},
	{
		displayName: 'Customer Phone',
		name: 'customerPhone',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		required: true,
		description: 'Customer phone number',
	},
	{
		displayName: 'Customer Email',
		name: 'customer_email_order',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		description: 'Customer email address (optional)',
	},
	{
		displayName: 'Customer Name',
		name: 'customer_name_order',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		description: 'Customer name (optional)',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		description: 'Custom order ID (optional)',
	},
	{
		displayName: 'Order Note',
		name: 'order_note',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		description: 'Additional notes for the order (optional)',
	},
	{
		displayName: 'Return URL',
		name: 'return_url_order',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		description: 'URL to redirect after payment (optional)',
	},
	{
		displayName: 'Notify URL',
		name: 'notify_url_order',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createOrder'],
			},
		},
		default: '',
		description: 'Webhook URL for payment notifications (optional)',
	},
];

