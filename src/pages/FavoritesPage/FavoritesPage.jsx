import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../../components/CarCard/CarCard.jsx';
import style from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favoriteIds = useSelector(state => state.favorites.items);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      try {
        setLoading(true);
        const requests = favoriteIds.map(id =>
          axios.get(`https://car-rental-api.goit.global/cars/${id}`)
        );
        const responses = await Promise.all(requests);
        const cars = responses.map(res => res.data);
        setFavoriteCars(cars);
      } catch (error) {
        console.error('Failed to fetch favorite cars', error);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchFavoriteCars();
    } else {
      setFavoriteCars([]);
      setLoading(false);
    }
  }, [favoriteIds]);

  return (
    <main className={style.catalog}>
      {loading ? (
        <p>Loading...</p>
      ) : favoriteCars.length === 0 ? (
        <p>No favorite cars yet.</p>
      ) : (
        <div className={style.cardsGrid}>
          {favoriteCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;