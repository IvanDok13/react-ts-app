import { SearchBar } from '@components/search-bar';
import { ThemeSwitcher } from '@components/theme-switcher/theme-switcher';
import { AppRoutes } from '@router/routes';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

interface Props {
  onSearch: (term: string) => void;
}

export function Header({ onSearch }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to={AppRoutes.HOME_ROUTE} className={styles.logoLink}>
          <img className={styles.logo} src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg" alt="Logo" />
        </Link>
        <h1 className={styles.title}>PokéFinder</h1>
        <Link to={AppRoutes.ABOUT_ROUTE} className={styles.logoLink}>
          About
        </Link>
        <SearchBar onSearch={onSearch} />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
