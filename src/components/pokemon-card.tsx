import { useAppDispatch, useAppSelector } from '@hooks/UseSelect';
import { PokemonFull } from '@interfaces/interface';
import { toggleSelected } from '@store/selectedPokemon';
import Image from 'next/image';

interface Props {
  pokemon: PokemonFull;
  onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick = () => {} }: Props) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(state => Boolean(state.selected.selected[pokemon.id]));

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleSelected(pokemon));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <button type="button" className="pokemon-card" onClick={onClick} onKeyDown={handleKeyDown}>
      <label className="pokemon-checkbox" htmlFor="pokemon-checkbox">
        <input
          id="pokemon-checkbox"
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          onClick={e => e.stopPropagation()}
        />
        <h4>{pokemon.name}</h4>
      </label>
      {pokemon.sprites.front_default && (
        <Image width={100} height={100} src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <p>Type: {pokemon.types?.map(t => t.type.name).join(', ') || 'Unknown'}</p>
    </button>
  );
}
