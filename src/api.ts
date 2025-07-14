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

export const fetchPokemonList = (query: string): Promise<Pokemon[]> =>
  axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`).then(response => {
    const results: Pokemon[] = response.data.results;
    return results.filter(p => p.name.includes(query.toLowerCase()));
  });

export const fetchPokemonFull = (url: string): Promise<PokemonFull> =>
  axios.get<PokemonFull>(url).then(response => response.data);
