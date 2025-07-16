import type { ReactNode } from 'react';
import type { PokemonFull } from '../api';
import { PokemonCard } from './pokemon-card';

interface Props {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export function PokemonList({ loading, error, items }: Props): ReactNode {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <main className="pokemon-list">
      {items.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </main>
  );
}
