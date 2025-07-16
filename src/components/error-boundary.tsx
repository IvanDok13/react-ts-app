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
    return hasError ? <div>Error. Please reload</div> : children;
  }
}
