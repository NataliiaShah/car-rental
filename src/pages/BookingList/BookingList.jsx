import { useEffect, useState } from 'react';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  if (bookings.length === 0) {
    return <p>No bookings yet.</p>;
  }

  return (
    <div>
      <h2>My Bookings</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bookings.map((booking, index) => (
          <li
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
            }}
          >
            <p>
              <strong>Name:</strong> {booking.name}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Booking date:</strong> {new Date(booking.bookingDate).toLocaleString()}
            </p>
            <p>
              <strong>Rental date:</strong> {new Date(booking.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Car:</strong> {booking.carBrand} {booking.carModel}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;