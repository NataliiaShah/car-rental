import { Link } from 'react-router-dom';
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main>
      <section className={style.header}>
        <span className={style.logo}>
          Rental<span className={style.logoColor}>Car</span>
        </span>
        <h1>Find your perfect rental car</h1>
        <p>Reliable and budget-friendly rentals for any journey</p>
        
        <Link to="/catalog">View Catalog</Link>
      </section>
    </main>
  );
};

export default HomePage;