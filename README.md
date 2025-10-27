# n8n-nodes-cashfree-payments

This is an n8n community node that provides comprehensive integration with Cashfree Payments API. It allows you to interact with Cashfree's payment gateway and payout services directly from your n8n workflows.

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

## Features

- **Complete Order Management**: Create orders with extensive customization options
- **Payment Links**: Create, cancel, fetch details, and get associated orders
- **Refund Processing**: Create refunds and retrieve refund history
- **Cashgram Operations**: Create and deactivate payout links
- **Multi-environment**: Support for both sandbox and production environments
- **Request Tracking**: Optional headers for debugging and idempotency
- **Bank Integration**: TPV support with bank account details

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-cashfree-payments` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

After installing the node, you can use it like any other node in your workflows.

### Manual installation

To get started with local development:

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Build the node: `pnpm build`
4. Link to n8n: `pnpm link`

## Credentials

This node requires Cashfree API credentials. You'll need to create credentials with the following information:

- **Client ID**: Your Cashfree Payment Gateway Client ID
- **Client Secret**: Your Cashfree Payment Gateway Client Secret
- **Payout Authorization Token**: Required only for Cashgram operations
- **API Version**: Default is "2025-01-01"
- **Environment**: Choose between "sandbox" and "production"

You can obtain these credentials from your [Cashfree Dashboard](https://merchant.cashfree.com/).

## Operations

### Create Order
Creates a new payment order with comprehensive options including customer details, addresses, bank information, and payment preferences.

### Create Payment Link
Generates a payment link with customer details, expiration settings, payment method filtering, and notification options.

### Cancel Payment Link
Cancels an existing payment link using its ID.

### Fetch Payment Link Details
Retrieves detailed information about a specific payment link.

### Get Orders for Payment Link
Fetches orders associated with a payment link with status filtering (All orders or Only paid orders).

### Create Refund
Processes refunds for completed orders with standard or instant speed options.

### Get All Refunds for Order
Retrieves the complete refund history for a specific order.

### Create Cashgram
Creates payout links for sending money to customers (requires Payout Authorization Token).

### Deactivate Cashgram
Deactivates existing Cashgram payout links.

## Advanced Features

- **Request Tracking**: Optional Request ID and Idempotency Key headers for debugging and safe retries
- **Bank Integration**: Support for bank account details, IFSC codes, and TPV verification
- **Payment Method Control**: Filter available payment methods (cards, UPI, net banking, wallets, etc.)
- **Address Management**: Complete shipping and billing address support

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Cashfree API Documentation](https://docs.cashfree.com/reference)
- [Cashfree Dashboard](https://merchant.cashfree.com/)

## Version history

### 1.0.0
- Initial release with comprehensive Cashfree Payments integration
- Complete order management with 25+ optional fields
- Payment link operations (create, cancel, fetch details, get orders)
- Refund processing (create refunds, get refund history)
- Cashgram operations (create and deactivate payout links)
- Request tracking headers for debugging and idempotency
- Bank integration with TPV support
- Multi-environment support (sandbox/production)
- Extensive error handling and validation

## License

[MIT](https://github.com/your-username/n8n-nodes-cashfree-payments/blob/master/LICENSE.md)
