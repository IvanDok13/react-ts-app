import { Component } from 'react';
import ButtonWithError from '../error-btn/error-button';
import { SearchBar } from './components/search-bar';
import { SearchRequestDisplay } from './components/search-result-display';

type State = {
  searchValue: string;
};

const lsPrefix = 'name';

export class MainPage extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem(`${lsPrefix}searchValue`) ?? '',
    };
  }

  public render(): JSX.Element {
    const { searchValue: value } = this.state;
    return (
      <div className="min-h-dvh flex flex-col">
        <ButtonWithError />
        <SearchBar
          defaultSearchValue={value}
          setSearchValue={data => {
            this.setState({ searchValue: data });
            localStorage.setItem(`${lsPrefix}searchValue`, data);
          }}
        />
        <SearchRequestDisplay searchValue={value} />
      </div>
    );
  }
}
