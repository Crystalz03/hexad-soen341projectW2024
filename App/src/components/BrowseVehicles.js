import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/style.css";
import "./../style/BrowseVehicles.css";
import HorizontalCard from "./HorizontalCard";

function BrowseVehicles() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [filterClicked, setFilterClicked] = useState(false);
  const navigate = useNavigate();

  const callAPIGet = () => {
    fetch("http://localhost:9000/vehicles", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("API Response:", data);
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setFilterClicked(true);
  };

  const handleResetFilter = () => {
    setFilter("All");
    setFilterClicked(false);
  };

  const filteredVehicles =
    filter === "All"
      ? apiResponse
      : apiResponse.filter((vehicle) => vehicle.Make === filter);

  console.log("Filtered Vehicles:", filteredVehicles);

  return (
    <div>
      <br />
      <br />
      <div style={{ marginLeft: "140px" }}>
        <h2>Rental Vehicles</h2>
      </div>
      <hr className="my-4" />

      {!filterClicked && (
        <div>
          <HorizontalCard
            imageUrl={require("./../../public/assets/images/Car.png").default}
            title="Cars"
            description="Everyday versatility meets efficiency in small cars. Perfect for city commutes or highway drives, they offer comfort, modern features, and fuel efficiency for your daily travels."
            buttonText="View All Cars"
            onClick={() => handleFilterChange("Car")}
          />
          <HorizontalCard
            imageUrl={require("./../../public/assets/images/SUV.png").default}
            title="SUVs"
            description="Adventure-ready and spacious, SUVs are designed for families and explorers alike. With ample cargo space and rugged capability, they're ideal for both city cruising and off-road adventures."
            buttonText="View All SUVs"
            onClick={() => handleFilterChange("SUV")}
          />
          <HorizontalCard
            imageUrl={require("./../../public/assets/images/Truck.png").default}
            title="Trucks"
            description="Power and utility define trucks. From hauling heavy loads to conquering rough terrain, trucks offer unmatched performance and towing capacity, making them indispensable for work or play."
            buttonText="View All Trucks"
            onClick={() => handleFilterChange("Truck")}
          />
          <HorizontalCard
            imageUrl={require("./../../public/assets/images/Van.png").default}
            title="Vans"
            description="Versatile and spacious, vans are the ultimate solution for transporting passengers or cargo. Whether for business or leisure, vans provide comfort and flexibility for all your transportation needs."
            buttonText="View All Vans"
            onClick={() => handleFilterChange("Van")}
          />
        </div>
      )}

      {filterClicked && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8"></div>
            <div>
              <div className="title-box">
                <div className="reservation-title">Browse Vehicles</div>
                <div>
                  <label htmlFor="typeFilter">Filter by Make:</label>
                  <select
                    id="typeFilter"
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                  </select>
                  {filterClicked && (
                    <button
                      onClick={handleResetFilter}
                      className="btn btn-primary custom-btn-primary"
                      style={{
                        backgroundColor: "#ea4c89",
                        border: "1px solid #ea4c89",
                        color: "white",
                      }}
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              </div>

              <div className="vehicle-grid">
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error}</div>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <div key={vehicle.ID} className="vehicle-card">
                      {/* Render vehicle details */}
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
      )}
    </div>
  );
}

export default BrowseVehicles;
