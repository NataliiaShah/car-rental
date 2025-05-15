import { useState } from 'react';

const BookingForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input name="email" value={form.email} onChange={handleChange} required type="email" />
      </label>
      <br />
      <label>
        Date:
        <input name="date" value={form.date} onChange={handleChange} required type="date" />
      </label>
      <br />
      <button type="submit">Book Now</button>

      {success && <p style={{ color: 'green' }}>Booking request sent successfully!</p>}
    </form>
  );
};

export default BookingForm;