import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClawDojoPage from './page';

describe('Claw Dojo Page', () => {
  it('renders the cyberware clinic hero section', () => {
    render(<ClawDojoPage />);
    expect(screen.getByText(/Equip Your/i)).toBeDefined();
    expect(screen.getByText(/Agent Cyberware Clinic/i)).toBeDefined();
  });

  it('renders the StarterPackCard by default', () => {
    render(<ClawDojoPage />);
    // Check if the StarterPackCard rendered (it has a test id)
    expect(screen.getByTestId('starter-pack-card')).toBeDefined();
  });

  it('hides the extended dojo initially and shows it after clicking "Explore"', () => {
    render(<ClawDojoPage />);
    
    // Advanced Cyberware section should not be visible initially
    expect(screen.queryByText(/Advanced Cyberware/i)).toBeNull();

    // Find and click the explore button
    const exploreBtn = screen.getByText(/Explore 700\+ Advanced Skills/i);
    fireEvent.click(exploreBtn);

    // Advanced Cyberware section should now be visible
    expect(screen.getByText(/Advanced Cyberware/i)).toBeDefined();
    // The explore button should disappear
    expect(screen.queryByText(/Explore 700\+ Advanced Skills/i)).toBeNull();
  });
});
