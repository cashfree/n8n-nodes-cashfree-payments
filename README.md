# Cashfree Payments for n8n

Integrate [Cashfree Payments](https://www.cashfree.com/) into your n8n workflows. **Trusted by 800,000+ businesses** for payments, payouts, and financial automation.

---

## ✨ Features

- 🔗 **Payment Links** – Create, cancel, and track payment links
- 📦 **Orders** – Complete order lifecycle management
- 💰 **Refunds** – Standard and instant refund processing
- 🏦 **Cashgram** – Vendor and partner payout links
- 🌐 **Multi-Environment** – Sandbox and production support

---

## 📦 Installation

**Via n8n Community Nodes (Recommended)**
1. Settings → Community Nodes → Install
2. Enter: `@cashfreepayments/n8n-nodes-cashfree-payments`

**Via npm**
```bash
npm install @cashfreepayments/n8n-nodes-cashfree-payments
```

---

## 🔐 Setup Credentials

Get your credentials from [Cashfree Dashboard](https://merchant.cashfree.com/) → Developers → API Keys

### Payment Gateway API
For orders, payment links, and refunds:
- Environment (Sandbox/Production)
- Client ID
- Client Secret  
- API Version (default: `2025-01-01`)

### Payout API
For Cashgram operations:
- Environment (Sandbox/Production)
- Payout Client ID
- Payout Client Secret
- Payout Public Key

---

## 🚀 Operations

| Operation | Description |
|-----------|-------------|
| **Create Order** | Generate payment orders |
| **Create Payment Link** | Create shareable payment links |
| **Cancel Payment Link** | Cancel existing links |
| **Fetch Payment Link Details** | Get link information |
| **Get Orders for Payment Link** | Retrieve associated orders |
| **Create Refund** | Process refunds |
| **Get All Refunds** | Retrieve refund history |
| **Create Cashgram** | Generate payout links |
| **Deactivate Cashgram** | Deactivate payout links |

---

## 💡 Quick Example

**Create a Payment Link:**
```
1. Add "Cashfree Payments" node
2. Select "Create Payment Link"  
3. Choose Payment Gateway API credential
4. Fill required fields (email, phone, amount, purpose)
5. Execute → Get payment link URL
```

---

## 🛠️ Troubleshooting

**Connection Error?** → Verify Client ID/Secret and environment  
**400 Bad Request?** → Check required fields in terminal logs  
**Payout Issues?** → Use Payout API credential (not Payment Gateway)

---

## 📚 Resources

- [Cashfree API Docs](https://docs.cashfree.com/api-reference/)
- [n8n Documentation](https://docs.n8n.io/)
- [Cashfree Dashboard](https://merchant.cashfree.com/)

---

**v0.1.5** | [Apache License 2.0](LICENSE.md) | [Support](https://www.cashfree.com/contact-us/)
