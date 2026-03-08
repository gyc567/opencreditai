import { NextRequest, NextResponse } from 'next/server';

// Allowed origins (configure via ALLOWED_ORIGINS env var, comma-separated)
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://openclaw-skills.vercel.app',
      'https://openclaw-skills-git-*.vercel.app',
    ];

/**
 * CORS middleware for API routes
 */
export function corsMiddleware(req: NextRequest): NextResponse | null {
  const origin = req.headers.get('origin');
  
  // Check if origin is allowed
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes('*') ||
    ALLOWED_ORIGINS.some(allowed => 
      allowed === origin || 
      allowed.endsWith('*') && origin.startsWith(allowed.replace('*', ''))
    )
  );

  if (!origin || !isAllowed) {
    // For same-origin requests, no CORS needed
    return null;
  }

  const response = NextResponse.next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Max-Age', '86400');

  return response;
}

/**
 * Handle CORS preflight requests
 */
export function handleCorsPreflight(req: NextRequest): NextResponse | null {
  const origin = req.headers.get('origin');
  
  if (!origin) {
    return null;
  }

  const isAllowed = ALLOWED_ORIGINS.includes('*') || 
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGINS.some(allowed => allowed.endsWith('*') && origin.startsWith(allowed.replace('*', '')));

  if (!isAllowed) {
    return new NextResponse(null, { 
      status: 403,
      statusText: 'Forbidden - Origin not allowed'
    });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
