import { useAppDispatch } from '@hooks/UseSelect';
import { pokeApi } from '@store/pokeApi';

export function RefetchButton({ term }: { term: string }) {
  const dispatch = useAppDispatch();
  const handleRefresh = () => {
    dispatch(pokeApi.util.invalidateTags([{ type: 'PokemonList', id: term }, { type: 'Pokemon' }]));
  };
  return (
    <button type="button" onClick={handleRefresh}>
      Refetch
    </button>
  );
}
