export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonFull {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  base_experience: number;
  species: { name: string; url: string };
  moves: { move: { name: string } }[];
  game_indices: { game_index: number; version: { name: string } }[];
  location_area_encounters: string;
  is_default: boolean;
  order: number;
  forms: { name: string; url: string }[];
  version_details: {
    rarity: number;
    version: { name: string; url: string };
    moves: { move: { name: string } }[];
  }[];
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}
