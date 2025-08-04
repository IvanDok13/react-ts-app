import { SelectedBanner } from '@components/selected-banner/selected-banner';
import { useAppSelector } from '@hooks/UseSelect';
import * as redux from '@store/selectedPokemon';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import { withProviders } from '../test-utils/test-utils';

// Mock selected state
vi.mock('@hooks/UseSelect', async () => {
  const actual = await vi.importActual<typeof import('@hooks/UseSelect')>('@hooks/UseSelect');
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: () => vi.fn(),
  };
});

describe('SelectedBanner component', () => {
  const mockPokemon = {
    id: 1,
    name: 'pikachu',
    types: [{ type: { name: 'electric' } }],
    abilities: [{ ability: { name: 'static' } }],
    height: 4,
    weight: 60,
    sprites: { front_default: '' },
  };

  it('renders only if selected list is not empty', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({ [mockPokemon.id]: mockPokemon });
    render(withProviders(<SelectedBanner />));

    expect(screen.getByText(/1 pokémon selected/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /unselect all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
  });

  it('does not render if selected list is empty', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({});
    const { container } = render(withProviders(<SelectedBanner />));
    expect(container.firstChild).toBeNull();
  });

  it('triggers clearSelected when "Unselect all" is clicked', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({ [mockPokemon.id]: mockPokemon });
    vi.spyOn(redux, 'clearSelected').mockReturnValue({ type: 'selected/clearSelected', payload: undefined });

    render(withProviders(<SelectedBanner />));
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(redux.clearSelected).toHaveBeenCalled();
  });
});
