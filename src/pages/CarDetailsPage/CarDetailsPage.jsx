import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CarDetailsPage() {
  const { id } = useParams();
  const cars = useSelector(state => state.cars.items);
  const car = cars.find(car => car.id === id);

  if (!car) {
    return <p>Car not found.</p>;
  }

  return (
    <div>
      <h1>{car.make} {car.model} Details</h1>
      <img src={car.img || '/path/to/default-image.jpg'} alt={`${car.make} ${car.model}`} />
      <p>Year: {car.year}</p>
      <p>Price: ${car.rentalPrice}</p>
      <p>Mileage: {car.mileage} miles</p>
      
    </div>
  );
}