import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global/cars';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ filters, page }) => {
    const params = {
      page,
      limit: 12,
      ...(filters.make && { make: filters.make }),
      ...(filters.price && { price: filters.price }),
      ...(filters.mileageFrom && { mileageFrom: filters.mileageFrom }),
      ...(filters.mileageTo && { mileageTo: filters.mileageTo }),
    };

    const response = await axios.get(BASE_URL, { params });
    return {
      cars: response.data,
      totalPages: 1, 
    };
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    make: '',
    price: '',
    mileageFrom: '',
    mileageTo: '',
  },
  page: 1,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    loadNextPage: (state) => {
      state.page += 1;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.items = [];
    },
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars } = action.payload;
        state.loading = false;
        state.items = [...state.items, ...cars];
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loadNextPage, setFilters, resetCars } = carsSlice.actions;
export default carsSlice.reducer;