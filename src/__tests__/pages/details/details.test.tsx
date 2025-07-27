import * as api from '@apis/api';
import { LoadingIndicator } from '@components/loader/loading-indicator';
import { PokemonFull } from '@interfaces/interface';
import { Details } from '@pages/details/details';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fetchPokemonFull
vi.mock('@apis/api');

const mockPokemon: PokemonFull = {
  id: 25,
  name: 'pikachu',
  sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/25.png' },
  types: [],
};

const renderWithRoute = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/:page/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('Details component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading indicator initially', async () => {
    vi.spyOn(api, 'fetchPokemonFull').mockReturnValue(new Promise(() => {}));

    renderWithRoute('/1/25');
    expect(screen.getByRole('status')).toBeInTheDocument();
    <LoadingIndicator />;
  });

  it('displays Pokémon details when loaded', async () => {
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemon);

    renderWithRoute('/1/25');

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPokemon.sprites.front_default);
  });

  it('displays error message if fetch fails', async () => {
    vi.spyOn(api, 'fetchPokemonFull').mockRejectedValue(new Error('Failed to load'));

    renderWithRoute('/1/25');

    expect(await screen.findByText(/error: failed to load/i)).toBeInTheDocument();
  });

  it('displays fallback message if no Pokémon returned', async () => {
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(null as unknown as PokemonFull);

    renderWithRoute('/1/25');

    expect(await screen.findByText(/pokemon run away/i)).toBeInTheDocument();
  });

  it('navigates back on close button click', async () => {
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValue(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/3/25']}>
        <Routes>
          <Route path="/:page/:id" element={<Details />} />
          <Route path="/:page" element={<div>Back to list</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText(/pikachu/i);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.getByText(/back to list/i)).toBeInTheDocument();
    });
  });
});
