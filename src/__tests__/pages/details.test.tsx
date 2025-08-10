import type { PokemonFull } from '@interfaces/interface';
import { Details } from '@pages/details/details';
import { useGetPokemonFullQuery } from '@store/pokeApi';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

vi.mock('@store/pokeApi', () => ({
  useGetPokemonFullQuery: vi.fn(),
}));

const mockPokemon: PokemonFull = {
  id: 25,
  name: 'pikachu',
  sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/25.png' },
  types: [{ type: { name: 'electric' } }],
  abilities: [{ ability: { name: 'static' } }],
  height: 4,
  weight: 60,
};

const renderWithRoute = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/:page/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );

describe('Details component (RTK Query)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading indicator while fetching', () => {
    (useGetPokemonFullQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    renderWithRoute('/1/25');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders Pokémon details when loaded', async () => {
    (useGetPokemonFullQuery as unknown as Mock).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });

    renderWithRoute('/1/25');

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPokemon.sprites.front_default);
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
    expect(screen.getByText(/abilities:/i)).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText(/weight:/i)).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    (useGetPokemonFullQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500, data: 'Server Error' },
    });

    renderWithRoute('/1/25');

    expect(await screen.findByText(/error: failed to load details/i)).toBeInTheDocument();
  });

  it('shows fallback when no Pokémon is returned', async () => {
    (useGetPokemonFullQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
    });

    renderWithRoute('/1/25');

    expect(await screen.findByText(/pokemon run away/i)).toBeInTheDocument();
  });

  it('navigates back to the list on Close', async () => {
    (useGetPokemonFullQuery as unknown as Mock).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });

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
