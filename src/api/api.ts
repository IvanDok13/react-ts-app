import type { PokemonResponse } from './components/search-result-display/request.schema';
import { responseSchema } from './components/search-result-display/request.schema';

const baseUrl = 'https://api.pokemontcg.io/v2/cards';

function buildUrl(params: Record<string, string>): string {
  return `${baseUrl}?${new URLSearchParams(params).toString()}`;
}

export async function getPokemonInfo(params: Record<string, string>): Promise<PokemonResponse> {
  const response = await fetch(buildUrl(params));
  const parsedData = responseSchema.cast(await response.json());
  return parsedData;
}
