'use client';

import { ErrorBoundary } from '@components/error-boundary';
import { ErrorButton } from '@components/error-button';
import { Footer } from '@components/footer/footer';
import { SelectedBanner } from '@components/selected-banner/selected-banner';
import { ThemeProvider } from '@context/themeContext';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { HeaderWrapper } from './header-wrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <HeaderWrapper />
          {children}
          <SelectedBanner />
          <Footer />
          <ErrorButton />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
}
