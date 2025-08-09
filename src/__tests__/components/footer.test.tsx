import { Footer } from '@components/footer/footer';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderThemeProvider } from '../test-utils/test-utils';

describe('Footer component', () => {
  it('renders copyright text and PokeAPI link', () => {
    renderThemeProvider(<Footer />);

    expect(screen.getByText(/© 2025 Data sourced from the:/i)).toBeInTheDocument();

    const pokeApiLink = screen.getByRole('link', { name: /Pokemon api/i });
    expect(pokeApiLink).toBeInTheDocument();
    expect(pokeApiLink).toHaveAttribute('href', 'https://pokeapi.co/');
  });

  it('renders GitHub link with correct text and aria-label', () => {
    renderThemeProvider(<Footer />);

    const githubLink = screen.getByRole('link', { name: /Github link/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/IvanDok13');
    expect(screen.getByText('IvanDok')).toBeInTheDocument();
  });

  it('renders RS School link with correct aria-label', () => {
    renderThemeProvider(<Footer />);

    const rsSchoolLink = screen.getByRole('link', { name: /RSSchool link/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
