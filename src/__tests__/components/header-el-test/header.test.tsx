import { Header } from '@components/header-el/header';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'src/__tests__/test-utils/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('Header', () => {
  it('renders logo, title, and About link', () => {
    renderWithProviders(<Header onSearch={() => {}} />);

    expect(screen.getByText(/pokéfinder/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });

  it('calls onSearch when SearchBar is used', () => {
    const handleSearch = vi.fn();
    renderWithProviders(<Header onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/pokemon name/i);
    fireEvent.change(input, { target: { value: 'squirtle' } });

    const button = screen.getByRole('button', { name: /go!/i });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith('squirtle');
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
