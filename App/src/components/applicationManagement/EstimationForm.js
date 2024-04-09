import React from 'react';
import { useNavigate } from 'react-router-dom';

function EstimationForm(props) {
  const vehicleApplicationInfo = {
    category: props.vehicleApplicationInfo.category,
    color: props.vehicleApplicationInfo.color,
    damages: props.vehicleApplicationInfo.damages,
    make: props.vehicleApplicationInfo.make,
    model: props.vehicleApplicationInfo.model,
    mileage: props.vehicleApplicationInfo.mileage,
    year: props.vehicleApplicationInfo.year,
    offerAmount: props.vehicleApplicationInfo.offerAmount,
  };
  const navigate = useNavigate();

  var damagesEstimation = 0;
  if (vehicleApplicationInfo.damages === "minor") {
    damagesEstimation = -100;
  } else if (vehicleApplicationInfo.damages === "moderate") {
    damagesEstimation = -200;
  } else if (vehicleApplicationInfo.damages === "severe") {
    damagesEstimation = -300;
  }
  var mileageEstimation = 0;
  if (vehicleApplicationInfo.mileage < 50000) {
    mileageEstimation = 500;
  } else if (vehicleApplicationInfo.mileage < 100000) {
    mileageEstimation = 250;
  } else if (vehicleApplicationInfo.mileage < 150000) {
    mileageEstimation = 100;
  } else if (vehicleApplicationInfo.mileage < 200000) {
    mileageEstimation = 50;
  }
  var yearEstimation = 0;
  if (vehicleApplicationInfo.year > 2020) {
    yearEstimation = 1500;
  } else if (vehicleApplicationInfo.year > 2015) {
    yearEstimation = 1250;
  } else if (vehicleApplicationInfo.year > 2010) {
    yearEstimation = 1100;
  } else if (vehicleApplicationInfo.year > 2005) {
    yearEstimation = 150;
  }
  var makeEstimation = 0;
  if (vehicleApplicationInfo.make === "car") {
    makeEstimation = 500;
  } else if (vehicleApplicationInfo.make === "truck") {
    makeEstimation = 250;
  } else if (vehicleApplicationInfo.make === "suv") {
    makeEstimation = 100;
  } else if (vehicleApplicationInfo.make === "van") {
    makeEstimation = 150;
  }

  var totalEstimation = damagesEstimation + mileageEstimation + yearEstimation + makeEstimation ;

  const handleNext = () => {
    navigate(`/ContactInfoPage/${vehicleApplicationInfo.category}/${vehicleApplicationInfo.color}/${vehicleApplicationInfo.damages}/${vehicleApplicationInfo.make}/${vehicleApplicationInfo.model}/${vehicleApplicationInfo.mileage}/${vehicleApplicationInfo.year}/${vehicleApplicationInfo.offerAmount}`);
  }

  return (
    <div>
      <div>
        <p>Category: {vehicleApplicationInfo.category}</p>
        <p>Color: {vehicleApplicationInfo.color}</p>
        <p>Damages: {vehicleApplicationInfo.damages}</p>
        <p>Make: {vehicleApplicationInfo.make}</p>
        <p>Model: {vehicleApplicationInfo.model}</p>
        <p>Mileage: {vehicleApplicationInfo.mileage}</p>
        <p>Year: {vehicleApplicationInfo.year}</p>
      </div>
      <div>
        <p>Estimation for year: {yearEstimation}$</p>
        <p>Estimation for make: {makeEstimation}$</p>
        <p>Estimation for damages: {damagesEstimation}$</p>
        <p>Estimation for mileage: {mileageEstimation}$</p>
        <p>Total estimation: {totalEstimation}$</p>
      </div>
      <div>
        <p>Your offered Amount: {vehicleApplicationInfo.offerAmount}$</p><br/>
      </div>

      <div>
        Please proceed to the next page to enter your contact information
        </div>
      <button style={{ 
        backgroundColor: "#f75990",
        boxShadow: "0 4px 8px rgba(210, 195, 195, 0.3)",
        height: "45px", 
        borderStyle: "none",
        color: "#ffffff",
        fontWeight: 600, 
        fontSize: 16, 
        width: 360,
        transition: "0.3s",
        marginRight: "0.5em"}
      } onClick={handleNext}>Next</button>

    </div>
  );
}

export default EstimationForm;
