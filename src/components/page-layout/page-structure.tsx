import { ErrorButton } from '@components/error-button';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import { RefetchButton } from '@components/refetch-btn';
import { SelectedBanner } from '@components/selected-banner/selected-banner';
import { useStorage } from '@hooks/UseStorage';
import type { PokemonFull } from '@interfaces/interface';
import { useGetPokemonListFullQuery } from '@store/pokeApi';
import { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function PageLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const { getStorage } = useStorage();
  const [term, setTerm] = useState<string>(getStorage ?? '');

  const { data: items = [], isLoading, isFetching, error } = useGetPokemonListFullQuery({ term });

  let errMsg: string | null;
  const loading = isLoading || isFetching;
  if (error && 'status' in error && typeof error.data === 'string' && error.data) {
    errMsg = 'Network Error';
  } else {
    errMsg = null;
  }

  const handleSearch = useCallback(
    (newTerm: string): void => {
      const trimmed = newTerm.trim();
      setTerm(trimmed);
      setSearchParams({ page: '1' });

      if (location.pathname !== '/') {
        navigate('/');
      }
    },
    [navigate, location.pathname, setSearchParams],
  );

  const outletContext = useMemo(
    () => ({
      items: items as PokemonFull[],
      loading,
      error: errMsg,
    }),
    [items, loading, errMsg],
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <RefetchButton term={term} />
      <main className="main">
        <Outlet context={outletContext} />
      </main>
      <SelectedBanner />
      <Footer />
      <ErrorButton />
    </>
  );
}
