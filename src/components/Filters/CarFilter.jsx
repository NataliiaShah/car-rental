import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/cars/carsSlice';

export default function CarFilter() {
  const filters = useSelector(state => state.cars.filters);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  return (
    <div>
      <label>
        Make:
        <input
          type="text"
          name="make"
          value={filters.make}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Max Price:
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Mileage From:
        <input
          type="number"
          name="mileageFrom"
          value={filters.mileageFrom}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Mileage To:
        <input
          type="number"
          name="mileageTo"
          value={filters.mileageTo}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
}