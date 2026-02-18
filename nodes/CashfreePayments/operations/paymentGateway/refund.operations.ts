import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { getPaymentGatewayBaseUrl } from '../../utils/constants';

/**
 * Create Refund Operation
 */
export async function createRefund(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	const orderId = this.getNodeParameter('refund_order_id', index) as string;
	const refundAmount = this.getNodeParameter('refund_amount', index) as number;
	const refundId = this.getNodeParameter('refund_id', index) as string;
	const refundNote = this.getNodeParameter('refund_note', index) as string;
	const refundSpeed = this.getNodeParameter('refund_speed', index) as string;
	const xRequestId = this.getNodeParameter('x_request_id', index, '') as string;
	const xIdempotencyKey = this.getNodeParameter('x_idempotency_key', index, '') as string;

	const body = {
		refund_amount: refundAmount,
		refund_id: refundId,
		refund_note: refundNote,
		refund_speed: refundSpeed,
	};

	const headers: any = {
		'Content-Type': 'application/json',
		'x-api-version': credentials.apiVersion || '2025-01-01',
		'x-client-id': credentials.clientId,
		'x-client-secret': credentials.clientSecret,
	};

	if (xRequestId) headers['x-request-id'] = xRequestId;
	if (xIdempotencyKey) headers['x-idempotency-key'] = xIdempotencyKey;

	const baseUrl = getPaymentGatewayBaseUrl(credentials.environment);

	try {
		const response = await this.helpers.httpRequest({
			method: 'POST',
			url: `${baseUrl}/orders/${orderId}/refunds`,
			headers,
			body,
			json: true,
		});

		return {
			json: response,
			pairedItem: { item: index },
		};
	} catch (error: any) {
		const errorData = error.response?.body || error.response?.data || error.message;
		const statusCode = error.response?.statusCode || error.statusCode;

		throw new Error(
			`Cashfree Create Refund Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

/**
 * Get All Refunds for Order Operation
 */
export async function getAllRefundsForOrder(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	const orderId = this.getNodeParameter('get_refunds_order_id', index) as string;
	const requestId = this.getNodeParameter('get_refunds_request_id', index, '') as string;
	const idempotencyKey = this.getNodeParameter('get_refunds_idempotency_key', index, '') as string;

	const headers: any = {
		'x-api-version': credentials.apiVersion || '2025-01-01',
		'x-client-id': credentials.clientId,
		'x-client-secret': credentials.clientSecret,
	};

	if (requestId) headers['x-request-id'] = requestId;
	if (idempotencyKey) headers['x-idempotency-key'] = idempotencyKey;

	const baseUrl = getPaymentGatewayBaseUrl(credentials.environment);

	try {
		const response = await this.helpers.httpRequest({
			method: 'GET',
			url: `${baseUrl}/orders/${orderId}/refunds`,
			headers,
			json: true,
		});

		return {
			json: response,
			pairedItem: { item: index },
		};
	} catch (error: any) {
		const errorData = error.response?.body || error.response?.data || error.message;
		const statusCode = error.response?.statusCode || error.statusCode;

		throw new Error(
			`Cashfree Get All Refunds Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

