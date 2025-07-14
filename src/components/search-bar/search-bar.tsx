import type { FormEvent, JSX } from 'react';
import styles from './search-bar.module.css';
import type { SearchBarProps } from './search-bar.types';

export function SearchBar(props: SearchBarProps): JSX.Element {
  const { setSearchValue, defaultSearchValue } = props;

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
      throw new TypeError('not html form element');
    }

    const data = new FormData(event.target);
    const searchValue = data.get('search')?.toString().trim();

    if (searchValue) {
      setSearchValue(searchValue);
    }
  };

  const handleClear = (): void => {
    setSearchValue('');
  };

  return (
    <form onSubmit={submitHandler} className={styles.searchForm}>
      <div>
        <input
          className="input"
          type="search"
          name="search"
          defaultValue={defaultSearchValue}
          pattern="[\w'\-]*"
          placeholder="Search for a name..."
        />
      </div>
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
      <button onClick={handleClear} className={styles.resetButton}>
        Clear
      </button>
    </form>
  );
}
