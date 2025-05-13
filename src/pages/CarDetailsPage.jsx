import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCarById } from '../services/cars';

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        const response = await getCarById(id);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    }

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Car successfully booked!');
  };

  if (!car) return <p>Loading car data...</p>;

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <img src={car.img} alt={car.model} width="300" />
      <p>{car.description}</p>
      <p>Price: {car.rentalPrice}</p>

      <h3>Book this car</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comment: </label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {submitted && <p>Thank you! We’ll contact you soon.</p>}
    </div>
  );
}