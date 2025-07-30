import { PageLayout } from '@components/page-layout/page-structure';
import About from '@pages/about/about';
import { Details } from '@pages/details/details';
import { ErrorPage } from '@pages/error-page/error';
import { Home } from '@pages/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
          <Route path=":page" element={<Home />}>
            <Route path=":id" element={<Details />} />
          </Route>
          <Route path={AppRoutes.ABOUT_ROUTE} element={<About />} />
        </Route>
        <Route path={AppRoutes.ERROR_ROUTE} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
