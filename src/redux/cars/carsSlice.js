import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ filters = {}, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://car-rental-api.goit.global/cars');
      
     // console.log('API response data:', response.data);

      let cars = response.data.cars;

      if (filters.brand) {
        cars = cars.filter(car =>
          car.brand.toLowerCase().includes(filters.brand.toLowerCase())
        );
      }

      if (filters.model) {
        cars = cars.filter(car =>
          car.model.toLowerCase().includes(filters.model.toLowerCase())
        );
      }

      if (filters.price) {
        const maxPrice = parseFloat(filters.price);
        cars = cars.filter(car => {
          const priceNumber = parseFloat(car.rentalPrice.replace('$', ''));
          return priceNumber <= maxPrice;
        });
      }

      if (filters.mileageFrom) {
        cars = cars.filter(car => car.mileage >= parseInt(filters.mileageFrom));
      }

      if (filters.mileageTo) {
        cars = cars.filter(car => car.mileage <= parseInt(filters.mileageTo));
      }

      const perPage = 12;
      const totalPages = Math.ceil(cars.length / perPage);
      const paginatedCars = cars.slice((page - 1) * perPage, page * perPage);

      return { cars: paginatedCars, totalPages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
    loadNextPage(state) {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        if (state.page === 1) {
          state.items = action.payload.cars;
        } else {
          const newCars = action.payload.cars.filter(newCar =>
            !state.items.some(existingCar => existingCar.id === newCar.id)
          );
          state.items = [...state.items, ...newCars];
        }

        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars, loadNextPage } = carsSlice.actions;
export default carsSlice.reducer;