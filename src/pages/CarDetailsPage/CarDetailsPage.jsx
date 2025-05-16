import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from '../../components/BookingForm/BookingForm';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`https://car-rental-api.goit.global/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!car) return <p>Car not found</p>;
  
  const isFavorite = favoriteIds.includes(car.id);
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };


  const formattedMileage = new Intl.NumberFormat('uk-UA').format(car.mileage);
 

  return (
    <main>
      <h2>{car.brand} {car.model}</h2>
      <img src={car.img} alt={`${car.brand} ${car.model}`} width="400" />
      <p><strong>Price:</strong> ${car.rentalPrice}</p>
      <p><strong>Type:</strong> {car.type}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Engine:</strong> {car.engineSize} L</p>
      <p><strong>Mileage:</strong> {formattedMileage} km</p>
      <p><strong>Accessories:</strong> {car.accessories.join(', ')}</p>
      <p><strong>Address:</strong> {car.address}</p>
      <p><strong>Description:</strong> {car.description}</p>

      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>

      <h3>Book this car</h3>
      <BookingForm car={car} />
    </main>
  );
};

export default CarDetailsPage;