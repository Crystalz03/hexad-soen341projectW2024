import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/style.css";
import "./../style/BrowseVehicles.css";
import HorizontalCard from "./HorizontalCard";

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
      <br />
      <br />
      <div style={{ marginLeft: "140px" }}>
        <h2>Rental Vehicles</h2>
      </div>
      <hr className="my-4" />

      <HorizontalCard
        imageUrl={require("./../../public/assets/images/Car.png").default}
        title="Cars"
        description="Everyday versatility meets efficiency in small cars. Perfect for city commutes or highway drives, they offer comfort, modern features, and fuel efficiency for your daily travels."
        buttonText="View All Cars"
      />

      <HorizontalCard
        imageUrl={require("./../../public/assets/images/SUV.png").default}
        title="SUVs"
        description="Adventure-ready and spacious, SUVs are designed for families and explorers alike. With ample cargo space and rugged capability, they're ideal for both city cruising and off-road adventures."
        buttonText="View All SUVs"
      />

      <HorizontalCard
        imageUrl={require("./../../public/assets/images/Truck.png").default}
        title="Trucks"
        description="Power and utility define trucks. From hauling heavy loads to conquering rough terrain, trucks offer unmatched performance and towing capacity, making them indispensable for work or play."
        buttonText="View All Trucks"
      />

      <HorizontalCard
        imageUrl={require("./../../public/assets/images/Van.png").default}
        title="Vans"
        description="Versatile and spacious, vans are the ultimate solution for transporting passengers or cargo. Whether for business or leisure, vans provide comfort and flexibility for all your transportation needs."
        buttonText="View All Vans"
      />

      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <h2 className="check-in-title">Browse Vehicles</h2>
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
