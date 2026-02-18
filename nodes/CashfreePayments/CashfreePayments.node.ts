import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

// Import operations
import { createOrder } from './operations/paymentGateway/order.operations';
import {
	createPaymentLink,
	cancelPaymentLink,
	fetchPaymentLinkDetails,
	getOrdersForPaymentLink
} from './operations/paymentGateway/paymentLink.operations';
import { createRefund, getAllRefundsForOrder } from './operations/paymentGateway/refund.operations';
import { createCashgram, deactivateCashgram } from './operations/payout/cashgram.operations';

// Import descriptions
import { orderFields } from './descriptions/paymentGateway/order.description';
import { paymentLinkFields } from './descriptions/paymentGateway/paymentLink.description';
import { refundFields } from './descriptions/paymentGateway/refund.description';
import { cashgramFields } from './descriptions/payout/cashgram.description';

export class CashfreePayments implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cashfree Payments',
		name: 'cashfreePayments',
		icon: 'file:icon1.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with Cashfree Payments API',
		defaults: {
			name: 'Cashfree Payments',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cashfreePaymentGatewayApi',
				required: false,
				displayOptions: {
					show: {
						operation: [
							'createOrder',
							'createPaymentLink',
							'cancelPaymentLink',
							'fetchPaymentLinkDetails',
							'getOrdersForPaymentLink',
							'createRefund',
							'getAllRefundsForOrder',
						],
					},
				},
			},
			{
				name: 'cashfreePayoutApi',
				required: false,
				displayOptions: {
					show: {
						operation: [
							'createCashgram',
							'deactivateCashgram',
						],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Payment Link',
						value: 'paymentLink',
					},
					{
						name: 'Refund',
						value: 'refund',
					},
					{
						name: 'Cashgram',
						value: 'cashgram',
					},
				],
				default: 'order',
				noDataExpression: true,
				description: 'The resource to operate on',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['order'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'createOrder',
						description: 'Create a new order',
						action: 'Create an order',
					},
				],
				default: 'createOrder',
				noDataExpression: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['paymentLink'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'createPaymentLink',
						description: 'Create a payment link',
						action: 'Create a payment link',
					},
					{
						name: 'Cancel',
						value: 'cancelPaymentLink',
						description: 'Cancel an existing payment link',
						action: 'Cancel a payment link',
					},
					{
						name: 'Get Details',
						value: 'fetchPaymentLinkDetails',
						description: 'Fetch payment link details',
						action: 'Get payment link details',
					},
					{
						name: 'Get Orders',
						value: 'getOrdersForPaymentLink',
						description: 'Get orders for a payment link',
						action: 'Get orders for payment link',
					},
				],
				default: 'createPaymentLink',
				noDataExpression: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['refund'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'createRefund',
						description: 'Create a refund for an order',
						action: 'Create a refund',
					},
					{
						name: 'Get All',
						value: 'getAllRefundsForOrder',
						description: 'Get all refunds for an order',
						action: 'Get all refunds for order',
					},
				],
				default: 'createRefund',
				noDataExpression: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['cashgram'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'createCashgram',
						description: 'Create a Cashgram payout link',
						action: 'Create a cashgram',
					},
					{
						name: 'Deactivate',
						value: 'deactivateCashgram',
						description: 'Deactivate a Cashgram payout link',
						action: 'Deactivate a cashgram',
					},
				],
				default: 'createCashgram',
				noDataExpression: true,
			},
			// Add all field descriptions
			...orderFields,
			...paymentLinkFields,
			...refundFields,
			...cashgramFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				// Determine which credentials to use based on operation
				let credentials: any;

				if (operation === 'createCashgram' || operation === 'deactivateCashgram') {
					// Payout operations
					credentials = await this.getCredentials('cashfreePayoutApi');
					if (!credentials.payoutClientId || !credentials.payoutClientSecret || !credentials.payoutPublicKey) {
						throw new Error('Payout Client ID, Client Secret, and Public Key are required for Cashgram operations.');
					}
				} else {
					// Payment Gateway operations
					credentials = await this.getCredentials('cashfreePaymentGatewayApi');
					if (!credentials.clientId || !credentials.clientSecret) {
						throw new Error('Client ID and Client Secret are required for Payment Gateway operations.');
					}
				}

				let result: INodeExecutionData;

				// Route to appropriate operation handler
				switch (operation) {
					case 'createOrder':
						result = await createOrder.call(this, i, credentials);
						break;

					case 'createPaymentLink':
						result = await createPaymentLink.call(this, i, credentials);
						break;

					case 'cancelPaymentLink':
						result = await cancelPaymentLink.call(this, i, credentials);
						break;

					case 'fetchPaymentLinkDetails':
						result = await fetchPaymentLinkDetails.call(this, i, credentials);
						break;

					case 'getOrdersForPaymentLink':
						result = await getOrdersForPaymentLink.call(this, i, credentials);
						break;

					case 'createRefund':
						result = await createRefund.call(this, i, credentials);
						break;

					case 'getAllRefundsForOrder':
						result = await getAllRefundsForOrder.call(this, i, credentials);
						break;

					case 'createCashgram':
						result = await createCashgram.call(this, i, credentials);
						break;

					case 'deactivateCashgram':
						result = await deactivateCashgram.call(this, i, credentials);
						break;

					default:
						throw new Error(`Operation "${operation}" is not implemented`);
				}

				returnData.push(result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : 'Unknown error occurred',
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

