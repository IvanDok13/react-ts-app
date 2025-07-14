import type { ReactNode } from 'react';
import { Component } from 'react';
import type { PokemonFull } from '../api';
import { PokemonCard } from './pokemon-card';

interface Props {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export class PokemonList extends Component<Props> {
  public render(): ReactNode {
    const { loading, error, items } = this.props;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <div className="pokemon-list">
        {items.map(p => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    );
  }
}
