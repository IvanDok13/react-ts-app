import * as api from '@apis/api';
import { PageLayout } from '@components/page-layout/page-structure';
import type { PokemonFull } from '@interfaces/interface';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@components/header-el/header', () => ({
  Header: ({ onSearch }: { onSearch: (term: string) => void }) => (
    <button type="button" data-testid="mock-header" onClick={() => onSearch('pikachu')}>
      Mock Header
    </button>
  ),
}));

vi.mock('@components/footer-el/footer', () => ({
  Footer: () => <div data-testid="mock-footer">Mock Footer</div>,
}));

vi.mock('@components/error-button', () => ({
  ErrorButton: () => <div data-testid="mock-error-button">Mock Error Button</div>,
}));

vi.mock('@components/selected-banner/selected-banner', () => ({
  SelectedBanner: () => <div data-testid="mock-selected-banner">Mock Selected Banner</div>,
}));

describe('PageLayout component', () => {
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
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValueOnce([{ name: 'pikachu', url: '' }]);
    vi.spyOn(api, 'fetchPokemonFull').mockResolvedValueOnce(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<div>Mock Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-error-button')).toBeInTheDocument();
    expect(await screen.findByText('Mock Home')).toBeInTheDocument();
    expect(screen.getByTestId('mock-selected-banner')).toBeInTheDocument();
  });

  it('handles search error correctly', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockRejectedValueOnce(new Error('Fetch failed'));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<div>Fallback</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
  });
});
