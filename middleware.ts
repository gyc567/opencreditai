import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';

  // Check if the request is from a machine, crawler, CLI, or AI Agent
  const isMachine = 
    userAgent.includes('curl') || 
    userAgent.includes('Wget') || 
    userAgent.includes('Claude') || 
    userAgent.includes('ChatGPT') ||
    userAgent.includes('OpenClaw') ||
    accept.includes('text/markdown');

  // If accessing the root and identified as a machine
  if (isMachine && request.nextUrl.pathname === '/') {
    // Redirect to the dedicated plain-text endpoint for Agents
    return NextResponse.rewrite(new URL('/api/agent-init', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
