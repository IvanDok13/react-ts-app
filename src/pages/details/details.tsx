import { fetchPokemonFull } from '@apis/api';
import { LoadingIndicator } from '@components/loader/loading-indicator';
import type { PokemonFull } from '@interfaces/interface';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function Details() {
  const { id, page = '1' } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/${page}`);
  };

  const [pokemon, setPokemon] = useState<PokemonFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchPokemonFull(id)
      .then(data => {
        console.log(data);
        setPokemon(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;
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
