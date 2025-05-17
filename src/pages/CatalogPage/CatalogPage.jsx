import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, resetCars, loadNextPage } from '../../redux/cars/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import CarFilter from '../../components/CarFilter/CarFilter';
import style from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { items, loading, error, page, totalPages } = useSelector(state => state.cars);

  useEffect(() => {
    dispatch(resetCars());
  }, [filters, dispatch]);

  useEffect(() => {
    dispatch(fetchCars({ filters, page }))
      .unwrap()
      .catch(err => console.error('Fetch cars error:', err));
  }, [filters, page, dispatch]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(loadNextPage());
    }
  };

  return (
    <div className={style.catalog}>
      <CarFilter />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div>
        {items.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {!loading && page < totalPages && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}