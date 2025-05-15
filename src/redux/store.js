import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import filtersReducer from './filter/filterSlice';
import favoritesReducer from './favorites/favoritesSlice'; 

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});