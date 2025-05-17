import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../../redux/filter/filterSlice';
import style from "./CarFilter.module.css";

const CarFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const allCars = useSelector(state => state.cars.items);

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
    <form className={style.filterBox}>
      <label className={style.form}>
        <span className={style.labelText}>Car brand</span>
        <div className={style.customSelect}>
          <select
            className={style.selectStyled}
            name="brand"
            value={filters.brand}
            onChange={handleChange}
          >
            <option value="">Choose a brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <img src="/images/vector.svg" alt="Arrow" className={style.selectIcon} />
        </div>
      </label>

      <label className={style.form}>
        <span className={style.labelText}>Model</span>
        <div className={style.customSelect}>
          <select
            className={style.selectStyled}
            name="model"
            value={filters.model}
            onChange={handleChange}
          >
          <option value="">Choose a model</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
          </select>
          <img src="/images/vector.svg" alt="Arrow" className={style.selectIcon} />
          </div>
      </label>

      <label className={style.form}>
        <span className={style.labelText}>Price/ 1 hour</span>
        <div className={style.customSelect}>
          <select
            className={style.selectStyled}
            name="price"
            value={filters.price}
            onChange={handleChange}
          >
          <option value="">Choose a price</option>
          {prices.map(price => (
            <option key={price} value={price}>${price}</option>
          ))}
          </select>
          <img src="/images/vector.svg" alt="Arrow" className={style.selectIcon} />
          </div>
      </label>

      <label className={style.form}>
        <span className={style.labelText}>Car mileage / km</span>
        <div className={style.doubleSelectWrapper}>
          <select
            className={style.selectHalf}
            name="mileageFrom"
            value={filters.mileageFrom}
            onChange={handleChange}
          >
            <option value="">From</option>
            {mileages.map(m => (
              <option key={`from-${m}`} value={m}>{m}</option>
            ))}
          </select>
          <div className={style.divider}></div>
          <select
            className={style.selectHalf}
            name="mileageTo"
            value={filters.mileageTo}
            onChange={handleChange}
          >
            <option value="">To</option>
            {mileages.map(m => (
              <option key={`to-${m}`} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </label>
      
      <button type="button" onClick={handleReset} className={style.filterBtn}>
        Reset Filters
      </button>
    </form>
  );
};

export default CarFilter;