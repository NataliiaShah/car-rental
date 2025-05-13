import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import favoritesReducer from './favorites/favoritesSlice'; 

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
  },
});