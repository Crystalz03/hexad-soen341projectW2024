import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/BrowseVehicles.css";

function BrowseVehicles() {
  const [apiResponse, setApiResponse] = useState(null); // Define apiResponse state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

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

  const filteredVehicles =
    filter === "All"
      ? apiResponse
      : apiResponse.filter((vehicle) => vehicle.Make === filter);

  return (
    <div>
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Browse Vehicles</div>
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
            </div>
            <div className="vehicle-grid">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : filteredVehicles.length === 0 ? (
                <div>No vehicles match the selected filter.</div>
              ) : (
                filteredVehicles.map((vehicle) => (
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
                        onClick={() => {
                          navigate(`/Reserve/${vehicle.ID}`);
                        }}
                      >
                        Reserve Vehicle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseVehicles;
