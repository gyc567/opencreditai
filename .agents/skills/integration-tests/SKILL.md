---
name: integration-tests
description: Run integration tests for the OpenClaw Skills project. Verifies API endpoints, database operations, and end-to-end flows work correctly.
---

# Integration Tests

## Overview

Run integration tests to verify the application works correctly end-to-end. This includes API endpoints, database operations, and cross-component flows.

## Quick start

1. Keep this skill at `./.agents/skills/integration-tests` so it loads automatically.
2. Run: `bash .agents/skills/integration-tests/scripts/run.sh`
3. Tests require the dev server to be running on localhost:3000

## What it tests

### API Endpoints
- `/api/v1/creators` - Creator registration and retrieval
- `/api/v1/creators/[id]/listings` - Listing management
- `/api/audit/*` - Audit service endpoints
- `/api/payments/*` - Payment verification

### Database Operations
- Database migrations
- CRUD operations
- Transaction integrity

### End-to-End Flows
- User registration flow
- Listing creation flow
- Payment verification flow
- Audit request flow

## Manual workflow

### Prerequisites
1. Start dev server: `npm run dev`
2. In another terminal, run tests

### Run Integration Tests
```bash
# Using the script
bash .agents/skills/integration-tests/scripts/run.sh

# Or manually with Playwright
npx playwright test --grep "integration"
```

### Test File Location
Integration tests should be in:
- `app/**/*.test.ts` - API route tests
- `app/**/*.test.tsx` - Page/component tests with Playwright

## Resources

### scripts/run.sh

- Starts dev server if not running
- Runs Playwright integration tests
- Tears down test environment

### Key Test Patterns

```typescript
// API route test example
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('API: /api/v1/creators', () => {
  beforeAll(async () => {
    // Setup test database
  });
  
  afterAll(async () => {
    // Cleanup
  });
  
  it('should create a new creator', async () => {
    const response = await fetch('/api/v1/creators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: '0x...' }),
    });
    
    expect(response.status).toBe(201);
  });
});
```
