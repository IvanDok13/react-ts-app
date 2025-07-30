import { PokemonFull } from '@interfaces/interface';

interface Props {
  pokemon: PokemonFull;
  onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick = () => {} }: Props) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className="pokemon-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
    >
      <h4>{pokemon.name}</h4>
      {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
      <p>Type: {pokemon.types?.map(t => t.type.name).join(', ') || 'Unknown'}</p>
    </button>
  );
}
