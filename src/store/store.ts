import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '@store/selectedPokemon';
import { pokeApi } from './pokeApi';

export const store = configureStore({
  reducer: {
    [pokeApi.reducerPath]: pokeApi.reducer,
    selected: selectedReducer,
  },
  middleware: getDefault => getDefault().concat(pokeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
