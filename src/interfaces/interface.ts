export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonFull {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  description?: string;
  experience?: number;
  abilities?: { ability: { name: string } }[];
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}
