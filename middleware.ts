import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BOT_PATTERN = /bot|crawler|spider|Googlebot|Bingbot|Baiduspider|DuckDuckBot|Slackbot|facebookexternalhit/i;

const MACHINE_PATTERN = /curl|Wget|Claude|ChatGPT|OpenClaw/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';

  const isBot = BOT_PATTERN.test(userAgent);
  const isMachine = MACHINE_PATTERN.test(userAgent) || accept.includes('text/markdown');

  if (isMachine && !isBot && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/api/agent-init', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
