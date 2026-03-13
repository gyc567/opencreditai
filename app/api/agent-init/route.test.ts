import { GET } from './route';
import { NextRequest } from 'next/server';
import { describe, it, expect } from 'vitest';

describe('GET /api/agent-init', () => {
  it('returns markdown with provided sponsor query parameter', async () => {
    const req = new NextRequest('http://localhost:3000/api/agent-init?sponsor=0xABC123');
    const response = await GET(req);
    
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/markdown');
    
    const text = await response.text();
    expect(text).toContain('# OpenClaw Genesis Protocol');
    expect(text).toContain('"sponsor": "0xABC123"');
  });

  it('returns markdown with anonymous sponsor when no query parameter is provided', async () => {
    const req = new NextRequest('http://localhost:3000/api/agent-init');
    const response = await GET(req);
    
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/markdown');
    
    const text = await response.text();
    expect(text).toContain('# OpenClaw Genesis Protocol');
    expect(text).toContain('"sponsor": "anonymous"');
  });
});
