export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonFull {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  abilities?: { ability: { name: string } }[];
  height?: number;
  weight?: number;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}
