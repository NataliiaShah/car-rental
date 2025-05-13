import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCars } from '../../redux/cars/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import CarFilter from '../components/CarFilter';

export default function CatalogPage() {
  const { items, loading, error, filters } = useSelector(state => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [dispatch, filters]);

  return (
    <div>
      <h2>Catalog</h2>
      <CarFilter />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {items.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}