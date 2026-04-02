import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StarterPackCard } from './starter-pack-card';

const mockStarterPackData = {
  agent_protocol: "AOTUI-v1",
  pack_name: "Core Productivity Pack",
  pack_description: "Essential skills for every new OpenCreditAi agent.",
  safe_mode_required: true,
  skills: [
    { id: "self-improving-agent", name: "Self Improving Agent", category: "ai-enhancement" },
    { id: "find-skills", name: "Find Skills Skill", category: "tools" },
    { id: "summarize", name: "Summarize", category: "information" },
  ],
  agent_prompt: "@OpenClaw: Access https://openclaw.com",
  short_prompt: "openclaw install @packs/starter-core",
};

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('StarterPackCard Component', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStarterPackData),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Agentic tab by default after loading', async () => {
    render(<StarterPackCard />);
    
    const copyBtn = await screen.findByTestId('copy-btn', {}, { timeout: 3000 });
    expect(copyBtn).toBeDefined();
    expect(screen.getByText(/Core Productivity Pack/i)).toBeDefined();
    expect(screen.getByText(/Safe Mode Enforced/i)).toBeDefined();
  });

  it('switches to CLI tab and shows CLI command', async () => {
    render(<StarterPackCard />);

    const cliTab = await screen.findByTestId('tab-cli', {}, { timeout: 3000 });
    fireEvent.click(cliTab);

    expect(screen.getByText(/npx clawhub@latest install/i)).toBeDefined();
  });

  it('copies text to clipboard and shows listening state', async () => {
    render(<StarterPackCard />);

    const copyBtn = await screen.findByTestId('copy-btn', {}, { timeout: 3000 });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('@OpenClaw')
    );

    expect(screen.getByText(/Listening for Claw.../i)).toBeDefined();
  });
});
