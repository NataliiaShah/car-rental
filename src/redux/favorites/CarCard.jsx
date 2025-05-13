import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  const { id, make, model, year, img, rentalPrice } = car;

  // Форматуємо ціну з додаванням валютної одиниці
  const formattedPrice = rentalPrice ? `$${rentalPrice.toFixed(2)}` : 'Price not available';

  return (
    <div className="car-card">
      {/* Перевірка на наявність зображення */}
      <img src={img || '/path/to/default-image.jpg'} alt={`${make} ${model}`} width="100%" height="auto" />
      <h3>{make} {model}, {year}</h3>
      <p>Price: {formattedPrice}</p>
      <Link to={`/catalog/${id}`}>Read more</Link>
    </div>
  );
}