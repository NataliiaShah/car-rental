import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;