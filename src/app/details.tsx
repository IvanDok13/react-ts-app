'use client';

import { LoadingIndicator } from '@components/loader/loading-indicator';
import { useGetPokemonFullQuery } from '@store/pokeApi';

interface DetailsPanelProps {
  id: string;
  currentPage?: number;
  onClose: () => void;
}

export function DetailsPanel({ id, currentPage = 0, onClose }: DetailsPanelProps) {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonFullQuery(id, {
    skip: !id,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p>Error: Failed to load details</p>;
  if (!pokemon) return <p>Pokemon run away</p>;

  return (
    <div className="detailsPanel">
      <button type="button" onClick={onClose} className="closeButton">
        Close
      </button>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default ?? ''} alt={pokemon.name} />
      <p>Type: {pokemon.types?.map(t => t.type.name).join(', ') || 'Unknown'}</p>
      <p>Abilities: {pokemon.abilities?.map(a => a.ability.name).join(', ') || 'None'}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}
