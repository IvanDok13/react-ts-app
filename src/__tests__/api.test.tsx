import { fetchPokemonFull, fetchPokemonList } from '@apis/api';
import axios from 'axios';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as unknown as { get: Mock };

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('fetchPokemonList', () => {
    it('fetches full list without query', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          ],
        },
      });

      const results = await fetchPokemonList();
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('bulbasaur');
    });

    it('filters results when query is provided', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          results: [
            { name: 'bulbasaur', url: 'url1' },
            { name: 'pikachu', url: 'url2' },
            { name: 'charmander', url: 'url3' },
          ],
        },
      });

      const results = await fetchPokemonList('pika');
      expect(results).toEqual([{ name: 'pikachu', url: 'url2' }]);
    });

    it('throws error when fetchPokemonList fails', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(fetchPokemonList()).rejects.toThrow('Network Error');
      expect(errorSpy).toHaveBeenCalledWith('Error fetching Pokémon list:', expect.any(Error));
    });
  });

  describe('fetchPokemonFull', () => {
    it('fetches full pokemon data successfully', async () => {
      const mockData = {
        id: 25,
        name: 'pikachu',
        sprites: { front_default: 'url-to-image' },
        types: [{ type: { name: 'electric' } }],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const data = await fetchPokemonFull('25');
      expect(data.name).toBe('pikachu');
      expect(data.id).toBe(25);
      expect(data.types[0].type.name).toBe('electric');
    });

    it('throws error when fetchPokemonFull fails', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchPokemonFull('invalid_id')).rejects.toThrow('API Error');
      expect(errorSpy).toHaveBeenCalledWith('Error fetching full Pokémon data:', expect.any(Error));
    });
  });
});
