import { PokemonList } from '@components/pokemon-list';
import type { PokemonFull } from '@interfaces/interface';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockPokemon: PokemonFull = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png',
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

const brokenPokemon: PokemonFull = {
  id: 999,
  name: 'missingno',
  sprites: {
    front_default: '',
  },
  types: [],
};

describe('PokemonList component', () => {
  it('renders correct number of items when data is provided', () => {
    const secondMockPokemon: PokemonFull = {
      ...mockPokemon,
      id: 2,
      name: 'ivysaur',
      sprites: {
        front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png',
      },
    };

    render(<PokemonList items={[mockPokemon, secondMockPokemon]} loading={false} error={null} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  it('displays "no results" message when data array is empty', () => {
    render(<PokemonList items={[]} loading={false} error={null} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(<PokemonList items={[]} loading error={null} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('correctly displays item names and descriptions', () => {
    render(<PokemonList items={[mockPokemon]} loading={false} error={null} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type: grass, poison/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPokemon.sprites.front_default);
  });

  it('handles missing or undefined data gracefully', () => {
    render(<PokemonList items={[brokenPokemon]} loading={false} error={null} />);
    expect(screen.getByText(/missingno/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
  });

  it('displays error message when API call fails', () => {
    render(<PokemonList items={[]} loading={false} error="Something went wrong" />);
    expect(screen.getByText(/error: something went wrong/i)).toBeInTheDocument();
  });

  it('shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
    render(<PokemonList items={[]} loading={false} error="404 Not Found" />);
    expect(screen.getByText(/error: 404 not found/i)).toBeInTheDocument();

    render(<PokemonList items={[]} loading={false} error="500 Internal Server Error" />);
    expect(screen.getByText(/error: 500 internal server error/i)).toBeInTheDocument();
  });
});
