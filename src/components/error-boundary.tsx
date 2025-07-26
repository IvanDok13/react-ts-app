import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? (
      <div className="error-boundary__wrapper">
        <div className="error-boundary">
          Prepare for trouble! And make it double! To protect the world from devastation, To unite all peoples within
          our nation, To denounce the evils of truth and love, To extend our reach to the stars above! Team REACT 2025
          blast off at the speed of light! Surrender now, or prepare to fight!
        </div>
      </div>
    ) : (
      children
    );
  }
}
