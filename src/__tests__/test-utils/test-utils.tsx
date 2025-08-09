import { ThemeProvider } from '@context/themeContext';
import { store } from '@store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const renderThemeProvider = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/']}>{component}</MemoryRouter>
    </ThemeProvider>,
  );
};

export const withProviders = (children: React.ReactElement) => {
  return <Provider store={store}>{children}</Provider>;
};
