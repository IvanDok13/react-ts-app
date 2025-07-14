import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  err: Error | null;
  errInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    err: null,
    errInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      err: error,
      errInfo: errorInfo,
    });
  }

  public render(): ReactNode {
    if (this.state.errInfo) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
