import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StarterPackCard } from './starter-pack-card';

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('StarterPackCard Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders Agentic tab by default', () => {
    render(<StarterPackCard />);
    expect(screen.getByText(/Core Productivity Pack/i)).toBeDefined();
    expect(screen.getByText(/@OpenClaw: Access https:\/\/openclaw.com/i)).toBeDefined();
    expect(screen.getByText(/Safe Mode Enforced/i)).toBeDefined();
  });

  it('switches to CLI tab and shows CLI command', () => {
    render(<StarterPackCard />);
    const cliTab = screen.getByTestId('tab-cli');
    fireEvent.click(cliTab);
    
    expect(screen.getByText(/openclaw install @packs\/starter-core/i)).toBeDefined();
  });

  it('copies text and starts radar animation', () => {
    render(<StarterPackCard />);
    const copyBtn = screen.getByTestId('copy-btn');
    
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('@OpenClaw: Access')
    );
    expect(screen.getByText(/Listening for Claw.../i)).toBeDefined();
    
    // Fast-forward to sync done
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    
    expect(screen.getByText(/Refresh Status/i)).toBeDefined();
  });
});
