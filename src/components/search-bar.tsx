import type { ChangeEvent, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
}
interface State {
  term: string;
}

export class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const saved = localStorage.getItem('searchTerm') || '';
    this.state = { term: saved };
  }

  public handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: event.currentTarget.value });
  };

  public handleClick = (): void => {
    const { term } = this.state;
    const trimmed = term.trim();
    const { props } = this;
    props.onSearch(trimmed);
    localStorage.setItem('searchTerm', trimmed);
  };

  public render(): ReactNode {
    const { term } = this.state;

    return (
      <div>
        <input value={term} onChange={this.handleChange} placeholder="Pokemon name" />
        <button className="button" onClick={this.handleClick} type="button">
          Go!
        </button>
      </div>
    );
  }
}
