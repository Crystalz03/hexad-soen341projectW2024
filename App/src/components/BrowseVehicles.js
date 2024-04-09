import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/style.css";
import "./../style/BrowseVehicles.css";
import HorizontalCard from "./HorizontalCard";
import Card from "./Card";

function BrowseVehicles({card}) {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [filterClicked, setFilterClicked] = useState(false);
  const [useHorizontalCard] = useState(card === "Horizontal");//setUseHorizontalCard not used
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

      {!filterClicked && (useHorizontalCard ? 
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
      :  <div className="row" style={{width: '100%'}}>
        <Card
          imageUrl={require("./../../public/assets/images/Car.png").default}
          title="Cars"
          description="Everyday versatility meets efficiency in small cars. Perfect for city commutes or highway drives, they offer comfort, modern features, and fuel efficiency for your daily travels."
          buttonText="Browse Available Cars"
          onClick={() => handleFilterChange("Car")}
        />
        <Card
          style={{margin: '1em'}}
          imageUrl={require("./../../public/assets/images/SUV.png").default}
          title="SUVs"
          description="Adventure-ready and spacious, SUVs are designed for families and explorers alike. With ample cargo space and rugged capability, they're ideal for both city cruising and off-road adventures."
          buttonText="Browse Available SUVs"
          onClick={() => handleFilterChange("SUV")}
        />
        <Card
         style={{margin: '1em'}}
          imageUrl={require("./../../public/assets/images/Truck.png").default}
          title="Trucks"
          description="Power and utility define trucks. From hauling heavy loads to conquering rough terrain, trucks offer unmatched performance and towing capacity, making them indispensable for work or play."
          buttonText="Browse Available Trucks"
          onClick={() => handleFilterChange("Truck")}
        />
        <Card
         style={{margin: '1em'}}
          imageUrl={require("./../../public/assets/images/Van.png").default}
          title="Vans"
          description="Versatile and spacious, vans are the ultimate solution for transporting passengers or cargo. Whether for business or leisure, vans provide comfort and flexibility for all your transportation needs."
          buttonText="Browse Available Vans"
          onClick={() => handleFilterChange("Van")}
        />
      </div>)}

      {filterClicked && (
        <div className="container">
          <div className="row">
            <div>
              <div className="title-box" style={{marginBottom: '3em'}}>
                <h2 className="check-in-title">Browse Vehicles</h2>
                <div>
                  <label htmlFor="typeFilter">Filter by Make:</label>
                  <select
                  className="form-select"
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
                      className="all-caps sign-in-btn btn-background-color reserve-btn"
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
