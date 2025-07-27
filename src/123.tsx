import { PokemonFull } from '@interfaces/interface';
import { createContext, FormEvent, useContext, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useStorage } from 'src/hooks/UseStorage';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PaginatedPokemons extends PaginatedResponse<PokemonFull> {}

export interface DataContextValue {
  data: PaginatedPokemons | null;
  isLoading: boolean;
  totalPages: number;
  fetchData: (searchQuery: string, currentPage: string) => void;
}

const initialData: DataContextValue = {
  data: null,
  isLoading: true,
  totalPages: 1,
  fetchData: () => {},
};

export const DataContext = createContext<DataContextValue>(initialData);

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useData hook must be used within a DataProvider');
  }

  return context;
};

export function SearchBar() {
  const { getStorage, setStorage } = useStorage();
  const [searchValue, setSearchValue] = useState(getStorage() || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchData } = useData();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setStorage(searchValue);
    fetchData(searchValue, '1');
  };

  useEffect(() => {
    const searchQuery = getStorage() || '';
    setSearchValue(searchQuery);
  }, [getStorage]);

  return (
    <div>
      <form noValidate method="" className="form" onSubmit={handleSubmit}>
        <input
          id="search"
          value={searchValue}
          onChange={handleChange}
          placeholder="Pokemon name"
          // ref={inputRef}
          required
          // type="text"
        />
        <button className="button" type="button" aria-label="search button">
          Go!
        </button>
      </form>
    </div>
  );
}
