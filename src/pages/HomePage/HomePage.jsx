import { useEffect } from "react";
import CarList from "../../components/CarList/CarList";  
import { fetchCars } from "../../redux/cars/carsSlice"; 
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux"; 
import CarFilter from "../../components/Filters/CarFilter"; 

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading, filters } = useSelector((state) => state.cars); 

  const handleSearch = () => {
    dispatch(fetchCars({ filters }));  
  };

  useEffect(() => {
    handleSearch();  
  }, [filters]); 

  return (
    <main>
      <h1>Trending Cars Today</h1>
      {loading && <Loader />} 
      <CarFilter />
      <CarList carsList={items} />
    </main>
  );
};

export default HomePage;