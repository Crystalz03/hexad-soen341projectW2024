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
        offerAmount: "",
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
        const mileage = Number(vehicleInfo.mileage);
        const year = Number(vehicleInfo.year);
        if (
            vehicleInfo.category &&
            vehicleInfo.color &&
            vehicleInfo.damages &&
            vehicleInfo.make &&
            vehicleInfo.model &&
            vehicleInfo.mileage &&
            vehicleInfo.year &&
            mileage > 0 && 
            year > 1900 && year <= new Date().getFullYear() 
        ) {
            navigate(`/EstimationPage/${vehicleInfo.category}/${vehicleInfo.color}/${vehicleInfo.damages}/${vehicleInfo.make}/${vehicleInfo.model}/${vehicleInfo.mileage}/${vehicleInfo.year}/${vehicleInfo.offerAmount}`);
        } else {
            alert("Please fill out all required fields.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="base-form">
                <p style={{ textTransform: 'none' }}>Welcome to our vehicle recycling service. We appreciate your decision to responsibly recycle your car. Please fill out the form below with your vehicle's information. Once submitted, we will provide you with an estimation of the amount we can offer. Let's get started!</p>

                {/* Existing form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={vehicleInfo.category}
                                onChange={handleChange}
                                required
                                placeholder="Category"
                            ></input>
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={vehicleInfo.color}
                                onChange={handleChange}
                                required
                                placeholder="Color"
                            ></input>
                        </div>
                    </div>

                    <select id="damages" name="damages" value={vehicleInfo.damages} onChange={handleChange} required className="form-select" aria-label="Default select example" style={{ width: '100%', marginBottom: '20px' }}>
                        <option value="">Select damages...</option>
                        <option value="none">None</option>
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                    </select>

                    <select id="make" name="make" value={vehicleInfo.make} onChange={handleChange} required className="form-select" aria-label="Default select example" style={{ width: '100%', marginBottom: '20px' }}>
                        <option value="">Select make...</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="suv">SUV</option>
                        <option value="van">Van</option>
                    </select>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={vehicleInfo.model}
                                onChange={handleChange}
                                required
                                placeholder="Model"
                            ></input>
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                type="number"
                                id="mileage"
                                name="mileage"
                                value={vehicleInfo.mileage}
                                onChange={handleChange}
                                required
                                placeholder="Mileage"
                            ></input>
                        </div>
                    </div>

                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={vehicleInfo.year}
                        onChange={handleChange}
                        required
                        placeholder="Year"
                        style={{ width: '100%', marginBottom: '20px' }}
                    ></input>

                            <label htmlFor="offerAmount">Your Offer Amount:</label>
                            <input
                                type="number"
                                id="offerAmount"
                                name="offerAmount"
                                value={vehicleInfo.offerAmount}
                                onChange={handleChange}
                                required
                                placeholder="Enter the amount"
                            ></input>

                            <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
                        
                </div>
            </form>
        </div>
    );
}

export default VehicleApplicationForm;
