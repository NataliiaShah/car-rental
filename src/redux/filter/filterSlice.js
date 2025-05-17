import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    model:'',
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
        model: '',
        price: '',
        mileageFrom: '',
        mileageTo: '',
      };
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;