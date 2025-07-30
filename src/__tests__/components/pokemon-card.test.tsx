import { PokemonCard } from '@components/pokemon-card';
import type { PokemonFull } from '@interfaces/interface';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

  it('renders the card with correct name, types, and image', () => {
    render(<PokemonCard pokemon={mock} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type: grass, poison/i)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mock.sprites.front_default);
    expect(image).toHaveAttribute('alt', 'bulbasaur');
  });

  it('handles missing image and types gracefully', () => {
    render(<PokemonCard pokemon={broken} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/missingno/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<PokemonCard pokemon={mock} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter or Space is pressed', () => {
    const onClick = vi.fn();
    render(<PokemonCard pokemon={mock} onClick={onClick} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
