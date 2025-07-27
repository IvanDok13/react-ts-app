import About from '@pages/about/about';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('About page', () => {
  it('renders GitHub link with correct href', () => {
    render(<About />);
    const githubLink = screen.getByTestId('github-link') as HTMLAnchorElement;
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/IvanDok13');
  });

  it('renders RS School link with correct href and target', () => {
    render(<About />);
    const rssLink = screen.getByTestId('rss-github-link') as HTMLAnchorElement;
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute('href', 'https://rs.school/');
    expect(rssLink).toHaveAttribute('target', '_blank');
  });

  it('renders two images', () => {
    render(<About />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'public/img/aboutIK.jpg');
    expect(images[1]).toHaveAttribute('src', 'public/svg/rsslogo.svg');
  });

  it('renders containers correctly', () => {
    render(<About />);
    expect(screen.getByTestId('github-link')).toBeInTheDocument();
    expect(screen.getByTestId('rss-github-link')).toBeInTheDocument();
  });
});
