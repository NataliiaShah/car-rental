import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const isFavorite = favoriteIds.includes(car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  const formattedMileage = new Intl.NumberFormat('uk-UA').format(car.mileage);

  return (
    <div className="car-card">
      <img src={car.img} alt={car.make} width="300" />
      <h3>{car.brand} {car.model}</h3>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Location:</strong> {car.address}</p>
      <p>Price: ${car.rentalPrice}</p>
      <p>Mileage: {formattedMileage} km</p>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
      <Link to={`/catalog/${car.id}`}>
  <button>Read more</button>
</Link>
    </div>
  );
};

export default CarCard;