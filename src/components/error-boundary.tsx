import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state = { hasError: false };

  public static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  public render(): ReactNode {
    return this.state.hasError ? <div>Something went wrong. Please try again.</div> : this.props.children;
  }
}
