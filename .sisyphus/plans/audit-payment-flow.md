# OpenSpec: Audit Payment Flow Implementation

**Version**: 1.0  
**Date**: 2026-03-10  
**Status**: Proposed  

---

## Overview

**Project**: OpenCreditAi Marketplace  
**Goal**: Implement complete payment flow for /audit page - $10 per audit  

---

## Requirements

### Confirmed Configuration

| Item | Value |
|------|-------|
| **Platform Wallet** | `0x0bf07321af1bf1f77b3e96c63628192640a38206` |
| **Audit Service** | VirusTotal API (external) |
| **Email Service** | Resend |
| **File Storage** | Vercel Blob |
| **Refund Support** | No |
| **Price** | $10 USD fixed |

---

## Architecture

### Data Flow

```
User → Upload File → Create Audit Request → x402 Payment → VirusTotal Scan 
→ Email Report
```

### Database Schema

```sql
-- audit_requests table
CREATE TABLE audit_requests (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid, processing, completed, failed
  amount_usd DECIMAL(10,2) DEFAULT 10.00,
  transaction_id INTEGER REFERENCES transactions(id),
  payment_requirement TEXT,
  virustotal_scan_id VARCHAR(100),
  report_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

---

## Implementation Plan

### Phase 1: Database & API (Core)

1. **Database Migration**
   - Create `audit_requests` table
   - Add indexes on `status`, `email`, `created_at`

2. **API Routes**
   - `POST /api/audit/request` - Create audit request + x402 requirement
   - `POST /api/audit/verify` - Verify payment + trigger scan
   - `GET /api/audit/status/[id]` - Query audit status
   - `POST /api/audit/webhook` - VirusTotal callback

3. **Core Library**
   - `lib/audit/index.ts` - Audit logic
   - `lib/audit/virustotal.ts` - VirusTotal API integration
   - `lib/audit/email.ts` - Resend email templates
   - `lib/audit/storage.ts` - Vercel Blob file handling

### Phase 2: Frontend Components

1. **Extract Form Component**
   - `app/audit/components/audit-form.tsx`
   - File upload with progress
   - Email validation

2. **Payment Modal**
   - `app/audit/components/payment-modal.tsx`
   - Wallet connection
   - x402 payment flow
   - Loading states

3. **Status Display**
   - `app/audit/components/status-tracker.tsx`
   - Real-time status updates
   - Progress indicator

4. **Custom Hook**
   - `app/audit/hooks/use-audit-payment.ts`
   - Manage payment state
   - Handle errors

### Phase 3: Integration & Testing

1. **Update Audit Page**
   - Integrate new components
   - Handle full flow

2. **Tests**
   - Unit tests for API routes
   - Component tests
   - Integration tests

---

## API Specification

### POST /api/audit/request

**Request:**
```json
{
  "email": "user@example.com",
  "fileName": "skill.zip",
  "fileSize": 1024000
}
```

**Response (402 Payment Required):**
```http
HTTP/1.1 402 Payment Required
PAYMENT-REQUIRED: eyJ4MDAyVmVyc2lvbiI6MiwicmVzb3VyY2UiOnsidXJsIjoiaHR0cHM6Ly9hcGkub3BlbmNyZWRpdGFpLmNvbS9hcGkvYXVkaXQvdmVyaWZ5IiwiZGVzY3JpcHRpb24iOiJBdWRpdCBSZXF1ZXN0ICMxMjM0In0sImFjY2VwdHMiOlt7InNjaGVtZSI6ImV4YWN0IiwibmV0d29yayI6ImVpcDE1NTo4NDUzMiIsImFtb3VudCI6IjEwMDAwMDAwIiwiYXNzZXQiOiJVU0RDIiwicGF5VG8iOiIweDBiZjA3MzIxYWYxYmYxZjc3YjNlOTZjNjM2MjgxOTI2NDBhMzgyMDYifV0sImV4cGlyZXMiOjE3MzU2ODk2MDAwMDB9

{
  "auditRequestId": 1234,
  "amount": "$10.00",
  "message": "Payment required to proceed with audit"
}
```

### POST /api/audit/verify

**Request:**
```json
{
  "auditRequestId": 1234,
  "signature": "0x...",
  "paymentRequirement": "eyJ4MDAyVmVyc2lvbiI6MiwicmVzb3VyY2UiOnsidXJsIjoiaHR0cHM6Ly9hcGkub3BlbmNyZWRpdGFpLmNvbS9hcGkvYXVkaXQvdmVyaWZ5IiwiZGVzY3JpcHRpb24iOiJBdWRpdCBSZXF1ZXN0ICMxMjM0In0sImFjY2VwdHMiOlt7InNjaGVtZSI6ImV4YWN0IiwibmV0d29yayI6ImVpcDE1NTo4NDUzMiIsImFtb3VudCI6IjEwMDAwMDAwIiwiYXNzZXQiOiJVU0RDIiwicGF5VG8iOiIweDBiZjA3MzIxYWYxYmYxZjc3YjNlOTZjNjM2MjgxOTI2NDBhMzgyMDYifV0sImV4cGlyZXMiOjE3MzU2ODk2MDAwMDB9"
}
```

**Response:**
```json
{
  "success": true,
  "auditRequestId": 1234,
  "status": "processing",
  "message": "Payment verified. Audit processing started."
}
```

---

## VirusTotal Integration

### Scan Flow

1. Upload file to VirusTotal
2. Get scan ID
3. Poll for results (max 5 minutes)
4. Generate report
5. Send email via Resend

### Report Template

**Subject**: Your OpenCreditAi Audit Report - Request #{id}

**Content**:
- File name and size
- Scan results (clean/malicious/suspicious)
- Detected engines (if any)
- Recommendations
- Link to full report (optional)

---

## Environment Variables

```bash
# Platform
PLATFORM_WALLET_ADDRESS=0x0bf07321af1bf1f77b3e96c63628192640a38206

# VirusTotal
VIRUSTOTAL_API_KEY=vt_api_key_here

# Resend
RESEND_API_KEY=re_api_key_here
RESEND_FROM_EMAIL=audit@opencreditai.com

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here

# x402 Facilitator (existing)
X402_FACILITATOR_API_KEY=facilitator_key_here
```

---

## Acceptance Criteria

- [ ] User can upload file and enter email
- [ ] x402 payment flow works end-to-end
- [ ] Payment verification creates transaction record
- [ ] VirusTotal scan triggered after payment
- [ ] Email sent with audit report
- [ ] Status tracking works
- [ ] All tests pass (100% coverage)
- [ ] Build succeeds
- [ ] No regression in existing features

---

**Status**: Proposed  
**Next**: Awaiting confirmation to implement
