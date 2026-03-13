---
name: security-review
description: Perform security review for the OpenClaw Skills project. Use when adding authentication, payment processing, user input handling, file uploads, or new API endpoints. Ensures crypto payments, wallet auth, and data protection.
---

# Security Review

## Overview

This skill performs security review on code changes. Use when adding authentication, payment processing, user input handling, file uploads, or new API endpoints.

## Mandatory Checklist

### Authentication
- [ ] Wallet address is validated (checksum format)
- [ ] Signature verification uses correct algorithm
- [ ] Session tokens are secure (httpOnly, secure, sameSite)
- [ ] No sensitive data in URL parameters

### Payment Processing
- [ ] Payment amount is validated server-side
- [ ] Platform wallet address is verified
- [ ] Transaction signature is verified
- [ ] No floating point for currency (use integers/decimal)
- [ ] Payment verification before fulfilling orders

### User Input
- [ ] All inputs validated with Zod
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (escape output)
- [ ] CSRF protection in place
- [ ] File uploads have size limits
- [ ] File types are validated

### API Endpoints
- [ ] Rate limiting applied
- [ ] Authentication required where needed
- [ ] Authorization checked (user owns resource)
- [ ] Error messages don't leak sensitive info
- [ ] Sensitive headers removed from responses

### Data Protection
- [ ] Environment variables for secrets
- [ ] No credentials in client-side code
- [ ] Database credentials not exposed
- [ ] API keys use environment variables

## Common Vulnerabilities

### SQL Injection
**Bad:**
```typescript
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

**Good:**
```typescript
const result = await query("SELECT * FROM users WHERE id = $1", [userId]);
```

### XSS
**Bad:**
```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Good:**
```typescript
<div>{userInput}</div>
// Or sanitize if necessary
import { sanitize } from "@/lib/utils";
<div dangerouslySetInnerHTML={{ __html: sanitize(userInput) }} />
```

### Authentication Bypass
**Bad:**
```typescript
// Trusting client-side auth only
if (user.isAdmin) { ... }
```

**Good:**
```typescript
// Verify server-side
const user = await getUser(request);
if (!user || !user.isAdmin) {
  return Response.json({ error: "Forbidden" }, { status: 403 });
}
```

### Wallet Signature Forgery
**Bad:**
```typescript
// Not verifying signature
const user = await getUser(walletAddress);
```

**Good:**
```typescript
import { verifySignature } from "@/lib/auth";

const isValid = await verifySignature(walletAddress, signature, message);
if (!isValid) {
  return Response.json({ error: "Invalid signature" }, { status: 401 });
}
```

## Payment Security

### x402 Protocol
- [ ] Payment header verified before service
- [ ] Amount matches expected price
- [ ] Currency is correct (USDC)
- [ ] Platform wallet verified

```typescript
import { verifyPaymentHeader } from "@/lib/x402";

export async function POST(request: Request) {
  const paymentHeader = request.headers.get("payment");
  if (!paymentHeader) {
    return Response.json({ error: "Payment required" }, { status: 402 });
  }
  
  const payment = parsePaymentHeader(paymentHeader);
  const isValid = await verifyPaymentHeader(payment, PLATFORM_WALLET);
  
  if (!isValid) {
    return Response.json({ error: "Invalid payment" }, { status: 402 });
  }
  
  // ...
}
```

## Environment Variables

Never hardcode secrets. Use:
```bash
# .env.local
DATABASE_URL=...
VIRUSTOTAL_API_KEY=...
RESEND_API_KEY=...
PLATFORM_WALLET_ADDRESS=...
```

Access in code:
```typescript
const apiKey = process.env.VIRUSTOTAL_API_KEY;
if (!apiKey) {
  throw new Error("VIRUSTOTAL_API_KEY not configured");
}
```

## Review Process

1. **Identify data flows** - Where does user input go?
2. **Check authentication** - Who can access this?
3. **Validate inputs** - Is all data validated?
4. **Check outputs** - What gets returned?
5. **Verify dependencies** - Any vulnerable packages?

## Files to Check

- `lib/auth/index.ts` - Authentication logic
- `lib/x402/` - Payment verification
- `lib/api/auth.ts` - API auth utilities
- `lib/error-handler.ts` - Error handling
