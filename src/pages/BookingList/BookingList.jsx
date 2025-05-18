import { useEffect, useState } from 'react';
import style from './BookingList.module.css';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  if (bookings.length === 0) {
    return <p className={style.noBookings}>No bookings yet.</p>;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>My Bookings</h2>
      <ul className={style.list}>
        {bookings.map((booking, index) => (
          <li key={index} className={style.listItem}>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Booking date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
            <p><strong>Rental date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Car:</strong> {booking.carBrand} {booking.carModel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;