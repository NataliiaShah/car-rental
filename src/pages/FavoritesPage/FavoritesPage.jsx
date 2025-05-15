import { useSelector } from 'react-redux';
import CarCard from '../../components/CarCard/CarCard.jsx';

const FavoritesPage = () => {
  const favoriteIds = useSelector(state => state.favorites.items);
  const allCars = useSelector(state => state.cars.items);
  const favoriteCars = allCars.filter(car => favoriteIds.includes(car.id));

  return (
    <main>
      <h2>Favorites</h2>
      {favoriteCars.length === 0 && <p>No favorite cars yet.</p>}
      {favoriteCars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </main>
  );
};

export default FavoritesPage;