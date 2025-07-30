import { PokemonList } from '@components/pokemon-list';
import type { PokemonFull } from '@interfaces/interface';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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
  it('renders correct number of items', () => {
    const secondMock: PokemonFull = {
      ...mockPokemon,
      id: 2,
      name: 'ivysaur',
      sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png' },
    };

    render(<PokemonList items={[mockPokemon, secondMock]} loading={false} error={null} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  it('displays "The Pokemon ran away" when list is empty', () => {
    render(<PokemonList items={[]} loading={false} error={null} />);
    expect(screen.getByText(/the pokemon ran away/i)).toBeInTheDocument();
  });

  it('shows loading indicator when loading is true', () => {
    render(<PokemonList items={[]} loading error={null} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message if error is provided', () => {
    render(<PokemonList items={[]} loading={false} error="Something went wrong" />);
    expect(screen.getByText(/error: something went wrong/i)).toBeInTheDocument();
  });

  it('renders names and types correctly', () => {
    render(<PokemonList items={[mockPokemon]} loading={false} error={null} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type: grass, poison/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'bulbasaur');
  });

  it('handles broken data (no image)', () => {
    render(<PokemonList items={[brokenPokemon]} loading={false} error={null} />);
    expect(screen.getByText(/missingno/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
  });

  it('calls onItemClick when a card is clicked', () => {
    const onClick = vi.fn();
    render(<PokemonList items={[mockPokemon]} loading={false} error={null} onItemClick={onClick} />);
    fireEvent.click(screen.getByText(/bulbasaur/i));
    expect(onClick).toHaveBeenCalledWith(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
