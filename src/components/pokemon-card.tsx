import type { FC } from 'react';
import type { PokemonFull } from '../api';

export const PokemonCard: FC<{ pokemon: PokemonFull }> = ({ pokemon }) => (
  <div className="pokemon-card">
    <h4>{pokemon.name}</h4>
    {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
    <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
  </div>
);
