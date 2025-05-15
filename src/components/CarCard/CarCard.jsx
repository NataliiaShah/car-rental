import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { nanoid } from 'nanoid'; 

export default function CarCard({ car }) {
  const { id, make, model, year, img, rentalPrice, mileage } = car;

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const formattedPrice = rentalPrice ? `$${Number(rentalPrice).toFixed(2)}` : 'Price not available';
  const formattedMileage = mileage ? `${mileage.toLocaleString()} km` : 'Mileage not available';

  return (
    <div className="car-card" key={nanoid()}> 
      <img
        src={img || '/path/to/default-image.jpg'}
        alt={`${make} ${model}`}
        width="100%"
        height="auto"
      />
      <h3>{make} {model}, {year}</h3>
      <p>Price: {formattedPrice}</p>
      <p>Mileage: {formattedMileage}</p>

      <button onClick={handleToggleFavorite}>
        {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
      </button>

      <Link to={`/catalog/${id}`}>Read more</Link>
    </div>
  );
}