import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const exists = state.items.includes(action.payload);
      state.items = exists
        ? state.items.filter(id => id !== action.payload)
        : [...state.items, action.payload];
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;