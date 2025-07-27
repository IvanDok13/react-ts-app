import { SearchBar } from '@components/search-bar';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

interface Props {
  onSearch: (term: string) => void;
}

export function Header({ onSearch }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to="/" className={styles.logoLink}>
          <img className={styles.logo} src="/svg/logo.svg" alt="Logo" />
        </Link>
        <h1 className={styles.title}>PokéFinder</h1>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}
