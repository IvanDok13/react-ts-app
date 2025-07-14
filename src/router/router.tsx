import { ErrorPage } from '@pages/error-page/error-page';
import { Home } from '@pages/home/home';
import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
      <Route path={AppRoutes.ERROR_ROUTE} element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
