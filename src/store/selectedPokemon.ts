import type { PokemonFull } from '@interfaces/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedState {
  selected: Record<number, PokemonFull>;
}

const initialState: SelectedState = {
  selected: {},
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<PokemonFull>) {
      const { id } = action.payload;
      const selected = { ...state.selected };
      if (selected[id]) {
        delete selected[id];
      } else {
        selected[id] = action.payload;
      }
      return { ...state, selected };
    },
    clearSelected(state) {
      return { ...state, selected: {} };
    },
  },
});

export const { toggleSelected, clearSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
