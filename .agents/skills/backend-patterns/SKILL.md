---
name: backend-patterns
description: Enforce backend coding patterns for API routes, lib functions, and server-side code in the OpenClaw Skills project. Ensures error handling, input validation, authentication, and rate limiting.
---

# Backend Patterns

## Overview

This skill ensures all backend code follows the project's coding standards. Use when writing or reviewing API routes, lib functions, or any server-side code.

## Error Handling

### Must Do
- Use the centralized error handler in `lib/error-handler.ts`
- Normalize errors before throwing
- Never suppress errors with empty catch blocks
- Log errors in development mode

```typescript
import { normalizeError, safeExecute, AppError } from "@/lib/error-handler";

// Normalize before throwing
throw normalizeError(error, { code: "VALIDATION_ERROR" });

// Safe execute with fallback
const result = safeExecute(() => riskyOperation(), defaultValue);

// Custom error
throw new AppError("User not found", 404, "USER_NOT_FOUND");
```

### Error Response Format
```typescript
// All API errors return this format
{
  error: {
    message: "Human readable message",
    code: "ERROR_CODE",
    details?: Record<string, unknown>
  }
}
```

## Input Validation

### Must Do
- Use Zod for schema validation
- Validate all user inputs
- Return 400 for validation errors

```typescript
import { z } from "zod";

const CreateListingSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(5000),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const validated = CreateListingSchema.parse(body); // throws ZodError
  
  // ...
}
```

## Authentication

### Wallet-Based Auth
- Verify wallet signature for protected routes
- Use `lib/auth/index.ts` for auth utilities

```typescript
import { verifySignature } from "@/lib/auth";

export async function GET(request: Request) {
  const wallet = request.headers.get("x-wallet-address");
  const signature = request.headers.get("x-signature");
  
  if (!wallet || !signature) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const isValid = await verifySignature(wallet, signature);
  if (!isValid) {
    return Response.json({ error: "Invalid signature" }, { status: 403 });
  }
  
  // ...
}
```

### Rate Limiting
- Use `lib/api/rate-limit.ts` for rate limiting
- Apply to sensitive endpoints

```typescript
import { rateLimit } from "@/lib/api/rate-limit";

const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  const { success } = await apiRateLimit(ip);
  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  
  // ...
}
```

## API Route Structure

### Route Template
```typescript
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/api/rate-limit";
import { normalizeError } from "@/lib/error-handler";
import { validateRequest } from "@/lib/api/auth";

// Schema validation
const Schema = z.object({ /* ... */ });

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const { success } = await rateLimit(ip);
    if (!success) {
      return NextResponse.json(
        { error: { message: "Too many requests", code: "RATE_LIMITED" } },
        { status: 429 }
      );
    }
    
    // Authentication
    const auth = await validateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: { message: "Unauthorized", code: "UNAUTHORIZED" } },
        { status: 401 }
      );
    }
    
    // Validation
    const body = await request.json();
    const data = Schema.parse(body);
    
    // Business logic
    const result = await doSomething(data);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const normalized = normalizeError(error);
    return NextResponse.json(
      { error: normalized },
      { status: normalized.statusCode || 500 }
    );
  }
}
```

## Database

### Use Parameterized Queries
```typescript
import { query, execute } from "@/lib/db/client";

// Parameterized query - prevents SQL injection
const users = await query<User>(
  "SELECT * FROM users WHERE id = $1", 
  [userId]
);

// Insert with returning
const [created] = await execute(
  "INSERT INTO listings (name, price) VALUES ($1, $2) RETURNING *",
  [name, price]
);
```

### Singleton Pattern
- Use the singleton pool from `lib/db/client.ts`
- Never create new connections

## Logging

### Use the Logger
```typescript
import { logger } from "@/lib/api/logger";

logger.info("Operation completed", { userId, action });
logger.error("Operation failed", { error: error.message, stack: error.stack });
```

## Files to Check

When reviewing backend code, check these files for patterns:
- `lib/error-handler.ts` - Error handling
- `lib/api/rate-limit.ts` - Rate limiting
- `lib/api/auth.ts` - Authentication
- `lib/db/client.ts` - Database client
