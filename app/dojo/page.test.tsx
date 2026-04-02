import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ClawDojoPage from './page';

const mockStarterPackData = {
  agent_protocol: "AOTUI-v1",
  pack_name: "Core Productivity Pack",
  pack_description: "Essential skills for every new OpenCreditAi agent.",
  safe_mode_required: true,
  skills: [
    { id: "self-improving-agent", name: "Self Improving Agent", category: "ai-enhancement" },
  ],
  agent_prompt: "@OpenClaw: Access https://openclaw.com",
  short_prompt: "openclaw install @packs/starter-core",
};

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Claw Dojo Page', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStarterPackData),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the cyberware clinic hero section', async () => {
    render(<ClawDojoPage />);
    await waitFor(() => {
      expect(screen.getByText(/Equip Your/i)).toBeDefined();
    });
    expect(screen.getByText(/Agent Cyberware Clinic/i)).toBeDefined();
  });

  it('renders the StarterPackCard by default', async () => {
    render(<ClawDojoPage />);
    await waitFor(() => {
      expect(screen.getByTestId('starter-pack-card')).toBeDefined();
    });
    expect(screen.getByTestId('starter-pack-card')).toBeDefined();
  });

  it('hides the extended dojo initially and shows it after clicking "Explore"', async () => {
    render(<ClawDojoPage />);
    
    await waitFor(() => {
      expect(screen.queryByText(/Advanced Cyberware/i)).toBeNull();
    });

    const exploreBtn = screen.getByText(/Explore 700\+ Advanced Skills/i);
    fireEvent.click(exploreBtn);

    await waitFor(() => {
      expect(screen.getByText(/Advanced Cyberware/i)).toBeDefined();
    });
    expect(screen.queryByText(/Explore 700\+ Advanced Skills/i)).toBeNull();
  });
});
