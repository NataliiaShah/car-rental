import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import filtersReducer from '../components/CarFilter';
import favoritesReducer from '../components/CarCard/CarCard';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});