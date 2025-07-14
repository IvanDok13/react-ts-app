import axios from 'axios';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonFull {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
}

interface PokemonListResponse {
  results: Pokemon[];
}

export const fetchPokemonList = async (query: string, limit: number = 20): Promise<Pokemon[]> => {
  const savedQuery = localStorage.getItem('pokemonSearchQuery') || '';
  const effectiveQuery = query || savedQuery;

  const useFullList = !effectiveQuery;

  const fullLimit = 20;
  const fetchLimit = useFullList ? fullLimit : limit;

  const response = await axios.get<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=0`
  );
  const results = response.data.results;

  if (query) {
    localStorage.setItem('pokemonSearchQuery', query);
  }

  if (!effectiveQuery) return results;

  return results.filter(p => p.name.toLowerCase().includes(effectiveQuery.toLowerCase()));
};

export const fetchPokemonFull = (url: string): Promise<PokemonFull> =>
  axios.get<PokemonFull>(url).then(response => response.data);
