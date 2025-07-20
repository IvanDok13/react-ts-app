import axios from 'axios';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchPokemonFull, fetchPokemonList } from '../api';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as unknown as { get: Mock };

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
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
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(fetchPokemonList()).rejects.toThrow('Network Error');
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

      const data = await fetchPokemonFull('https://pokeapi.co/api/v2/pokemon/25/');
      expect(data.name).toBe('pikachu');
      expect(data.id).toBe(25);
    });

    it('throws error when fetchPokemonFull fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchPokemonFull('invalid_url')).rejects.toThrow('API Error');
    });
  });
});
