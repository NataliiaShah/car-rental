import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCars } from '../../redux/cars/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import CarFilter from '../../components/Filters/CarFilter';

export default function CatalogPage() {
  const { items, loading, error, filters } = useSelector(state => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch, items.length]);

  const filteredItems = items.filter(car => {
    const priceValue = Number(car.rentalPrice.replace('$', ''));
    const mileage = Number(car.mileage);

    const matchesBrand = !filters.make || car.make.toLowerCase().includes(filters.make.toLowerCase());
    const matchesPrice = !filters.price || priceValue <= Number(filters.price);
    const matchesMileageFrom = !filters.mileageFrom || mileage >= Number(filters.mileageFrom);
    const matchesMileageTo = !filters.mileageTo || mileage <= Number(filters.mileageTo);

    return matchesBrand && matchesPrice && matchesMileageFrom && matchesMileageTo;
  });

  return (
    <div>
      <h2>Catalog</h2>
      <CarFilter />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {filteredItems.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}