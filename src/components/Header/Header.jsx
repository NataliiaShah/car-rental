import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/catalog">Catalog</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/bookings">My Bookings </Link>
    </nav>
  </header>
);

export default Header;