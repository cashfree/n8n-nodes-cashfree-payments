import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { getPaymentGatewayBaseUrl } from '../../utils/constants';

/**
 * Create Payment Link Operation
 */
export async function createPaymentLink(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	// Get link notes as JSON object
	let linkNotes: any = {};
	try {
		const linkNotesParam = this.getNodeParameter('link_notes', index, '{}') as string;
		linkNotes = typeof linkNotesParam === 'string' ? JSON.parse(linkNotesParam) : linkNotesParam;
	} catch (error) {
		throw new Error(`Invalid JSON format for link_notes: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}

	const paymentLinkIdempotencyKey = this.getNodeParameter('payment_link_idempotency_key', index, '') as string;

	const body: any = {
		customer_details: {
			customer_email: this.getNodeParameter('customer_email', index, '') as string,
			customer_name: this.getNodeParameter('customer_name', index, '') as string,
			customer_phone: this.getNodeParameter('customer_phone', index, '') as string,
			customer_bank_account_number: this.getNodeParameter('customer_bank_account_number', index, '') as string,
			customer_bank_ifsc: this.getNodeParameter('customer_bank_ifsc', index, '') as string,
			customer_bank_code: this.getNodeParameter('customer_bank_code', index, '') as string,
		},
		link_amount: this.getNodeParameter('link_amount', index) as number,
		link_currency: this.getNodeParameter('link_currency', index, 'INR') as string,
		link_id: this.getNodeParameter('link_id', index) as string,
		link_purpose: this.getNodeParameter('link_purpose', index) as string,
		link_expiry_time: this.getNodeParameter('link_expiry_time', index, '') as string,
		link_meta: {
			notify_url: this.getNodeParameter('notify_url', index) as string,
			return_url: this.getNodeParameter('return_url', index) as string,
			payment_methods: this.getNodeParameter('payment_methods', index) as string,
			upi_intent: this.getNodeParameter('upi_intent', index) as boolean,
		},
		link_notes: linkNotes,
	};

	// Remove empty fields
	if (!body.link_expiry_time) delete body.link_expiry_time;
	if (!body.link_meta.payment_methods) delete body.link_meta.payment_methods;
	if (!body.customer_details.customer_bank_account_number || body.customer_details.customer_bank_account_number.trim() === '') delete body.customer_details.customer_bank_account_number;
	if (!body.customer_details.customer_bank_ifsc || body.customer_details.customer_bank_ifsc.trim() === '') delete body.customer_details.customer_bank_ifsc;
	if (!body.customer_details.customer_bank_code || body.customer_details.customer_bank_code.trim() === '') delete body.customer_details.customer_bank_code;

	// Prepare headers
	const headers: any = {
		'Content-Type': 'application/json',
		'x-api-version': credentials.apiVersion || '2025-01-01',
		'x-client-id': credentials.clientId,
		'x-client-secret': credentials.clientSecret,
	};

	// Add idempotency key to headers if provided
	if (paymentLinkIdempotencyKey) {
		headers['x-idempotency-key'] = paymentLinkIdempotencyKey;
	}

	const baseUrl = getPaymentGatewayBaseUrl(credentials.environment);

	// Log request for debugging
	console.log('=== Cashfree Create Payment Link Request ===');
	console.log('URL:', `${baseUrl}/links`);
	console.log('Headers:', JSON.stringify(headers, null, 2));
	console.log('Body:', JSON.stringify(body, null, 2));
	console.log('===========================================');

	try {
		const response = await this.helpers.httpRequest({
			method: 'POST',
			url: `${baseUrl}/links`,
			headers,
			body,
			json: true,
		});

		console.log('=== Cashfree Create Payment Link Response ===');
		console.log('Success:', JSON.stringify(response, null, 2));
		console.log('============================================');

		return {
			json: response,
			pairedItem: { item: index },
		};
	} catch (error: any) {
		const errorData = error.response?.body || error.response?.data || error.message;
		const statusCode = error.response?.statusCode || error.statusCode;

		console.error('=== Cashfree Create Payment Link ERROR ===');
		console.error('Status Code:', statusCode);
		console.error('Error Data:', JSON.stringify(errorData, null, 2));
		console.error('Full Error:', error);
		console.error('==========================================');

		throw new Error(
			`Cashfree Create Payment Link Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

/**
 * Cancel Payment Link Operation
 */
export async function cancelPaymentLink(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	const linkId = this.getNodeParameter('cancel_link_id', index) as string;
	const requestId = this.getNodeParameter('cancel_request_id', index, '') as string;
	const idempotencyKey = this.getNodeParameter('cancel_idempotency_key', index, '') as string;

	const headers: any = {
		'Content-Type': 'application/json',
		'x-api-version': credentials.apiVersion || '2025-01-01',
		'x-client-id': credentials.clientId,
		'x-client-secret': credentials.clientSecret,
	};

	if (requestId) headers['x-request-id'] = requestId;
	if (idempotencyKey) headers['x-idempotency-key'] = idempotencyKey;

	const baseUrl = getPaymentGatewayBaseUrl(credentials.environment);

	try {
		const response = await this.helpers.httpRequest({
			method: 'POST',
			url: `${baseUrl}/links/${linkId}/cancel`,
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
			`Cashfree Cancel Payment Link Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

/**
 * Fetch Payment Link Details Operation
 */
export async function fetchPaymentLinkDetails(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	const linkId = this.getNodeParameter('fetch_details_link_id', index) as string;
	const requestId = this.getNodeParameter('fetch_details_request_id', index, '') as string;
	const idempotencyKey = this.getNodeParameter('fetch_details_idempotency_key', index, '') as string;

	const headers: any = {
		'Content-Type': 'application/json',
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
			url: `${baseUrl}/links/${linkId}`,
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
			`Cashfree Fetch Payment Link Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

/**
 * Get Orders for Payment Link Operation
 */
export async function getOrdersForPaymentLink(
	this: IExecuteFunctions,
	index: number,
	credentials: any
): Promise<INodeExecutionData> {
	const linkId = this.getNodeParameter('get_orders_link_id', index) as string;
	const requestId = this.getNodeParameter('get_orders_request_id', index, '') as string;
	const idempotencyKey = this.getNodeParameter('get_orders_idempotency_key', index, '') as string;
	const status = this.getNodeParameter('get_orders_status', index, 'PAID') as string;

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
			url: `${baseUrl}/links/${linkId}/orders?status=${status}`,
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
			`Cashfree Get Orders for Payment Link Error (${statusCode || 'Unknown'}): ${
				typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2)
			}`
		);
	}
}

