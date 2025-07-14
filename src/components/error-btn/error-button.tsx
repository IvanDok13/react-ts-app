import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './ErrorBtn.module.css';

interface ErrorButtonProps {
  children?: ReactNode;
}

interface ErrorButtonState {
  clicked: boolean;
}

class ButtonWithError extends Component<ErrorButtonProps, ErrorButtonState> {
  public state: ErrorButtonState = {
    clicked: false,
  };

  public handleClick: () => void = () => {
    this.setState({ clicked: true });
  };

  public render(): ReactNode {
    if (this.state.clicked) {
      throw new Error('Imitate error...');
    }
    return (
      <button onClick={this.handleClick} className={styles.errorBtn}>
        ErrorBoundaryBtn
      </button>
    );
  }
}

export default ButtonWithError;
