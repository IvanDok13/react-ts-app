import { ErrorBoundary } from '@components/error-boundary';
import { ThemeProvider } from '@context/themeContext';
import { AppRouter } from '@router/router';
import { store } from '@store/store';
import '@styles/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

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
      <Provider store={store}>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
