import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    price: '',
    mileageFrom: '',
    mileageTo: '',
  },
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return {
        brand: '',
        price: '',
        mileageFrom: '',
        mileageTo: '',
      };
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;