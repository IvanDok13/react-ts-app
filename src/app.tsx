import { fetchPokemonFull, fetchPokemonList } from '@apis/api';
import { ErrorButton } from '@components/error-button';
import { PokemonList } from '@components/pokemon-list';
import { SearchBar } from '@components/search-bar';
import type { PokemonFull } from '@interfaces/interface';
import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './app.module.css';
import { ITEM_PER_PAGE, LAST_TERM } from './consts/const';

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
    if (LAST_TERM) {
      this.handleSearch(LAST_TERM);
    } else {
      this.handleSearch('');
    }
  }

  public handleSearch = (term: string): void => {
    const trimmed = term.trim();

    this.setState({ loading: true, error: null, items: [] });

    fetchPokemonList(trimmed)
      .then(list => Promise.all(list.slice(0, ITEM_PER_PAGE).map(p => fetchPokemonFull(p.url))))
      .then(fulls => this.setState({ items: fulls, loading: false }))
      .catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
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
