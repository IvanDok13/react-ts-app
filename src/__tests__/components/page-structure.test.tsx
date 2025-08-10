import { PageLayout } from '@components/page-layout/page-structure';
import type { PokemonFull } from '@interfaces/interface';
import { useGetPokemonListFullQuery } from '@store/pokeApi';
import { screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { renderThemeProvider } from '../test-utils/test-utils';

vi.mock('@components/header/header', () => ({
  Header: ({ onSearch }: { onSearch: (term: string) => void }) => (
    <button type="button" data-testid="mock-header" onClick={() => onSearch('pikachu')}>
      Mock Header
    </button>
  ),
}));

vi.mock('@components/footer/footer', () => ({
  Footer: () => <div data-testid="mock-footer">Mock Footer</div>,
}));

vi.mock('@components/error-button', () => ({
  ErrorButton: () => <div data-testid="mock-error-button">Mock Error Button</div>,
}));

vi.mock('@components/selected-banner/selected-banner', () => ({
  SelectedBanner: () => <div data-testid="mock-selected-banner">Mock Selected Banner</div>,
}));

vi.mock('@components/refetch-btn', () => ({
  RefetchButton: () => <div data-testid="mock-refetch">Mock Refetch</div>,
}));

vi.mock('@store/pokeApi', async importOriginal => {
  const actual = await importOriginal<typeof import('@store/pokeApi')>();
  return {
    ...actual,
    useGetPokemonListFullQuery: vi.fn(),
  };
});

describe('PageLayout component (RTK Query)', () => {
  const mockPokemon: PokemonFull = {
    id: 25,
    name: 'pikachu',
    sprites: { front_default: 'https://example.com/pikachu.png' },
    types: [{ type: { name: 'electric' } }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header, selected banner, footer, error button, and children route', async () => {
    (useGetPokemonListFullQuery as unknown as Mock).mockReturnValue({
      data: [mockPokemon],
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    renderThemeProvider(
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<div>Mock Home</div>} />
        </Route>
      </Routes>,
    );

    expect(await screen.findByTestId('mock-header')).toBeInTheDocument();
    expect(await screen.findByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-error-button')).toBeInTheDocument();
    expect(await screen.findByText('Mock Home')).toBeInTheDocument();
    expect(screen.getByTestId('mock-selected-banner')).toBeInTheDocument();
    expect(screen.getByTestId('mock-refetch')).toBeInTheDocument();
  });

  it('handles search error correctly', async () => {
    (useGetPokemonListFullQuery as unknown as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: { status: 500, data: 'Server Error' },
      refetch: vi.fn(),
    });

    renderThemeProvider(
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<div>Fallback</div>} />
        </Route>
      </Routes>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
  });
});
