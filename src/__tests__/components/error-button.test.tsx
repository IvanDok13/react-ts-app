import { ErrorBoundary } from '@components/error-boundary';
import { ErrorButton } from '@components/error-button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ErrorButton component with ErrorBoundary', () => {
  // Suppress expected React error logs
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws error when button is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    const button = screen.getByRole('button', { name: /Go Error/i });
    fireEvent.click(button);

    expect(
      screen.getByText(
        'Prepare for trouble! And make it double! To protect the world from devastation, To unite all peoples within our nation, To denounce the evils of truth and love, To extend our reach to the stars above! Team REACT 2025 blast off at the speed of light! Surrender now, or prepare to fight!',
      ),
    ).toBeInTheDocument();
  });

  it('renders fallback UI after error is thrown by ErrorButton', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Go Error/i }));

    expect(
      screen.getByText(
        'Prepare for trouble! And make it double! To protect the world from devastation, To unite all peoples within our nation, To denounce the evils of truth and love, To extend our reach to the stars above! Team REACT 2025 blast off at the speed of light! Surrender now, or prepare to fight!',
      ),
    ).toBeInTheDocument();
  });
});
