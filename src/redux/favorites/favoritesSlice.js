import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const carId = action.payload;
      if (state.items.includes(carId)) {
        state.items = state.items.filter(id => id !== carId);
      } else {
        state.items.push(carId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;