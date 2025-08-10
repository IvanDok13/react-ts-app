import { LoadingIndicator } from '@components/loader/loading-indicator';
import { useGetPokemonFullQuery } from '@store/pokeApi';
import { useNavigate, useParams } from 'react-router-dom';

export function Details() {
  const { id, page = '1' } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/${page}`);
  };

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonFullQuery(id ?? '', {
    skip: !id,
  });

  if (!id) return null;
  if (isLoading) return <LoadingIndicator />;
  if (error) return <p>Error: Failed to load details</p>;
  if (!pokemon) return <p>Pokemon run away</p>;

  return (
    <div>
      <button type="button" onClick={handleClose}>
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
