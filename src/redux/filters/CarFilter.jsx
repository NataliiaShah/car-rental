import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, setFilters, resetCars } from '../cars/carsSlice';
import { useState } from 'react';

export default function CarFilter() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.cars.filters);
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = (e) => {
    setLocalFilters(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    if (JSON.stringify(localFilters) !== JSON.stringify(filters)) {
      dispatch(resetCars());
      dispatch(setFilters(localFilters));
      dispatch(fetchCars(localFilters));
    }
  };

  return (
    <div>
      <div>
        <label>Brand: </label>
        <input name="make" value={localFilters.make || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Price: </label>
        <input name="price" value={localFilters.price || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Mileage From: </label>
        <input name="mileageFrom" value={localFilters.mileageFrom || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Mileage To: </label>
        <input name="mileageTo" value={localFilters.mileageTo || ''} onChange={handleChange} />
      </div>
      <button onClick={applyFilters}>Apply filters</button>
    </div>
  );
}