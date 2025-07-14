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

export const fetchPokemonList = async (query: string = ''): Promise<Pokemon[]> => {
  const limit = 1300;
  const offset = query ? 0 : Math.floor(Math.random() * 1000);

  const response = await axios.get<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const results = response.data.results;

  return query ? results.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : results;
};

export const fetchPokemonFull = async (url: string): Promise<PokemonFull> => {
  const response = await axios.get<PokemonFull>(url);
  return response.data;
};
