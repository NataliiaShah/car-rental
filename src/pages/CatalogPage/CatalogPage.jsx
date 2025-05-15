import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { nanoid } from 'nanoid'; 
import {
  fetchCars,
  resetCars,
  loadNextPage,
} from '../../redux/cars/carsSlice';

import CarCard from '../../components/CarCard/CarCard';
import CarFilter from '../../components/Filters/CarFilter';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, loading, error, filters, page, totalPages } = useSelector(state => state.cars);

  useEffect(() => {
    dispatch(resetCars());
    dispatch(fetchCars());
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    dispatch(loadNextPage());
    dispatch(fetchCars());
  };

  return (
    <div>
      <h2>Catalog</h2>
      <CarFilter />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {items.map(car => (
          <CarCard key={nanoid()} car={car} /> 
        ))}
      </div>

      {!loading && page < totalPages && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}