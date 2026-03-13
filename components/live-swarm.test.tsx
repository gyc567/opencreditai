import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LiveSwarm } from './live-swarm';

describe('LiveSwarm Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders the header correctly', () => {
    render(<LiveSwarm />);
    expect(screen.getByText('LIVE: OpenClaw Economy Pulse')).toBeDefined();
  });

  it('adds events over time and keeps only the latest 5', () => {
    render(<LiveSwarm />);
    
    // Initial state: 1 event
    expect(screen.getAllByTestId('event-icon')).toHaveLength(1);

    // Fast-forward to add more events
    act(() => {
      vi.advanceTimersByTime(3500 * 2); // Add 2 more events
    });
    
    expect(screen.getAllByTestId('event-icon')).toHaveLength(3);

    // Fast-forward past 5 events
    act(() => {
      vi.advanceTimersByTime(3500 * 10);
    });

    // Should be capped at 5
    expect(screen.getAllByTestId('event-icon')).toHaveLength(5);
  });
});
