import React from 'react';
import CarCard from '../CarCard/CarCard';

const CarList = ({ carsList }) => {
  return (
    <div>
      {carsList.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;