import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCars } from '../../services/cars';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters = null, thunkAPI) => {
    try {
      const response = await getCars(filters || {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      make: '',
      price: '',
      mileageFrom: '',
      mileageTo: '',
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    resetCars(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.items = action.payload.cars;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetCars } = carsSlice.actions;
export default carsSlice.reducer;