import { fetchPokemonFull, fetchPokemonList } from '@apis/api';
import { ErrorButton } from '@components/error-button';
import { Footer } from '@components/footer-el/footer';
import { Header } from '@components/header-el/header';
import { LAST_TERM } from '@const/const';
import type { PokemonFull } from '@interfaces/interface';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function PageLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<PokemonFull[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [term, setTerm] = useState<string>(LAST_TERM ?? '');

  const handleSearch = useCallback(
    (newTerm: string): void => {
      const trimmed = newTerm.trim();
      setLoading(true);
      setError(null);
      setItems([]);
      setTerm(trimmed);
      setSearchParams({ page: '1' });

      fetchPokemonList(trimmed)
        .then(list => Promise.all(list.map(p => fetchPokemonFull(p.url))))
        .then(fulls => {
          setItems(fulls);
          setLoading(false);
        })
        .catch(catchError => {
          const errorMessage = catchError instanceof Error ? catchError.message : 'Unknown error';
          setError(errorMessage);
          setLoading(false);
        });

      if (location.pathname !== '/') {
        navigate('/');
      }
    },
    [navigate, location.pathname, setSearchParams],
  );

  useEffect(() => {
    console.log('PageLayout mounted');
    handleSearch(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="main">
        <Outlet context={{ items, loading, error }} />
      </main>
      <Footer />
      <ErrorButton />
    </>
  );
}
