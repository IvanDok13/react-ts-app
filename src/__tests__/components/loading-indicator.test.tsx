import { LoadingIndicator } from '@components/loader/loading-indicator';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LoadingIndicator component', () => {
  it('renders loading spinner (pokeball)', () => {
    render(<LoadingIndicator />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('has appropriate ARIA attributes for accessibility', () => {
    render(<LoadingIndicator />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders children if provided', () => {
    render(
      <LoadingIndicator>
        <p>Loading Pokémons...</p>
      </LoadingIndicator>,
    );
    expect(screen.getByText('Loading Pokémons...')).toBeInTheDocument();
  });
});
