import { Link } from 'react-router-dom';
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main>
      <section className={style.hero}>
          <div className={style.contentBlock}>
            <h1 className={style.title}>Find your perfect rental car</h1>
            <p className={style.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </p>
            <Link to="/catalog" className={style.cta}>
              View Catalog
            </Link>
          </div>
      </section>
    </main>
  );
};


export default HomePage;