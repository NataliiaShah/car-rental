import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx';
import BookingList from './pages/BookingList/BookingList.jsx';
import Header from './components/Header/Header.jsx';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CarDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/bookings" element={<BookingList />} />
      </Routes>
      </>
  );
}

export default App;