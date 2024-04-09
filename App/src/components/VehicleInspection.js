import React, { useState } from "react";

function VehicleInspection({ vehicle, onSubmit }) {
    const [error, setError] = useState("");
    const [damages, setDamages] = useState(vehicle.damages || "");

    const update = async () => {
        try {
            const response = await fetch(
                `http://localhost:9000/vehicles/${vehicle.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        make: vehicle.make,
                        category: vehicle.category,
                        model: vehicle.model,
                        price: vehicle.price,
                        availability: vehicle.availability,
                        year: vehicle.year,
                        plateNumber: vehicle.plateNumber,
                        color: vehicle.color,
                        damages: damages
                    },
                   )
                }
            );
            if (response.ok) {
                // Successful update
                alert("Vehicle damages updated successfully");
                onSubmit(damages);
            } else {
                setError("Error updating the vehicle damages information");
            }
        } catch (error) {
            console.error("Error updating vehicle information:", error);
            setError("Error updating vehicle damages information");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        update();
    };

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setDamages(prevDamages => (prevDamages ? prevDamages + " " + name : name));
        } else {
            setDamages(prevDamages => prevDamages.replace(name, "").trim());
        }
        console.log(damages);
    };
  
    return (
        <div>
            <h2>Vehicle Inspection</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{height: '2em'}}>
                    <label>
                        <input
                            type="checkbox"
                            name="scratch"
                            checked={damages.includes("scratch")}
                            onChange={handleChange}
                            style={{height: '1.2em', width: '1.2em'}}
                        />
                        {' '}
                        Scratch
                    </label>
                </div>
                <div style={{height: '2em'}}>
                    <label>
                        <input
                            type="checkbox"
                            name="dent"
                            checked={damages.includes("dent")}
                            onChange={handleChange}
                            style={{height: '1.2em', width: '1.2em'}}
                        />
                        {' '}
                        Dent
                    </label>
                </div>
                <button type="submit">Confirm</button>
            </form>
            </div>
    );
}

export default VehicleInspection;
