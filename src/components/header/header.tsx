import { LangSwitcher } from '@components/lang-switcher';
import { SearchBar } from '@components/search-bar';
import { ThemeSwitcher } from '@components/theme-switcher/theme-switcher';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';

interface Props {
  onSearch: (term: string) => void;
}

export function Header({ onSearch }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href="/" className={styles.logoLink}>
          <Image width={50} height={50} src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg" alt="Logo" />
        </Link>
        <h1 className={styles.title}>PokéFinder</h1>
        <Link href="/about" className={styles.logoLink}>
          About
        </Link>
        <LangSwitcher />
        <SearchBar onSearch={onSearch} />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
