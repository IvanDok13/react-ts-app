import { ThemeProvider } from '@context/themeContext';
import { store } from '@store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </ThemeProvider>,
  );
};

export const withProviders = (children: React.ReactElement) => {
  return <Provider store={store}>{children}</Provider>;
};
