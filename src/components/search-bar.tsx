import type { ChangeEvent, ReactNode } from 'react';
import { Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
}
interface State {
  term: string;
}

export class SearchBar extends Component<Props, State> {
  public state = { term: '' };

  public handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: event.currentTarget.value });
  };

  public handleClick = (): void => {
    const trimmed = this.state.term.trim();
    this.props.onSearch(trimmed);
  };

  public render(): ReactNode {
    return (
      <div>
        <input value={this.state.term} onChange={this.handleChange} placeholder="Pokemon name" />
        <button className="button" onClick={this.handleClick}>
          Go!
        </button>
      </div>
    );
  }
}
