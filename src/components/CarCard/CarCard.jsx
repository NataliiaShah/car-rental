import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { Link } from 'react-router-dom';
import style from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const isFavorite = favoriteIds.includes(car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  const formattedMileage = new Intl.NumberFormat('uk-UA').format(car.mileage);

  return (
    <div className={style.carCard}>
      <div className={style.imageWrapper}>
        <img className={style.cardImg} src={car.img} alt={car.make}  />
        
        <button
          type="button"
          className={style.favoriteBtn}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <img
            src={isFavorite ? '/images/heart.svg' : '/images/heart-filled.svg'}
            alt="Favorite"
            className={style.heartIcon}
          />
        </button>
      </div>

      <div className={style.content}>
        <div className={style.carName}>
          <div className={style.carTitle}>
            {car.brand}
            <span className={style.model}> {car.model}</span>, {car.year}
          </div>
          <span className={style.carPrice}>${car.rentalPrice}</span>
        </div>

        <div className={style.carAddBox}>
          <p className={style.addText}>
            {[...car.address.split(', ').reverse()].join(' | ')}
          </p>
          <p className={style.addText}>Suv | {formattedMileage} km</p>
        </div>
      </div>

      <Link to={`/catalog/${car.id}`}>
        <button className={style.carBtn}>Read more</button>
      </Link>
    </div>
  );
};

export default CarCard;