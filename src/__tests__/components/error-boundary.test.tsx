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
    expect(
      screen.getByText(
        /Prepare for trouble! And make it double! To protect the world from devastation, To unite all peoples within our nation, To denounce the evils of truth and love, To extend our reach to the stars above! Team REACT 2025 blast off at the speed of light! Surrender now, or prepare to fight!/i,
      ),
    ).toBeInTheDocument();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText(
        'Prepare for trouble! And make it double! To protect the world from devastation, To unite all peoples within our nation, To denounce the evils of truth and love, To extend our reach to the stars above! Team REACT 2025 blast off at the speed of light! Surrender now, or prepare to fight!',
      ),
    ).toBeInTheDocument();
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
    expect(
      screen.getByText(
        'Prepare for trouble! And make it double! To protect the world from devastation, To unite all peoples within our nation, To denounce the evils of truth and love, To extend our reach to the stars above! Team REACT 2025 blast off at the speed of light! Surrender now, or prepare to fight!',
      ),
    ).toBeInTheDocument();
  });
});
