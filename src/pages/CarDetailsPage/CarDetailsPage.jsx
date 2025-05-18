import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMapPin } from "react-icons/fi";
import BookingForm from '../../components/BookingForm/BookingForm';
import style from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullId, setShowFullId] = useState(false);
  const shortId = car?.id?.slice(0, 7) ?? '';

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
  const formattedMileage = new Intl.NumberFormat('uk-UA').format(car.mileage);
 

  return (
    <main className={style.detailsContainer}>
      <div className={style.leftColumn}>
        <img className={style.carImage} src={car.img} alt={`${car.brand} ${car.model}`} />
        <BookingForm car={car}
        />
      </div>
      
      <div className={style.rightColumn}>
        <div className={style.mainInfo}>
          <div className={style.titleRow}>
            <span>{car.brand} {car.model}, {car.year}</span>
            <span
              className={style.carId}
              onClick={() =>
              setShowFullId(!showFullId)} 
              title="Click to toggle full ID"
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Id: {showFullId ? car.id : shortId + (car.id.length > 7 ? '...' : '')}
            </span>
          </div>
          
          <div className={style.infoRow}>
            <span className={style.location}>
              <FiMapPin style={{ marginRight: '6px' }} />
              {car.address.split(', ').slice(1).join(', ')}
            </span>
            <span className={style.mileage}>Mileage: {formattedMileage} km</span>
          </div>
          
          <p className={style.price}>${car.rentalPrice}</p>
          <p className={style.description}>{car.description}</p>
        </div>
        
        <h3 className={style.sectionTitle}>Rental Conditions:</h3>
        <ul className={style.rentalConditions}>
          {car.rentalConditions.map((condition, idx) => (
            <li key={idx} className={style.rentalItem}>
              <img src="/images/check-circle.svg" alt="icon" className={style.checkIcon} />
              {condition}
            </li>
          ))}
        </ul>
        
        <h3 className={style.sectionTitle}>Car Specifications:</h3>
        <ul className={style.rentalConditions}>
          <li className={style.rentalItem}>
            <img src="/images/calrndar.svg" alt="icon" className={style.checkIcon} />
            Year: {car.year}</li>
          <li className={style.rentalItem}>
            <img src="/images/car.svg" alt="icon" className={style.checkIcon} />
            Type: {car.type}
          </li>
          <li className={style.rentalItem}>
            <img src="/images/fuel.svg" alt="icon" className={style.checkIcon} />
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={style.rentalItem}>
            <img src="/images/gear.svg" alt="icon" className={style.checkIcon} />
            Engine Size: {car.engineSize}
          </li>
        </ul>
        
        <h3 className={style.sectionTitle}>Accessories and functionalities:</h3>
        <ul className={style.rentalConditions}>
          {car.accessories.map((item, idx) => (
            <li key={idx} className={style.rentalItem}>
              <img src="/images/check-circle.svg" alt="icon" className={style.checkIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
export default CarDetailsPage;