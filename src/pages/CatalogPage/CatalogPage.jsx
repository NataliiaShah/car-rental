import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, resetCars, loadNextPage } from '../../redux/cars/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import CarFilter from '../../components/Filters/CarFilter';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { items, loading, error, page, totalPages } = useSelector(state => state.cars);

  useEffect(() => {
  dispatch(resetCars());
}, [filters, dispatch]);

useEffect(() => {
  console.log('Fetching cars with filters:', filters, 'and page:', page);
  dispatch(fetchCars({ filters, page }))
    .unwrap()
    .then(data => {
      console.log('Fetch cars success:', data);
    })
    .catch(err => {
      console.error('Fetch cars error:', err);
    });
}, [filters, page, dispatch]);
  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(loadNextPage());
    }
  };

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

      {!loading && page < totalPages && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}