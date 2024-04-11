import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/assets/css/style.css";

function AdminInventoryVehicles() {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null); // Define apiResponse state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const callAPIGet = () => {
    fetch("http://localhost:9000/vehicles", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        const formattedVehicles = data.vehicle[0].map((vehicle) => ({
          ID: vehicle.ID,
          Make: vehicle.Make,
          Category: vehicle.Category,
          Model: vehicle.Model,
          Price: `$${vehicle.Price}/day`,
          Availability: vehicle.Availability,
        }));

        setApiResponse(formattedVehicles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching vehicles");
        setLoading(false);
      });
  };

  useEffect(() => {
    callAPIGet();
  }, []);

  const deleteVehicle = (vehicleId) => {
    fetch(`http://localhost:9000/vehicles/${vehicleId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, fetch the updated list of vehicles
          callAPIGet();
        } else {
          throw new Error("Failed to delete vehicle");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Error deleting vehicle");
      });
  };

  return (
    <div>
        <div>
          <label htmlFor="typeFilter">Filter by Make:</label>
          <select
            id="typeFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
        <br/>
        <div className="vehicle-grid">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : apiResponse.length === 0 ? (
            <div>No vehicles match the selected filter.</div>
          ) : (
            apiResponse
              .filter((vehicle) => filter === "All" || vehicle.Make === filter)
              .map((vehicle) => (
                <div key={vehicle.ID} className="vehicle-card">
                  <div>ID: {vehicle.ID}</div>
                  <div>Make: {vehicle.Make}</div>
                  <div>Category: {vehicle.Category}</div>
                  <div>Model: {vehicle.Model}</div>
                  <div>Price: {vehicle.Price}</div>
                  <div>Availability: {vehicle.Availability}</div>
                  <div>
                    <button 
                      className="all-caps sign-in-btn btn-background-color reserve-btn"
                      onClick={() => deleteVehicle(vehicle.ID)}
                      style={{marginRight: '0.3em'}}
                    >
                      Delete Vehicle
                    </button>
                    <button
                      className="all-caps sign-in-btn btn-background-color reserve-btn"
                      onClick={() => navigate(`/UpdateVehicle/${vehicle.ID}`)}
                      style={{marginLeft: '0.3em'}}
                    >Update Vehicle</button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
   
  );
}

export default AdminInventoryVehicles;