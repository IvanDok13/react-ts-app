import { SearchBar } from '@components/search-bar/search-bar';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const lsPrefix = 'name';

import { useEffect, useState } from 'react';

export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState<string>(() => {
    return localStorage.getItem(`${lsPrefix}searchValue`) || '';
  });

  useEffect(() => {
    localStorage.setItem(`${lsPrefix}searchValue`, searchValue);
  }, [searchValue]);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerLogoWrapper}>
          <Link className={styles.headerLogo} to="/">
            <img className={styles.headerLogoImg} src="/svg/logo.svg" alt="Logo" />
          </Link>
        </div>
        <SearchBar defaultSearchValue={searchValue} setSearchValue={setSearchValue} />
        <SearchRequestDisplay searchValue={searchValue} />
      </div>
    </header>
  );
};
