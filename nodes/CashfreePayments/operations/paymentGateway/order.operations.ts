import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { getPaymentGatewayBaseUrl } from '../../utils/constants';

/**
 * Create Order Operation
 */
export async function createOrder(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	const orderAmount = this.getNodeParameter('orderAmount', index) as number;
	const orderCurrency = this.getNodeParameter('orderCurrency', index) as string;
	const customerId = this.getNodeParameter('customerId', index) as string;
	const customerPhone = this.getNodeParameter('customerPhone', index) as string;

	// Build customer_details object
	const customerDetails: any = {
		customer_id: customerId,
		customer_phone: customerPhone,
	};

	// Add optional customer fields if provided
	const customerEmail = this.getNodeParameter('customer_email_order', index, '') as string;
	const customerName = this.getNodeParameter('customer_name_order', index, '') as string;

	if (customerEmail && customerEmail.trim() !== '') customerDetails.customer_email = customerEmail;
	if (customerName && customerName.trim() !== '') customerDetails.customer_name = customerName;

	// Build main order body
	const body: any = {
		order_currency: orderCurrency,
		order_amount: orderAmount,
		customer_details: customerDetails,
	};

	// Add optional order fields if provided
	const orderId = this.getNodeParameter('order_id', index, '') as string;
	const orderNote = this.getNodeParameter('order_note', index, '') as string;
	const returnUrl = this.getNodeParameter('return_url_order', index, '') as string;
	const notifyUrl = this.getNodeParameter('notify_url_order', index, '') as string;

	if (orderId) body.order_id = orderId;
	if (orderNote) body.order_note = orderNote;
	if (returnUrl) body.return_url = returnUrl;
	if (notifyUrl) body.notify_url = notifyUrl;

	// Prepare headers
	const headers: any = {
		'Content-Type': 'application/json',
		'x-api-version': credentials.apiVersion || '2025-01-01',
		'x-client-id': credentials.clientId,
		'x-client-secret': credentials.clientSecret,
	};

	const baseUrl = getPaymentGatewayBaseUrl(credentials.environment);

	try {
		const response = await this.helpers.httpRequest({
			method: 'POST',
			url: `${baseUrl}/orders`,
			headers,
			body,
			json: true,
		});

		return {
			json: response,
			pairedItem: { item: index },
		};
	} catch (error: any) {
		// Provide detailed error information for debugging
		const errorData = error.response?.body || error.response?.data || error.message;
		const statusCode = error.response?.statusCode || error.statusCode;

		throw new Error(
			`Cashfree API Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

