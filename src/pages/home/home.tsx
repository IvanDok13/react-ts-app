import { Pagination } from '@components/pagination/pagination';
import { PokemonList } from '@components/pokemon-list';
import { ITEM_PER_PAGE } from '@const/const';
import type { PokemonFull } from '@interfaces/interface';
import { useMemo } from 'react';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styles from './home.module.css';

interface ContextType {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export function Home(): JSX.Element {
  const { items, loading, error } = useOutletContext<ContextType>();
  const { page = '1', id } = useParams();
  const navigate = useNavigate();

  const currentPage = parseInt(page, 10);
  const total = items.length;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    return items.slice(start, start + ITEM_PER_PAGE);
  }, [items, currentPage]);

  const handlePageChange = (newPage: number) => {
    navigate(`/${newPage}`);
  };

  const handleItemClick = (ids: number) => {
    navigate(`/${currentPage}/${ids}`);
  };

  return (
    <div className={styles.splitLayout}>
      <div className={styles.leftColumn}>
        <PokemonList items={paginatedItems} loading={loading} error={error} onItemClick={handleItemClick} />
        {!loading && !error && items.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={ITEM_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {id && (
        <div className={styles.rightColumn}>
          <Outlet />
        </div>
      )}
    </div>
  );
}
