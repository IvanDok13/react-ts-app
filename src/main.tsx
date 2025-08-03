import { ErrorBoundary } from '@components/error-boundary';
import { AppRouter } from '@router/router';
import '@styles/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/themeContext';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

const root = document.querySelector('#app');

if (!(root instanceof HTMLElement)) {
  throw new TypeError('App element not found or is not an HTMLElement');
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
