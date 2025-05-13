import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import filtersReducer from './filters/CarFilter';
import favoritesReducer from './favorites/CarCard';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});