import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Welcome to Car Rental Service</h1>
      <p>Find your perfect car to rent today!</p>
      <Button onClick={() => navigate('/catalog')}>View Catalog</Button>
    </Container>
  );
}
