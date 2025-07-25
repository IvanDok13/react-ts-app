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

    const button = screen.getByRole('button', { name: /get error/i });
    fireEvent.click(button);

    expect(screen.getByText('Error. Please reload')).toBeInTheDocument();
  });

  it('renders fallback UI after error is thrown by ErrorButton', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole('button', { name: /get error/i }));

    expect(screen.getByText('Error. Please reload')).toBeInTheDocument();
  });
});
