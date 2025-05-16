import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../../redux/filter/filterSlice';

const CarFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          placeholder="Enter brand"
        />
      </label>

      <label>
        Max Price:
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleChange}
          placeholder="Enter max price"
          min="0"
        />
      </label>

      <label>
        Mileage From:
        <input
          type="number"
          name="mileageFrom"
          value={filters.mileageFrom}
          onChange={handleChange}
          placeholder="Min mileage"
          min="0"
        />
      </label>

      <label>
        Mileage To:
        <input
          type="number"
          name="mileageTo"
          value={filters.mileageTo}
          onChange={handleChange}
          placeholder="Max mileage"
          min="0"
        />
      </label>

      <button type="button" onClick={handleReset}>Reset Filters</button>
    </form>
  );
};

export default CarFilter;