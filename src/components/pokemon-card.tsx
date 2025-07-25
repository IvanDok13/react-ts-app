import type { PokemonFull } from '@interfaces/interface';

export function PokemonCard({ pokemon }: { pokemon: PokemonFull }) {
  return (
    <div className="pokemon-card">
      <h4>{pokemon.name}</h4>
      {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
      <p>Type: {pokemon.types?.map(t => t.type.name).join(', ') || 'Unknown'}</p>
    </div>
  );
}
