import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  // Test that Choreslist heading exists
  it('should render Choreslist heading', () => {
    const heading = screen.getByText(/choreslist/i);

    expect(heading).toBeInTheDocument();
  });
});
