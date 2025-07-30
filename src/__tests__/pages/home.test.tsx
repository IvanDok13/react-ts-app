import { ITEM_PER_PAGE } from '@const/const';
import type { PokemonFull } from '@interfaces/interface';
import { Home } from '@pages/home/home';
import { render, screen } from '@testing-library/react';
import * as router from 'react-router-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mocked Pokémon list
const mockItems: PokemonFull[] = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  name: `pokemon-${index + 1}`,
  sprites: { front_default: `url-${index + 1}` },
  types: [],
}));

// Default context mock
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => ({
      items: mockItems,
      loading: false,
      error: null,
    }),
  };
});

describe('Home component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRoute = (initialPath: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/:page" element={<Home />}>
            <Route path=":id" element={<div>Details Panel</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  };

  it('renders paginated list of items', () => {
    renderWithRoute('/1');

    for (let i = 1; i <= ITEM_PER_PAGE; i += 1) {
      expect(screen.getByText(`pokemon-${i}`)).toBeInTheDocument();
    }

    expect(screen.queryByText(/details panel/i)).not.toBeInTheDocument();
  });

  it('renders detail panel when ID is in URL', () => {
    renderWithRoute('/1/3');
    expect(screen.getByText(/details panel/i)).toBeInTheDocument();
  });

  it('does not show pagination when loading', () => {
    vi.spyOn(router, 'useOutletContext').mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    renderWithRoute('/1');
    expect(screen.queryByText(/page/i)).not.toBeInTheDocument();
  });

  it('displays error message if error is returned', () => {
    vi.spyOn(router, 'useOutletContext').mockReturnValue({
      items: [],
      loading: false,
      error: 'Error fetching data',
    });

    renderWithRoute('/1');
    expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
  });
});
