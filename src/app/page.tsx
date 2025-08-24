'use client';

import { Pagination } from '@components/pagination/pagination';
import { PokemonList } from '@components/pokemon-list';
import { ITEM_PER_PAGE } from '@const/const';
import { useGetPokemonListFullQuery } from '@store/pokeApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { DetailsPanel } from './details';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams?.get('page') ?? '1';
  const currentPage = parseInt(pageParam, 10);
  const selectedId = searchParams?.get('id');
  const searchTerm = searchParams?.get('search') ?? '';

  const { data: items = [], isLoading, isFetching, error } = useGetPokemonListFullQuery({ term: searchTerm });
  const loading = isLoading || isFetching;
  const total = items.length;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    return items.slice(start, start + ITEM_PER_PAGE);
  }, [items, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', String(newPage));
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    if (selectedId) {
      params.set('id', selectedId);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleItemClick = (id: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('id', String(id));
    params.set('page', String(currentPage));
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete('id');
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="splitLayout">
      <div className="leftColumn">
        <PokemonList
          items={paginatedItems}
          loading={loading}
          error={error as string | null}
          onItemClick={handleItemClick}
        />
        {!loading && !error && items.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={ITEM_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {selectedId && (
        <div className="rightColumn">
          <DetailsPanel id={selectedId} currentPage={currentPage} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
}
