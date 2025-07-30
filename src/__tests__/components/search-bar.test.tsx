import { SearchBar } from '@components/search-bar';
import { useStorage } from '@hooks/UseStorage';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

// Mock useStorage hook
vi.mock('@hooks/UseStorage', () => ({
  useStorage: vi.fn(),
}));

describe('SearchBar component', () => {
  const setup = (savedTerm: string | null = null) => {
    const getStorage = vi.fn(() => savedTerm);
    const setStorage = vi.fn();

    // Mock return value from useStorage
    (useStorage as unknown as Mock).mockReturnValue({
      getStorage,
      setStorage,
      clearStorage: vi.fn(),
    });

    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Pokemon name') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /go!/i });

    return { input, button, onSearch, getStorage, setStorage };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field and search button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows empty input if no saved term in storage', () => {
    const { input } = setup(null);
    expect(input.value).toBe('');
  });

  it('displays saved search term on mount', () => {
    const { input } = setup('pikachu');
    expect(input.value).toBe('pikachu');
  });

  it('updates input value when user types', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input.value).toBe('charizard');
  });

  it('trims and calls onSearch + setStorage on button click', () => {
    const { input, button, onSearch, setStorage } = setup();
    fireEvent.change(input, { target: { value: '   bulbasaur   ' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('bulbasaur');
    expect(setStorage).toHaveBeenCalledWith('bulbasaur');
  });

  it('overwrites previous value in storage with new search term', () => {
    const { input, button, onSearch, setStorage } = setup('eevee');
    fireEvent.change(input, { target: { value: 'mewtwo' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('mewtwo');
    expect(setStorage).toHaveBeenCalledWith('mewtwo');
  });

  it('calls onSearch and setStorage on Enter key', () => {
    const { input, onSearch, setStorage } = setup();
    fireEvent.change(input, { target: { value: 'snorlax' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onSearch).toHaveBeenCalledWith('snorlax');
    expect(setStorage).toHaveBeenCalledWith('snorlax');
  });
});
