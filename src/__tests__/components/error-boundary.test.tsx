import { ErrorBoundary } from '@components/error-boundary';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Test component
function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Safe content</div>;
}

describe('ErrorBoundary component', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Error. Please reload/i)).toBeInTheDocument();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Error. Please reload')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow />
      </ErrorBoundary>,
    );
    expect(consoleError).toHaveBeenCalled();
  });

  // Button tests

  it('renders child content when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('triggers fallback UI when error button is clicked', () => {
    function Button() {
      const [triggerError, setTriggerError] = React.useState(false);
      if (triggerError) throw new Error('Clicked error');
      return (
        <button type="button" onClick={() => setTriggerError(true)}>
          Trigger Error
        </button>
      );
    }

    render(
      <ErrorBoundary>
        <Button />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByText('Trigger Error'));
    expect(screen.getByText('Error. Please reload')).toBeInTheDocument();
  });
});
