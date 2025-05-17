import { Link } from 'react-router-dom';
import style from "./Header.module.css";

const Header = () => (
  <header className={style.header}>
    <nav className={style.nav}>
      <img src="/images/logo.svg" alt="Logo" />
      <div className={style.navBox}>
      <Link to="/">Home</Link>
      <Link to="/catalog">Catalog</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/bookings">My Bookings </Link>
      </div>
    </nav>
  </header>
);

export default Header;