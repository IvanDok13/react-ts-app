import * as api from '@apis/api';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../app';

vi.mock('../api');

const mockPokemonList = [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }];

const mockPokemonFull = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png',
  },
  types: [{ type: { name: 'grass' } }],
};

describe('App Component Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('makes initial API call on mount if searchTerm is in localStorage', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockPokemonList);
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemonFull);

    render(<App />);

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('handles empty search on initial load if no searchTerm in localStorage', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });
  });

  it('shows and hides loading state during API calls', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockPokemonList);
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemonFull);

    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('calls API with correct search term on user input', async () => {
    const fetchList = vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockPokemonList);
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemonFull);

    render(<App />);

    const input = screen.getByPlaceholderText(/pokemon name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(screen.getByText(/go!/i));

    expect(fetchList).toHaveBeenCalledWith('bulbasaur');
    await screen.findByText(/bulbasaur/i);
  });

  it('handles API errors gracefully', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockRejectedValue(new Error('API failed'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error: api failed/i)).toBeInTheDocument();
    });
  });

  it('updates state with API response', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockPokemonList);
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemonFull);

    render(<App />);

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('manages search term state and updates results', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockPokemonList);
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemonFull);

    render(<App />);

    const input = screen.getByPlaceholderText(/pokemon name/i);
    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(screen.getByText(/go!/i));

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });
});
