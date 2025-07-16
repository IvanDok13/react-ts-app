import { ErrorButton } from '@components/error-button';
import type { ReactNode } from 'react';
import { Component } from 'react';
import type { PokemonFull } from './api';
import { fetchPokemonFull, fetchPokemonList } from './api';
import styles from './app.module.css';
import { PokemonList } from './components/pokemon-list';
import { SearchBar } from './components/search-bar';

interface State {
  items: PokemonFull[];
  loading: boolean;
  error: string | null;
}

export class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
    };
  }

  public componentDidMount(): void {
    const lastTerm = localStorage.getItem('lastSearchTerm');
    if (lastTerm) {
      this.handleSearch(lastTerm);
    } else {
      this.handleSearch('');
    }
  }

  public handleSearch = (term: string): void => {
    const trimmed = term.trim();

    if (trimmed !== '') {
      localStorage.setItem('lastSearchTerm', trimmed);
    }

    this.setState({ loading: true, error: null, items: [] });

    fetchPokemonList(trimmed)
      .then(list => Promise.all(list.slice(0, 20).map(p => fetchPokemonFull(p.url))))
      .then(fulls => this.setState({ items: fulls, loading: false }))
      .catch((error: unknown) => {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        this.setState({ error: errorMessage, loading: false });
      });
  };

  public render(): ReactNode {
    const { items, loading, error } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>PokéFinder</h1>
        <SearchBar onSearch={this.handleSearch} />
        <ErrorButton />
        <PokemonList items={items} loading={loading} error={error} />
      </div>
    );
  }
}
