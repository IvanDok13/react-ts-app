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
    this.state = { term: '' };
  }

  public handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: event.currentTarget.value });
  };

  public handleClick = (): void => {
    const { term } = this.state;
    const trimmed = term.trim();
    const { props } = this;
    props.onSearch(trimmed);
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
