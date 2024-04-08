import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VehicleApplicationForm() {
    const navigate = useNavigate();

  const [vehicleInfo, setVehicleInfo] = useState({
    category: "",
    color: "",
    damages: "",
    make: "",
    model: "",
    mileage: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the EstimationForm route and pass vehicleInfo as state
    navigate('/EstimationPage', { state: { vehicleInfo } });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Vehicle Information</h1>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={vehicleInfo.category} onChange={handleChange} required />

        <label htmlFor="color">Color:</label>
        <input type="text" id="color" name="color" value={vehicleInfo.color} onChange={handleChange} required />

        <label htmlFor="damages">Damages:</label>
        <select id="damages" name="damages" value={vehicleInfo.damages} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="none">None</option>
          <option value="minor">Minor</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>

        <label htmlFor="make">Make:</label>
        <select id="make" name="make" value={vehicleInfo.make} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
        </select>

        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" value={vehicleInfo.model} onChange={handleChange} required />

        <label htmlFor="mileage">Mileage:</label>
        <input type="number" id="mileage" name="mileage" value={vehicleInfo.mileage} onChange={handleChange} required />

        <label htmlFor="year">Year:</label>
        <input type="number" id="year" name="year" value={vehicleInfo.year} onChange={handleChange} required />

        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default VehicleApplicationForm;
