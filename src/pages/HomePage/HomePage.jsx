import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main>
      <section>
        <h1>Choose your best car rental deal</h1>
        <p>Book the car you want, at the price you love.</p>
        
        <Link to="/catalog">Catalog</Link>
      </section>
    </main>
  );
};

export default HomePage;