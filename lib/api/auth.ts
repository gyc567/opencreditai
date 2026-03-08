// Authorization helper for API routes
// Extracts and verifies creator from Authorization header

import { NextRequest, NextResponse } from "next/server";

export interface AuthUser {
  id: string;
  address: string;
  creatorId: number;
}

/**
 * Extract token from Authorization header
 * Format: Bearer <token>
 */
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}

/**
 * Decode and verify token
 * Returns null if invalid/expired
 */
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    
    // Check expiration
    if (decoded.exp && Date.now() > decoded.exp) {
      return null;
    }
    
    return {
      id: decoded.creatorId?.toString() || decoded.id?.toString(),
      address: decoded.address,
      creatorId: decoded.creatorId || decoded.id,
    };
  } catch {
    return null;
  }
}

/**
 * Require authentication - returns 401 if not authenticated
 */
export function requireAuth(request: NextRequest): AuthUser | NextResponse {
  const token = extractToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }
  
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
  
  return user;
}

/**
 * Require ownership - verifies user owns the resource
 * Use for: PATCH/DELETE on user-owned resources
 */
export function requireOwnership(
  request: NextRequest,
  resourceOwnerId: number
): AuthUser | NextResponse {
  const authResult = requireAuth(request);
  
  // If it's a NextResponse, return it (auth failed)
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  
  // Check ownership
  if (authResult.creatorId !== resourceOwnerId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized - you don't own this resource" },
      { status: 403 }
    );
  }
  
  return authResult;
}
