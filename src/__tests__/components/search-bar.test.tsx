import { SearchBar } from '@components/search-bar';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const STORAGE_KEY = 'searchTerm';

describe('SearchBar component', () => {
  const setup = (savedTerm: string | null = null) => {
    localStorage.clear();
    if (savedTerm !== null) {
      localStorage.setItem(STORAGE_KEY, savedTerm);
    }

    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Pokemon name') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /go!/i });

    return { input, button, onSearch };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // render
  it('renders input field and search button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows empty input if no saved term in localStorage', () => {
    const { input } = setup(null);
    expect(input.value).toBe('');
  });

  it('displays saved search term from localStorage on mount', () => {
    const savedTerm = 'pikachu';
    const { input } = setup(savedTerm);
    expect(input.value).toBe(savedTerm);
  });

  // User interaction
  it('updates input value when user types', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input.value).toBe('charizard');
  });

  it('trims and saves search term to localStorage on button click', () => {
    const { input, button, onSearch } = setup();
    fireEvent.change(input, { target: { value: '   bulbasaur   ' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
  });

  // Integration with localStorage
  it('overwrites previous value in localStorage with new search term', () => {
    const { input, button, onSearch } = setup('eevee');
    fireEvent.change(input, { target: { value: 'mewtwo' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('mewtwo');
  });
});
