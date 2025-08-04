import { store } from '@store/store';
import { Provider } from 'react-redux';

export const withProviders = (children: React.ReactElement) => {
  return <Provider store={store}>{children}</Provider>;
};
