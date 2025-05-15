import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from '../../components/BookingForm/BookingForm';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://car-rental-api.goit.global/cars/${id}`);
        setCar(res.data);

        //console.log('Car data from API:', res.data); 

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
  if (error) return <p>{error}</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <main>
      <h2>{car.brand} {car.model}</h2>
      <img src={car.img} alt={`${car.brand || car.make} ${car.model}`} width="400" />
      <p><strong>Price:</strong> {car.rentalPrice}</p>
      <p><strong>Type:</strong> {car.type}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Engine:</strong> {car.engineSize} L</p>
      <p><strong>Accessories:</strong> {car.accessories.join(', ')}</p>
      <p><strong>Address:</strong> {car.address}</p>
      <p><strong>Description:</strong> {car.description}</p>

      <h3>Book this car</h3>
      <BookingForm car={car} />
    </main>
  );
};

export default CarDetailsPage;