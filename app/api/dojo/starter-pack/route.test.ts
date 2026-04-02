import { GET } from './route';
import { NextRequest } from 'next/server';
import { describe, it, expect } from 'vitest';

describe('GET /api/dojo/starter-pack', () => {
  it('returns valid AOTUI JSON schema', async () => {
    const req = new NextRequest('http://localhost:3000/api/dojo/starter-pack');
    const response = await GET(req);
    
    expect(response.status).toBe(200);
    const json = await response.json();
    
    expect(json.agent_protocol).toBe("AOTUI-v1");
    expect(json.safe_mode_required).toBe(true);
    expect(json.pack_name).toBe("Core Productivity Pack");
    expect(json.skills).toHaveLength(7);
    
    const githubSkill = json.skills.find((s: any) => s.id === 'self-improving-agent');
    expect(githubSkill).toBeDefined();
    expect(githubSkill.category).toBe("ai-enhancement");
  });
});
