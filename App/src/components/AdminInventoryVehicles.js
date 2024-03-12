import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../style/style.css";
import updateVehicle from "./UpdateVehicleForm";

function AdminInventoryVehicles() {
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
          Type: vehicle.Type,
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
      <div className="main-content">
        <h2 className="reservation-title">Vehicle Inventory</h2>
        <div>
          <label htmlFor="typeFilter">Filter by Type:</label>
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
        <div className="vehicle-grid">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : apiResponse.length === 0 ? (
            <div>No vehicles match the selected filter.</div>
          ) : (
            apiResponse
              .filter((vehicle) => filter === "All" || vehicle.Type === filter)
              .map((vehicle) => (
                <div key={vehicle.ID} className="vehicle-card">
                  <div>ID: {vehicle.ID}</div>
                  <div>Type: {vehicle.Type}</div>
                  <div>Category: {vehicle.Category}</div>
                  <div>Model: {vehicle.Model}</div>
                  <div>Price: {vehicle.Price}</div>
                  <div>Availability: {vehicle.Availability}</div>
                  <div>
                    <button
                      className="all-caps sign-in-btn btn-background-color reserve-btn"
                      onClick={() => deleteVehicle(vehicle.ID)}
                    >
                      Delete Vehicle
                    </button>
                    <button
                      className="all-caps sign-in-btn btn-background-color reserve-btn"
                      onClick={() => <Link to="/UpdateVehicle">Update Vehicle</Link>}
                    ></button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminInventoryVehicles;
