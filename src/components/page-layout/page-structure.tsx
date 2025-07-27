import { fetchPokemonFull, fetchPokemonList } from '@apis/api';
import { ErrorButton } from '@components/error-button';
import { Footer } from '@components/footer-el/footer';
import { Header } from '@components/header-el/header';
import { ITEM_PER_PAGE, LAST_TERM } from '@const/const';
import type { PokemonFull } from '@interfaces/interface';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function PageLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState<PokemonFull[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    (term: string): void => {
      const trimmed = term.trim();
      setLoading(true);
      setError(null);
      setItems([]);

      fetchPokemonList(trimmed)
        .then(list => Promise.all(list.slice(0, ITEM_PER_PAGE).map(p => fetchPokemonFull(p.url))))
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
    [navigate, location.pathname],
  );

  useEffect(() => {
    handleSearch(LAST_TERM ?? '');
  }, [handleSearch]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main>
        <Outlet context={{ items, loading, error }} />
      </main>
      <Footer />
      <ErrorButton />
    </>
  );
}
