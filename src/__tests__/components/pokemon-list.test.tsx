import { PokemonList } from '@components/pokemon-list';
import type { PokemonFull } from '@interfaces/interface';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { withProviders } from '../test-utils/test-utils';

const mockPokemon: PokemonFull = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png',
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

describe('PokemonList component', () => {
  it('renders multiple items with correct names', () => {
    const secondMock: PokemonFull = {
      ...mockPokemon,
      id: 2,
      name: 'ivysaur',
      sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/2.png' },
    };

    render(withProviders(<PokemonList items={[mockPokemon, secondMock]} loading={false} error={null} />));

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  it('handles click on card', () => {
    const onClick = vi.fn();
    render(withProviders(<PokemonList items={[mockPokemon]} loading={false} error={null} onItemClick={onClick} />));
    fireEvent.click(screen.getByText(/bulbasaur/i));
    expect(onClick).toHaveBeenCalledWith(1);
  });
});
