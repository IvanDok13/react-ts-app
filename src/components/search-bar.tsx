import { useStorage } from '@hooks/UseStorage';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: Props): JSX.Element {
  const { getStorage, setStorage } = useStorage();
  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = getStorage();
    if (saved) setTerm(saved);
    inputRef.current?.focus();
  }, [getStorage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.currentTarget.value);
  };

  const handleClick = () => {
    const trimmed = term.trim();
    onSearch(trimmed);
    setStorage(trimmed);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div>
      <form noValidate method="" className="form">
        <input
          id="search"
          value={term}
          onChange={handleChange}
          placeholder="Pokemon name"
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button className="button" onClick={handleClick} type="button">
          Go!
        </button>
      </form>
    </div>
  );
}
