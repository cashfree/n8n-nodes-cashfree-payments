/**
 * API Base URLs
 */
export const API_BASE_URLS = {
	PAYMENT_GATEWAY: {
		SANDBOX: 'https://sandbox.cashfree.com/pg',
		PRODUCTION: 'https://api.cashfree.com/pg',
	},
	PAYOUT: {
		SANDBOX: 'https://sandbox.cashfree.com',
		PRODUCTION: 'https://payout-api.cashfree.com',
	},
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
	PAYMENT_GATEWAY: {
		ORDERS: '/orders',
		PAYMENT_LINKS: '/links',
		REFUNDS: '/refunds',
	},
	PAYOUT: {
		AUTHORIZE: '/payout/v1/authorize',
		CASHGRAM: '/payout/v1/requestTransfer',
		CASHGRAM_STATUS: '/payout/v1/getTransferStatus',
	},
} as const;

/**
 * Get Payment Gateway base URL based on environment
 */
export function getPaymentGatewayBaseUrl(environment: string): string {
	return environment === 'production'
		? API_BASE_URLS.PAYMENT_GATEWAY.PRODUCTION
		: API_BASE_URLS.PAYMENT_GATEWAY.SANDBOX;
}

/**
 * Get Payout base URL based on environment
 */
export function getPayoutBaseUrl(environment: string): string {
	return environment === 'production'
		? API_BASE_URLS.PAYOUT.PRODUCTION
		: API_BASE_URLS.PAYOUT.SANDBOX;
}

