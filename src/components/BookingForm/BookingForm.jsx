import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const BookingForm = ({ car }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    date: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Ім’я повинно містити щонайменше 2 символи')
      .required('Ім’я є обов’язковим'),
    email: Yup.string()
      .email('Невірний формат email')
      .required('Email є обов’язковим'),
    date: Yup.date()
      .required('Дата є обов’язковою')
      .min(new Date(), 'Дата повинна бути у майбутньому'),
  });

  const handleSubmit = (values, { resetForm }) => {
    try {
      setError(null);
      const booking = {
        ...values,
        carId: car.id,
        carBrand: car.brand,
        carModel: car.model,
        bookingDate: new Date().toISOString(),
      };

      const stored = localStorage.getItem('bookings');
      const bookings = stored ? JSON.parse(stored) : [];

      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      setSuccess(true);
      resetForm();

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError('Сталася помилка при збереженні бронювання.');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 400 }}>
        <label>
          Name:
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
        </label>

        <label>
          Email:
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
        </label>

        <label>
          Date:
          <Field name="date" type="date" />
          <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
        </label>

        <button type="submit">Book Now</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Booking request sent successfully!</p>}
      </Form>
    </Formik>
  );
};

export default BookingForm;