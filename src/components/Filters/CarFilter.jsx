import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/cars/carsSlice';  

const CarFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.cars.filters);  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    dispatch(setFilters({
      ...filters,  
      [name]: value,  
    }));
  };

  return (
    <div>
      <select name="make" value={filters.make} onChange={handleFilterChange}>
        <option value="">All Makes</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
      </select>
    </div>
  );
};

export default CarFilter;