import { PokemonFull } from '@interfaces/interface';
import { LoadingIndicator } from './loader/loading-indicator';
import { PokemonCard } from './pokemon-card';

interface Props {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
  onItemClick?: (id: number) => void;
}

export function PokemonList({ loading, error, items, onItemClick = () => {} }: Props) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Error: {error}</div>;
  if (items.length === 0) return <div>The Pokemon ran away</div>;

  return (
    <ul className="pokemon-list">
      {items.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => onItemClick(pokemon.id)} />
      ))}
    </ul>
  );
}
