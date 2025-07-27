import { PokemonList } from '@components/pokemon-list';
import type { PokemonFull } from '@interfaces/interface';
import { useOutletContext } from 'react-router-dom';

interface ContextType {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export function Home(): JSX.Element {
  const { items, loading, error } = useOutletContext<ContextType>();

  return <PokemonList items={items} loading={loading} error={error} />;
}
