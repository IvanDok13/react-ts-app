import type { ReactNode } from 'react';
import type { PokemonFull } from '../api';
import { LoadingIndicator } from './loader/loading-indicator';
import { PokemonCard } from './pokemon-card';

interface Props {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export function PokemonList({ loading, error, items }: Props): ReactNode {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Error: {error}</div>;
  if (!loading && !error && items.length === 0) return <div>No results</div>;

  return (
    <main className="pokemon-list">
      {items.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </main>
  );
}
