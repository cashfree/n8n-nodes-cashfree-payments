const { NodeApiError } = require('n8n-workflow');

class CashfreePayments {
    description = {
        displayName: 'Cashfree Payments',
        name: 'cashfreePayments',
        icon: 'https://cashfreelogo.cashfree.com/cashfreepayments/logopng4x/Group_4355.png',
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
                name: 'cashfreeApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    {
                        name: 'Create Order',
                        value: 'createOrder',
                        description: 'Create a new order',
                        action: 'Create a new order',
                    },
                    {
                        name: 'Create Payment Link',
                        value: 'createPaymentLink',
                        description: 'Create a payment link',
                        action: 'Create a payment link',
                    },
                    {
                        name: 'Cancel Payment Link',
                        value: 'cancelPaymentLink',
                        description: 'Cancel an existing payment link',
                        action: 'Cancel a payment link',
                    },
                    {   name: 'Fetch Payment Link Details',
                        value: 'fetchPaymentLinkDetails',
                        description: 'Fetch Payment Link Details',
                        action: 'Fetch Payment Link Details',
                    },
                    {
                        name: 'Get Orders for Payment Link',
                        value: 'getOrdersForPaymentLink',
                        description: 'Get orders associated with a payment link',
                        action: 'Get orders for payment link',
                    },
                    {
                        name: 'Create Refund',
                        value: 'createRefund',
                        description: 'Create a refund for an order',
                        action: 'Create a refund',
                    },
                    {
                        name: 'Get All Refunds for Order',
                        value: 'getAllRefundsForOrder',
                        description: 'Get all refunds associated with an order',
                        action: 'Get all refunds for order',
                    },
                    {
                        name: 'Create Cashgram',
                        value: 'createCashgram',
                        description: 'Create a Cashgram payout link',
                        action: 'Create a Cashgram',
                    },
                    {
                        name: 'Deactivate Cashgram',
                        value: 'deactivateCashgram',
                        description: 'Deactivate an existing Cashgram payout link',
                        action: 'Deactivate a Cashgram',
                    }
                ],
                default: 'createOrder',
                noDataExpression: true,
            },

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
                description: 'Customer email address (3-100 characters)',
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
                description: 'Name of the customer (3-100 characters)',
            },
            {
                displayName: 'Customer Bank Account Number',
                name: 'customer_bank_account_number_order',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Customer bank account. Required for TPV (Third Party Verification) (3-20 characters)',
            },
            {
                displayName: 'Customer Bank IFSC',
                name: 'customer_bank_ifsc_order',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Customer bank IFSC. Required for TPV (Third Party Verification)',
            },
            {
                displayName: 'Customer Bank Code',
                name: 'customer_bank_code_order',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Customer bank code. Required for net banking payments with TPV',
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
                description: 'Order identifier in your system. Alphanumeric, "_" and "-" only (3-45 characters)',
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
                description: 'Order note for reference (3-200 characters)',
            },
            {
                displayName: 'Order Expiry Time',
                name: 'order_expiry_time',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'ISO 8601 format. Example: 2021-07-02T10:20:12+05:30',
                placeholder: 'YYYY-MM-DDTHH:MM:SS+05:30',
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
                description: 'URL to redirect customer after payment completion (max 250 characters)',
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
                description: 'HTTPS URL for server-to-server notifications (max 250 characters)',
            },
            {
                displayName: 'Payment Methods',
                name: 'payment_methods_order',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Comma-separated values: cc,dc,ccc,ppc,nb,upi,paypal,app,paylater,cardlessemi,dcc',
                placeholder: 'cc,dc,upi,nb',
            },
            {
                displayName: 'Cart Name',
                name: 'order_cart_name',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Name of the cart',
            },
            {
                displayName: 'Customer Note',
                name: 'customer_note',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Note from customer',
            },
            {
                displayName: 'Shipping Charge',
                name: 'shipping_charge',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: 0,
                description: 'Shipping charges for the order',
            },
            {
                displayName: 'Shipping - Full Name',
                name: 'shipping_full_name',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Full name for shipping address',
            },
            {
                displayName: 'Shipping - Country',
                name: 'shipping_country',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Country for shipping address',
            },
            {
                displayName: 'Shipping - City',
                name: 'shipping_city',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'City for shipping address',
            },
            {
                displayName: 'Shipping - State',
                name: 'shipping_state',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'State for shipping address',
            },
            {
                displayName: 'Shipping - Pincode',
                name: 'shipping_pincode',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Pincode for shipping address',
            },
            {
                displayName: 'Shipping - Address Line 1',
                name: 'shipping_address_1',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Primary address line for shipping',
            },
            {
                displayName: 'Shipping - Address Line 2',
                name: 'shipping_address_2',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Secondary address line for shipping',
            },
            {
                displayName: 'Billing - Full Name',
                name: 'billing_full_name',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Full name for billing address',
            },
            {
                displayName: 'Billing - Country',
                name: 'billing_country',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Country for billing address',
            },
            {
                displayName: 'Billing - City',
                name: 'billing_city',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'City for billing address',
            },
            {
                displayName: 'Billing - State',
                name: 'billing_state',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'State for billing address',
            },
            {
                displayName: 'Billing - Pincode',
                name: 'billing_pincode',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Pincode for billing address',
            },
            {
                displayName: 'Billing - Address Line 1',
                name: 'billing_address_1',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Primary address line for billing',
            },
            {
                displayName: 'Billing - Address Line 2',
                name: 'billing_address_2',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Secondary address line for billing',
            },
            {
                displayName: 'Terminal Type',
                name: 'terminal_type',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Type of terminal (e.g., SPOS) for SoftPOS orders (4-10 characters)',
            },
            {
                displayName: 'Terminal ID',
                name: 'terminal_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Terminal ID for merchant reference (3-100 characters)',
            },
            {
                displayName: 'Terminal Phone Number',
                name: 'terminal_phone_number',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Mobile number of the terminal/agent/storefront',
            },
            {
                displayName: 'Terminal Name',
                name: 'terminal_name',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Name of terminal/agent/storefront',
            },
            {
                displayName: 'Terminal Address',
                name: 'terminal_address',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Location of terminal',
            },
            {
                displayName: 'Terminal Note',
                name: 'terminal_note',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: '',
                description: 'Note given by merchant while creating the terminal',
            },
            {
                displayName: 'Enable One Click Checkout',
                name: 'enable_one_click_checkout',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: false,
                description: 'Enable One Click Checkout feature',
            },
            {
                displayName: 'Enable Verify and Pay',
                name: 'enable_verify_and_pay',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createOrder'],
                    },
                },
                default: false,
                description: 'Enable Verify and Pay feature',
            },
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
            },
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
                type: 'options',
                options: [
                    { name: 'State Bank of India (3003)', value: '3003' },
                    { name: 'Punjab National Bank (3005)', value: '3005' },
                    { name: 'Bank of Baroda (3006)', value: '3006' },
                    { name: 'Central Bank of India (3010)', value: '3010' },
                    { name: 'Bank of India (3012)', value: '3012' },
                    { name: 'Indian Overseas Bank (3016)', value: '3016' },
                    { name: 'Allahabad Bank (3019)', value: '3019' },
                    { name: 'Andhra Bank (3020)', value: '3020' },
                    { name: 'Corporation Bank (3021)', value: '3021' },
                    { name: 'Indian Bank (3022)', value: '3022' },
                    { name: 'Oriental Bank of Commerce (3023)', value: '3023' },
                    { name: 'Punjab & Sind Bank (3024)', value: '3024' },
                    { name: 'Syndicate Bank (3026)', value: '3026' },
                    { name: 'UCO Bank (3027)', value: '3027' },
                    { name: 'Union Bank of India (3028)', value: '3028' },
                    { name: 'United Bank of India (3029)', value: '3029' },
                    { name: 'Vijaya Bank (3030)', value: '3030' },
                    { name: 'Dena Bank (3031)', value: '3031' },
                    { name: 'ICICI Bank (3032)', value: '3032' },
                    { name: 'HDFC Bank (3033)', value: '3033' },
                    { name: 'Axis Bank (3038)', value: '3038' },
                    { name: 'Kotak Mahindra Bank (3039)', value: '3039' },
                    { name: 'IndusInd Bank (3040)', value: '3040' },
                    { name: 'Yes Bank (3042)', value: '3042' },
                    { name: 'IDBI Bank (3044)', value: '3044' },
                    { name: 'Federal Bank (3054)', value: '3054' },
                    { name: 'South Indian Bank (3055)', value: '3055' },
                    { name: 'Karur Vysya Bank (3058)', value: '3058' },
                    { name: 'Canara Bank (3086)', value: '3086' },
                    { name: 'IDFC First Bank (3087)', value: '3087' },
                    { name: 'Bandhan Bank (3088)', value: '3088' },
                    { name: 'City Union Bank (3089)', value: '3089' },
                    { name: 'DCB Bank (3090)', value: '3090' },
                    { name: 'Dhanlaxmi Bank (3091)', value: '3091' },
                    { name: 'Lakshmi Vilas Bank (3092)', value: '3092' },
                    { name: 'RBL Bank (3098)', value: '3098' },
                    { name: 'Jammu & Kashmir Bank (3115)', value: '3115' },
                    { name: 'Tamilnad Mercantile Bank (3117)', value: '3117' },
                    { name: 'ESAF Small Finance Bank (7001)', value: '7001' },
                ],
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: '',
                description: 'Customer bank code (optional)',
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
                placeholder: 'YYYY-MM-DDTHH:MM:SS+05:30',
            },
            {
                displayName: 'Link Notes (JSON Format)',
                name: 'linkNotes',
                type: 'json',
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: '{}',
                description: 'Enter a JSON object for notes, e.g., {"key_1": "value_1"}',
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
                description: 'Allowed payment modes for this link. Pass comma-separated values among following options - "cc", "dc", "ccc", "ppc", "nb", "upi", "paypal", "app". Leave it blank to show all available payment methods',
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
            },
            {
                displayName: 'Send Email Notification',
                name: 'send_email',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: true,
            },
            {
                displayName: 'Send SMS Notification',
                name: 'send_sms',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: false,
            },
            {
                displayName: 'Enable Partial Payments',
                name: 'link_partial_payments',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: false,
            },
            {
                displayName: 'Minimum Partial Amount',
                name: 'link_minimum_partial_amount',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: 1,
            },
            {
                displayName: 'Enable Auto Reminders',
                name: 'link_auto_reminders',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createPaymentLink'],
                    },
                },
                default: true,
            },
            {
                displayName: 'Link ID',
                name: 'cancel_link_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['cancelPaymentLink'],
                    },
                },
                default: '',
                required: true,
                description: 'The ID of the payment link to cancel',
            },
            {
                displayName: 'Request ID',
                name: 'cancel_request_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['cancelPaymentLink'],
                    },
                },
                default: '',
                description: 'Request ID for the API call. Can be used to resolve tech issues. Communicate this in your tech related queries to Cashfree.',
            },
            {
                displayName: 'Idempotency Key',
                name: 'cancel_idempotency_key',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['cancelPaymentLink'],
                    },
                },
                default: '',
                description: 'An idempotency key is a unique identifier you include with your API call. If the request fails or times out, you can safely retry it using the same key to avoid duplicate actions.',
                placeholder: 'UUID format recommended',
            },
            {
                displayName: 'Link ID',
                name: 'fetch_details_link_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['fetchPaymentLinkDetails'],
                    },
                },
                default: '',
                required: true,
                description: 'The ID of the payment link to fetch details for',
            },
            {
                displayName: 'Request ID',
                name: 'fetch_details_request_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['fetchPaymentLinkDetails'],
                    },
                },
                default: '',
                description: 'Request ID for the API call. Can be used to resolve tech issues. Communicate this in your tech related queries to Cashfree.',
            },
            {
                displayName: 'Idempotency Key',
                name: 'fetch_details_idempotency_key',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['fetchPaymentLinkDetails'],
                    },
                },
                default: '',
                description: 'An idempotency key is a unique identifier you include with your API call. If the request fails or times out, you can safely retry it using the same key to avoid duplicate actions.',
                placeholder: 'UUID format recommended',
            },
            {
                displayName: 'Link ID',
                name: 'get_orders_link_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getOrdersForPaymentLink'],
                    },
                },
                default: '',
                required: true,
                description: 'The ID of the payment link to get orders for',
            },
            {
                displayName: 'Request ID',
                name: 'get_orders_request_id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getOrdersForPaymentLink'],
                    },
                },
                default: '',
                description: 'Request ID for the API call. Can be used to resolve tech issues. Communicate this in your tech related queries to Cashfree.',
            },
            {
                displayName: 'Idempotency Key',
                name: 'get_orders_idempotency_key',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getOrdersForPaymentLink'],
                    },
                },
                default: '',
                description: 'An idempotency key is a unique identifier you include with your API call. If the request fails or times out, you can safely retry it using the same key to avoid duplicate actions.',
                placeholder: 'UUID format recommended',
            },
            {
                displayName: 'Order Status Filter',
                name: 'get_orders_status',
                type: 'options',
                options: [
                    {
                        name: 'All orders',
                        value: 'ALL',
                    },
                    {
                        name: 'Only paid orders',
                        value: 'PAID',
                    },
                ],
                displayOptions: {
                    show: {
                        operation: ['getOrdersForPaymentLink'],
                    },
                },
                default: 'PAID',
                description: 'What status of orders you want to fetch. ALL - seen as all orders, PAID - seen as only paid orders',
            },
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
            },
            {
                displayName: 'Refund Speed',
                name: 'refund_speed',
                type: 'options',
                options: [
                    { name: 'STANDARD', value: 'STANDARD' },
                    { name: 'INSTANT', value: 'INSTANT' },
                ],
                displayOptions: {
                    show: {
                        operation: ['createRefund'],
                    },
                },
                default: 'STANDARD',
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
                description: 'Request ID for the API call. Can be used to resolve tech issues. Communicate this in your tech related queries to Cashfree.',
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
                description: 'An idempotency key is a unique identifier you include with your API call. If the request fails or times out, you can safely retry it using the same key to avoid duplicate actions.',
                placeholder: 'UUID format recommended',
            },
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
                description: 'The ID of the order to get refunds for',
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
                description: 'Request ID for the API call. Can be used to resolve tech issues. Communicate this in your tech related queries to Cashfree.',
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
                description: 'An idempotency key is a unique identifier you include with your API call. If the request fails or times out, you can safely retry it using the same key to avoid duplicate actions.',
                placeholder: 'UUID format recommended',
            },
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
                default: 0,
                required: true,
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
            },
            {
                displayName: 'Notify Customer',
                name: 'cashgram_notify_customer',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['createCashgram'],
                    },
                },
                default: true,
            },
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
        ],
    };

    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('cashfreeApi');

        const baseUrl =
            credentials.environment === 'sandbox'
                ? 'https://sandbox.cashfree.com/pg'
                : 'https://api.cashfree.com/pg';

        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i);

                // Validate credentials based on operation type
                if (operation === 'createCashgram') {
                    if (!credentials.payoutAuthToken) {
                        throw new Error('Payout Authorization Token is required for Cashgram operations. Please configure it in the credentials.');
                    }
                } else {
                    // For all other operations (Payment Gateway), require Client ID and Secret
                    if (!credentials.clientId || !credentials.clientSecret) {
                        throw new Error('Client ID and Client Secret are required for Payment Gateway operations (orders, payment links, refunds). Please configure them in the credentials.');
                    }
                }

                if (operation === 'createOrder') {
                    const orderAmount = this.getNodeParameter('orderAmount', i);
                    const orderCurrency = this.getNodeParameter('orderCurrency', i);
                    const customerId = this.getNodeParameter('customerId', i);
                    const customerPhone = this.getNodeParameter('customerPhone', i);

                    // Build customer_details object
                    const customerDetails = {
                        customer_id: customerId,
                        customer_phone: customerPhone,
                    };

                    // Add optional customer fields if provided
                    const customerEmail = this.getNodeParameter('customer_email_order', i, '');
                    const customerName = this.getNodeParameter('customer_name_order', i, '');
                    const customerBankAccount = this.getNodeParameter('customer_bank_account_number_order', i, '');
                    const customerBankIfsc = this.getNodeParameter('customer_bank_ifsc_order', i, '');
                    const customerBankCode = this.getNodeParameter('customer_bank_code_order', i, '');

                    if (customerEmail) customerDetails.customer_email = customerEmail;
                    if (customerName) customerDetails.customer_name = customerName;
                    if (customerBankAccount) customerDetails.customer_bank_account_number = customerBankAccount;
                    if (customerBankIfsc) customerDetails.customer_bank_ifsc = customerBankIfsc;
                    if (customerBankCode) customerDetails.customer_bank_code = customerBankCode;

                    // Build main order body
                    const body = {
                        order_currency: orderCurrency,
                        order_amount: orderAmount,
                        customer_details: customerDetails,
                    };

                    // Add optional order fields if provided
                    const orderId = this.getNodeParameter('order_id', i, '');
                    const orderNote = this.getNodeParameter('order_note', i, '');
                    const orderExpiryTime = this.getNodeParameter('order_expiry_time', i, '');
                    const returnUrl = this.getNodeParameter('return_url_order', i, '');
                    const notifyUrl = this.getNodeParameter('notify_url_order', i, '');
                    const paymentMethods = this.getNodeParameter('payment_methods_order', i, '');
                    const cartName = this.getNodeParameter('order_cart_name', i, '');
                    const customerNote = this.getNodeParameter('customer_note', i, '');
                    const shippingCharge = this.getNodeParameter('shipping_charge', i, 0);
                    const enableOneClickCheckout = this.getNodeParameter('enable_one_click_checkout', i, false);
                    const enableVerifyAndPay = this.getNodeParameter('enable_verify_and_pay', i, false);

                    if (orderId) body.order_id = orderId;
                    if (orderNote) body.order_note = orderNote;
                    if (orderExpiryTime) body.order_expiry_time = orderExpiryTime;
                    if (returnUrl) body.return_url = returnUrl;
                    if (notifyUrl) body.notify_url = notifyUrl;
                    if (paymentMethods) body.payment_methods = paymentMethods;
                    if (cartName) body.order_cart_name = cartName;
                    if (customerNote) body.customer_note = customerNote;
                    if (shippingCharge > 0) body.shipping_charge = shippingCharge;
                    if (enableOneClickCheckout) body.enable_one_click_checkout = enableOneClickCheckout;
                    if (enableVerifyAndPay) body.enable_verify_and_pay = enableVerifyAndPay;

                    // Build shipping address if any shipping field is provided
                    const shippingFields = {
                        full_name: this.getNodeParameter('shipping_full_name', i, ''),
                        country: this.getNodeParameter('shipping_country', i, ''),
                        city: this.getNodeParameter('shipping_city', i, ''),
                        state: this.getNodeParameter('shipping_state', i, ''),
                        pincode: this.getNodeParameter('shipping_pincode', i, ''),
                        address_line_1: this.getNodeParameter('shipping_address_1', i, ''),
                        address_line_2: this.getNodeParameter('shipping_address_2', i, ''),
                    };

                    const hasShippingData = Object.values(shippingFields).some(field => field !== '');
                    if (hasShippingData) {
                        body.order_shipping_address = {};
                        Object.entries(shippingFields).forEach(([key, value]) => {
                            if (value) body.order_shipping_address[key] = value;
                        });
                    }

                    // Build billing address if any billing field is provided
                    const billingFields = {
                        full_name: this.getNodeParameter('billing_full_name', i, ''),
                        country: this.getNodeParameter('billing_country', i, ''),
                        city: this.getNodeParameter('billing_city', i, ''),
                        state: this.getNodeParameter('billing_state', i, ''),
                        pincode: this.getNodeParameter('billing_pincode', i, ''),
                        address_line_1: this.getNodeParameter('billing_address_1', i, ''),
                        address_line_2: this.getNodeParameter('billing_address_2', i, ''),
                    };

                    const hasBillingData = Object.values(billingFields).some(field => field !== '');
                    if (hasBillingData) {
                        body.order_billing_address = {};
                        Object.entries(billingFields).forEach(([key, value]) => {
                            if (value) body.order_billing_address[key] = value;
                        });
                    }

                    // Build terminal data if any terminal field is provided
                    const terminalFields = {
                        terminal_type: this.getNodeParameter('terminal_type', i, ''),
                        terminal_id: this.getNodeParameter('terminal_id', i, ''),
                        terminal_phone_number: this.getNodeParameter('terminal_phone_number', i, ''),
                        terminal_name: this.getNodeParameter('terminal_name', i, ''),
                        terminal_address: this.getNodeParameter('terminal_address', i, ''),
                        terminal_note: this.getNodeParameter('terminal_note', i, ''),
                    };

                    const hasTerminalData = Object.values(terminalFields).some(field => field !== '');
                    if (hasTerminalData) {
                        Object.entries(terminalFields).forEach(([key, value]) => {
                            if (value) body[key] = value;
                        });
                    }

                    const options = {
                        method: 'POST',
                        url: `${baseUrl}/orders`,
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-version': credentials.apiVersion,
                            'x-client-id': credentials.clientId,
                            'x-client-secret': credentials.clientSecret,
                        },
                        body,
                        json: true,
                    };

                    const response = await this.helpers.request(options);
                    returnData.push({ json: response });
                }
                else if (operation === 'createPaymentLink') {
                    let linkNotes;
                    try {
                        const linkNotesJson = this.getNodeParameter('linkNotes', i, '{}');
                        linkNotes = JSON.parse(linkNotesJson);
                    } catch (error) {
                        throw new NodeApiError(this.getNode(), { message: `Invalid JSON in Link Notes: ${error.message}` });
                    }

                    const body = {
                        customer_details: {
                            customer_email: this.getNodeParameter('customer_email', i, ''),
                            customer_name: this.getNodeParameter('customer_name', i, ''),
                            customer_phone: this.getNodeParameter('customer_phone', i, ''),
                            customer_bank_account_number: this.getNodeParameter('customer_bank_account_number', i, ''),
                            customer_bank_ifsc: this.getNodeParameter('customer_bank_ifsc', i, ''),
                            customer_bank_code: this.getNodeParameter('customer_bank_code', i, ''),
                        },
                        link_amount: this.getNodeParameter('link_amount', i),
                        link_currency: this.getNodeParameter('link_currency', i, 'INR'),
                        link_id: this.getNodeParameter('link_id', i),
                        link_purpose: this.getNodeParameter('link_purpose', i),
                        link_expiry_time: this.getNodeParameter('link_expiry_time', i),
                        link_auto_reminders: this.getNodeParameter('link_auto_reminders', i),
                        link_partial_payments: this.getNodeParameter('link_partial_payments', i),
                        link_minimum_partial_amount: this.getNodeParameter('link_minimum_partial_amount', i),
                        link_meta: {
                            notify_url: this.getNodeParameter('notify_url', i),
                            return_url: this.getNodeParameter('return_url', i),
                            payment_methods: this.getNodeParameter('payment_methods', i),
                            upi_intent: this.getNodeParameter('upi_intent', i),
                        },
                        link_notes: linkNotes,
                        link_notify: {
                            send_email: this.getNodeParameter('send_email', i),
                            send_sms: this.getNodeParameter('send_sms', i),
                        },
                    };

                    if (!body.link_expiry_time) delete body.link_expiry_time;

                    if (!body.link_meta.payment_methods) {
                        delete body.link_meta.payment_methods;
                    }
                    if (!body.customer_details.customer_bank_account_number) {
                        delete body.customer_details.customer_bank_account_number;
                    }
                    if (!body.customer_details.customer_bank_ifsc) {
                        delete body.customer_details.customer_bank_ifsc;
                    }
                    if (!body.customer_details.customer_bank_code) {
                        delete body.customer_details.customer_bank_code;
                    }

                    const response = await this.helpers.request({
                        method: 'POST',
                        url: `${baseUrl}/links`,
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-version': credentials.apiVersion,
                            'x-client-id': credentials.clientId,
                            'x-client-secret': credentials.clientSecret,
                        },
                        body,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'cancelPaymentLink') {
                    const linkId = this.getNodeParameter('cancel_link_id', i);
                    const requestId = this.getNodeParameter('cancel_request_id', i, '');
                    const idempotencyKey = this.getNodeParameter('cancel_idempotency_key', i, '');

                    const headers = {
                        'Content-Type': 'application/json',
                        'x-api-version': credentials.apiVersion,
                        'x-client-id': credentials.clientId,
                        'x-client-secret': credentials.clientSecret,
                    };

                    // Add optional headers if provided
                    if (requestId) {
                        headers['x-request-id'] = requestId;
                    }
                    if (idempotencyKey) {
                        headers['x-idempotency-key'] = idempotencyKey;
                    }

                    const response = await this.helpers.request({
                        method: 'POST',
                        url: `${baseUrl}/links/${linkId}/cancel`,
                        headers,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'fetchPaymentLinkDetails') {
                    const linkId = this.getNodeParameter('fetch_details_link_id', i);
                    const requestId = this.getNodeParameter('fetch_details_request_id', i, '');
                    const idempotencyKey = this.getNodeParameter('fetch_details_idempotency_key', i, '');

                    const headers = {
                        'Content-Type': 'application/json',
                        'x-api-version': credentials.apiVersion,
                        'x-client-id': credentials.clientId,
                        'x-client-secret': credentials.clientSecret,
                    };

                    // Add optional headers if provided
                    if (requestId) {
                        headers['x-request-id'] = requestId;
                    }
                    if (idempotencyKey) {
                        headers['x-idempotency-key'] = idempotencyKey;
                    }

                    const response = await this.helpers.request({
                        method: 'GET',
                        url: `${baseUrl}/links/${linkId}`,
                        headers,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'getOrdersForPaymentLink') {
                    const linkId = this.getNodeParameter('get_orders_link_id', i);
                    const requestId = this.getNodeParameter('get_orders_request_id', i, '');
                    const idempotencyKey = this.getNodeParameter('get_orders_idempotency_key', i, '');
                    const status = this.getNodeParameter('get_orders_status', i, 'PAID');

                    const headers = {
                        'x-api-version': credentials.apiVersion,
                        'x-client-id': credentials.clientId,
                        'x-client-secret': credentials.clientSecret,
                    };

                    // Add optional headers if provided
                    if (requestId) {
                        headers['x-request-id'] = requestId;
                    }
                    if (idempotencyKey) {
                        headers['x-idempotency-key'] = idempotencyKey;
                    }

                    const response = await this.helpers.request({
                        method: 'GET',
                        url: `${baseUrl}/links/${linkId}/orders?status=${status}`,
                        headers,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'createRefund') {
                    const orderId = this.getNodeParameter('refund_order_id', i);
                    const refundAmount = this.getNodeParameter('refund_amount', i);
                    const refundId = this.getNodeParameter('refund_id', i);
                    const refundNote = this.getNodeParameter('refund_note', i);
                    const refundSpeed = this.getNodeParameter('refund_speed', i);
                    const xRequestId = this.getNodeParameter('x_request_id', i, '');
                    const xIdempotencyKey = this.getNodeParameter('x_idempotency_key', i, '');

                    const body = {
                        refund_amount: refundAmount,
                        refund_id: refundId,
                        refund_note: refundNote,
                        refund_speed: refundSpeed,
                    };

                    const headers = {
                        'Content-Type': 'application/json',
                        'x-api-version': credentials.apiVersion,
                        'x-client-id': credentials.clientId,
                        'x-client-secret': credentials.clientSecret,
                    };

                    // Add optional headers if provided
                    if (xRequestId) {
                        headers['x-request-id'] = xRequestId;
                    }
                    if (xIdempotencyKey) {
                        headers['x-idempotency-key'] = xIdempotencyKey;
                    }

                    const response = await this.helpers.request({
                        method: 'POST',
                        url: `${baseUrl}/orders/${orderId}/refunds`,
                        headers,
                        body,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'getAllRefundsForOrder') {
                    const orderId = this.getNodeParameter('get_refunds_order_id', i);
                    const requestId = this.getNodeParameter('get_refunds_request_id', i, '');
                    const idempotencyKey = this.getNodeParameter('get_refunds_idempotency_key', i, '');

                    const headers = {
                        'x-api-version': credentials.apiVersion,
                        'x-client-id': credentials.clientId,
                        'x-client-secret': credentials.clientSecret,
                    };

                    // Add optional headers if provided
                    if (requestId) {
                        headers['x-request-id'] = requestId;
                    }
                    if (idempotencyKey) {
                        headers['x-idempotency-key'] = idempotencyKey;
                    }

                    const response = await this.helpers.request({
                        method: 'GET',
                        url: `${baseUrl}/orders/${orderId}/refunds`,
                        headers,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'createCashgram') {
                    // Check if payout authorization token is configured
                    if (!credentials.payoutAuthToken) {
                        throw new Error('Payout Authorization Token is required for Cashgram operations. Please configure it in the credentials.');
                    }

                    const body = {
                        cashgramId: this.getNodeParameter('cashgram_id', i),
                        amount: this.getNodeParameter('cashgram_amount', i),
                        name: this.getNodeParameter('cashgram_name', i),
                        email: this.getNodeParameter('cashgram_email', i),
                        phone: this.getNodeParameter('cashgram_phone', i),
                        linkExpiry: this.getNodeParameter('cashgram_link_expiry', i),
                        remarks: this.getNodeParameter('cashgram_remarks', i),
                        notifyCustomer: this.getNodeParameter('cashgram_notify_customer', i),
                    };

                    const response = await this.helpers.request({
                        method: 'POST',
                        url: 'https://payout-api.cashfree.com/payout/v1/createCashgram',
                        headers: {
                            'Authorization': credentials.payoutAuthToken,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    });

                    returnData.push({ json: response });
                }
                else if (operation === 'deactivateCashgram') {
                    // Check if payout authorization token is configured
                    if (!credentials.payoutAuthToken) {
                        throw new Error('Payout Authorization Token is required for Cashgram operations. Please configure it in the credentials.');
                    }

                    const body = {
                        cashgramId: this.getNodeParameter('deactivate_cashgram_id', i),
                    };

                    const response = await this.helpers.request({
                        method: 'POST',
                        url: 'https://payout-api.cashfree.com/payout/v1/deactivateCashgram',
                        headers: {
                            'Authorization': credentials.payoutAuthToken,
                            'Content-Type': 'application/json',
                        },
                        body,
                        json: true,
                    });

                    returnData.push({ json: response });
                }

            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}

module.exports = { CashfreePayments };
