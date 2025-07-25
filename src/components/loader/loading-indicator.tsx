import type { ReactNode } from 'react';
import styles from './loading-indicator.module.css';

interface LoadingIndicatorProps {
  children?: ReactNode;
}

export function LoadingIndicator({ children = null }: LoadingIndicatorProps) {
  return (
    <div className={styles.loadingIndicator} role="status" aria-label="Loading">
      <div className={styles.pokeball} aria-hidden="true" />
      <span className={styles.screenReader}>Loading...</span>
      {children}
    </div>
  );
}
