import { ErrorBoundary } from '@components/error-boundary';
import '@styles/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

document.body.innerHTML = '<div id="app"></div>';

const root = document.querySelector('#app');
if (!(root instanceof HTMLElement)) {
  throw new TypeError('App element not found or is not an HTMLElement');
}

createRoot(document.querySelector('#app')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
