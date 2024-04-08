import React from 'react';
import { useLocation } from 'react-router-dom';

function EstimationForm() {
  const location = useLocation();
  const vehicleInfo = location.state?.vehicleInfo || {}; 

  return (
    <div>
      <h1>Estimation Form</h1>

      <p>Category: {vehicleInfo.category}</p>
      <p>Color: {vehicleInfo.color}</p>
      <p>Damages: {vehicleInfo.damages}</p>
      <p>Make: {vehicleInfo.make}</p>
      <p>Model: {vehicleInfo.model}</p>
      <p>Mileage: {vehicleInfo.mileage}</p>
      <p>Year: {vehicleInfo.year}</p>


    </div>
  );
}

export default EstimationForm;
