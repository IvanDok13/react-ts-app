import { API, LIMIT_POKEMON } from '@const/const';
import { Pokemon, PokemonFull, PokemonListResponse } from '@interfaces/interface';
import axios from 'axios';

export const fetchPokemonList = async (query: string = ''): Promise<Pokemon[]> => {
  try {
    const offset = query ? 0 : Math.floor(Math.random() * 1000);
    const response = await axios.get<PokemonListResponse>(`${API}?limit=${LIMIT_POKEMON}&offset=${offset}`);
    const { results } = response.data;

    return query ? results.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw new Error('Network Error');
  }
};

export const fetchPokemonFull = async (url: string): Promise<PokemonFull> => {
  try {
    const response = await axios.get<PokemonFull>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching full Pokémon data:', error);
    throw new Error('API Error');
  }
};
