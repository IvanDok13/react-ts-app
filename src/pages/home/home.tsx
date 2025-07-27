import { Pagination } from '@components/pagination/pagination';
import { PokemonList } from '@components/pokemon-list';
import { ITEM_PER_PAGE } from '@const/const';
import type { PokemonFull } from '@interfaces/interface';
import { useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import styles from './home.module.css';

interface ContextType {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export function Home(): JSX.Element {
  const { items, loading, error } = useOutletContext<ContextType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const total = items.length;

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEM_PER_PAGE;
    return items.slice(start, start + ITEM_PER_PAGE);
  }, [items, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className={styles.home}>
      <PokemonList items={paginatedItems} loading={loading} error={error} />
      {!loading && !error && items.length > 0 && (
        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={ITEM_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
