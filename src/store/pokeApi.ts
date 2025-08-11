import type { Pokemon, PokemonFull, PokemonListResponse } from '@interfaces/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, LIMIT_POKEMON } from 'src/consts/const';

export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: ['PokemonList', 'Pokemon'],
  endpoints: builder => ({
    getPokemonList: builder.query<Pokemon[], { term: string } | void>({
      query: args => {
        const term = args?.term?.trim() ?? '';
        const offset = term ? 0 : Math.floor(Math.random() * 1000);
        return `?limit=${LIMIT_POKEMON}&offset=${offset}`;
      },
      transformResponse: (resp: PokemonListResponse, _meta, args) => {
        const term = args?.term?.trim().toLowerCase() ?? '';
        return term ? resp.results.filter(p => p.name.toLowerCase().includes(term)) : resp.results;
      },
      providesTags: (_result, _err, args) => [{ type: 'PokemonList', id: args?.term ?? '' }],
    }),

    getPokemonFull: builder.query<PokemonFull, string>({
      query: idOrName => `/${idOrName}`,
      providesTags: (_res, _err, idOrName) => [{ type: 'Pokemon', id: idOrName }],
    }),

    getPokemonListFull: builder.query<PokemonFull[], { term: string } | void>({
      async queryFn(arg, _api, _extraOptions, baseQuery) {
        const term = arg?.term?.trim() ?? '';
        const offset = term ? 0 : Math.floor(Math.random() * 1000);

        const listResp = await baseQuery(`?limit=${LIMIT_POKEMON}&offset=${offset}`);
        if (listResp.error) return { error: listResp.error };

        const list = (listResp.data as PokemonListResponse).results as Pokemon[];
        const filtered = term ? list.filter(p => p.name.toLowerCase().includes(term.toLowerCase())) : list;

        const detailPromises = filtered.map(p => baseQuery(`/${p.name}`));
        const detailResults = await Promise.all(detailPromises);

        const error = detailResults.find(r => r.error)?.error;
        if (error) return { error };

        const full = detailResults.map(r => r.data as PokemonFull);
        return { data: full };
      },
      providesTags: (result, _err, args) => {
        const tags = [{ type: 'PokemonList', id: args?.term ?? '' } as const];
        if (!result) return tags;
        return [...tags, ...result.map(p => ({ type: 'Pokemon' as const, id: String(p.id) }))];
      },
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonFullQuery, useGetPokemonListFullQuery } = pokeApi;
