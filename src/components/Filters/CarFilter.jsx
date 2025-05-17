import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../../redux/filter/filterSlice';

const CarFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const allCars = useSelector(state => state.cars.items);

  // Отримати унікальні значення
  const brands = [...new Set(allCars.map(car => car.brand))];
  const models = [...new Set(allCars.map(car => car.model))];
  const prices = [...new Set(allCars.map(car => parseFloat(car.rentalPrice.replace('$', ''))))].sort((a, b) => a - b);
  const mileages = [...new Set(allCars.map(car => car.mileage))].sort((a, b) => a - b);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <form>
      <label>
        Brand:
        <select name="brand" value={filters.brand} onChange={handleChange}>
          <option value="">All brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </label>

      <label>
        Model:
        <select name="model" value={filters.model} onChange={handleChange}>
          <option value="">All models</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </label>

      <label>
        Max Price:
        <select name="price" value={filters.price} onChange={handleChange}>
          <option value="">Any price</option>
          {prices.map(price => (
            <option key={price} value={price}>${price}</option>
          ))}
        </select>
      </label>

      <label>
        Mileage From:
        <select name="mileageFrom" value={filters.mileageFrom} onChange={handleChange}>
          <option value="">Any</option>
          {mileages.map(m => (
            <option key={`from-${m}`} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <label>
        Mileage To:
        <select name="mileageTo" value={filters.mileageTo} onChange={handleChange}>
          <option value="">Any</option>
          {mileages.map(m => (
            <option key={`to-${m}`} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <button type="button" onClick={handleReset}>Reset Filters</button>
    </form>
  );
};

export default CarFilter;