import { useEffect, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, resetCars, loadNextPage } from '../../redux/cars/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import CarFilter from '../../components/CarFilter/CarFilter';
import style from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { items, loading, error, page, totalPages } = useSelector(state => state.cars);

  const prevStateRef = useRef({ loading: null, page: null, totalPages: null });

  useEffect(() => {
    if (
      prevStateRef.current.loading !== loading ||
      prevStateRef.current.page !== page ||
      prevStateRef.current.totalPages !== totalPages
    ) {
      console.log('loading:', loading, 'page:', page, 'totalPages:', totalPages);
      prevStateRef.current = { loading, page, totalPages };
    }
  }, [loading, page, totalPages]);


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
  <div className={style.filterBlock}>
    <CarFilter />
  </div>

  {loading && <p>Loading...</p>}
  {error && <p style={{ color: 'red' }}>Error: {error}</p>}

  <div className={style.cardsGrid}>
    {items.map(car => (
      <CarCard key={car.id} car={car} />
    ))}
  </div>

  {!loading && page < totalPages && (
    <button onClick={handleLoadMore} className={style.catalogBtn}>
      Load More
    </button>
  )}
</div>
  );
}