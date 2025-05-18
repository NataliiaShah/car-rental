import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import style from "./BookingForm.module.css"

const BookingForm = ({ car }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    date: '',
    comment: '',
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form className={style.bookingForm}>
        <div className={style.textBlock}>
          <h2 className={style.bookingTitle}>Book your car now</h2>
          <p className={style.bookingSub}>Stay connected! We are always ready to help you.</p>
        </div>
        
        <div className={style.formFields}>
          <label className={style.bookingLabel}>
            <Field
              name="name"
              type="text"
              placeholder="Name*"
              className={style.bookingInput}
            />
            <ErrorMessage name="name" component="div" className={style.bookingError} />
          </label>
          
          <label className={style.bookingLabel}>
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={style.bookingInput}
            />
            <ErrorMessage name="email" component="div" className={style.bookingError} />
          </label>

          <label className={style.bookingLabel}>
            <Field
              name="date"
              type="text"
              placeholder="Booking date"
              className={style.bookingInput}
            />
            <ErrorMessage name="date" component="div" className={style.bookingError} />
          </label>

          <label className={style.bookingArea}>
            <Field
              as="textarea"
              name="comment"
              className={style.bookingTextarea}
              placeholder="Comment"
              rows="4"
            />
          </label>
        </div>
        
        <button type="submit" className={style.bookingBtn}>Send</button>
        
        {error && <p className={style.bookingError}>{error}</p>}
        {success && <p className={style.bookSuccess}>Booking request sent successfully!</p>}
      </Form>
    </Formik>
  );
};

export default BookingForm;