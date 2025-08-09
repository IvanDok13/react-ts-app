import { PokemonCard } from '@components/pokemon-card';
import type { PokemonFull } from '@interfaces/interface';
import { store } from '@store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

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

  beforeEach(() => {
    store.dispatch({ type: 'selected/clearSelected' });
  });

  it('renders the card with correct name, types, and image', () => {
    renderWithProvider(<PokemonCard pokemon={mock} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type: grass, poison/i)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mock.sprites.front_default);
    expect(image).toHaveAttribute('alt', 'bulbasaur');
  });

  it('handles missing image and types gracefully', () => {
    renderWithProvider(<PokemonCard pokemon={broken} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/missingno/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithProvider(<PokemonCard pokemon={mock} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter or Space is pressed', () => {
    const onClick = vi.fn();
    renderWithProvider(<PokemonCard pokemon={mock} onClick={onClick} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('toggles checkbox selection in redux state', () => {
    renderWithProvider(<PokemonCard pokemon={mock} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
