import { PokemonCard } from '@components/pokemon-card';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { PokemonFull } from '../../api';

describe('PokemonCard component', () => {
  const mock: PokemonFull = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png',
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  };

  const broken: PokemonFull = {
    id: 999,
    name: 'missingno',
    sprites: {
      front_default: '',
    },
    types: [],
  };

  it('displays item name and description correctly', () => {
    render(<PokemonCard pokemon={mock} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type: grass, poison/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mock.sprites.front_default);
  });

  it('handles missing sprite or type props gracefully', () => {
    render(<PokemonCard pokemon={broken} />);
    expect(screen.getByText(/missingno/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
  });
});
