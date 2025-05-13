import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';

export default function CarCard({ car }) {
  const { id, make, model, year, img, rentalPrice } = car;

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  
  const formattedPrice = rentalPrice ? `$${Number(rentalPrice).toFixed(2)}` : 'Price not available';

  return (
    <div className="car-card">
      <img
        src={img || '/path/to/default-image.jpg'}
        alt={`${make} ${model}`}
        width="100%"
        height="auto"
      />
      <h3>{make} {model}, {year}</h3>
      <p>Price: {formattedPrice}</p>

      <button onClick={handleToggleFavorite}>
        {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
      </button>

      <Link to={`/catalog/${id}`}>Read more</Link>
    </div>
  );
}