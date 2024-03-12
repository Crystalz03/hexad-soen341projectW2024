import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import "./../style/style.css";


function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([
    {
      ID: 1,
      Type: "Car",
      Category: "Compact",
      Model: "Toyota Corolla",
      Price: "$30/day",
      Availability: "Available",
    },
    {
      ID: 2,
      Type: "SUV",
      Category: "Standard",
      Model: "Ford Explorer",
      Price: "$40/day",
      Availability: "Available",
    },
    {
      ID: 3,
      Type: "Van",
      Category: "Cargo",
      Model: "Ford Transit",
      Price: "$50/day",
      Availability: "Unavailable",
    },
    {
      ID: 4,
      Type: "Truck",
      Category: "Pickup",
      Model: "Chevrolet Silverado",
      Price: "$60/day",
      Availability: "Available",
    },
    {
      ID: 5,
      Type: "Car",
      Category: "Sedan",
      Model: "Honda Accord",
      Price: "$35/day",
      Availability: "Available",
    },
    {
      ID: 6,
      Type: "SUV",
      Category: "Luxury",
      Model: "Range Rover",
      Price: "$100/day",
      Availability: "Unavailable",
    },
    {
      ID: 7,
      Type: "Van",
      Category: "Passenger",
      Model: "Dodge Grand Caravan",
      Price: "$45/day",
      Availability: "Available",
    },
    {
      ID: 8,
      Type: "Truck",
      Category: "Heavy Duty",
      Model: "Ford F-150",
      Price: "$70/day",
      Availability: "Available",
    },
    {
      ID: 9,
      Type: "Car",
      Category: "Compact",
      Model: "Honda Civic",
      Price: "$35/day",
      Availability: "Available",
    },
    {
      ID: 10,
      Type: "SUV",
      Category: "Standard",
      Model: "Toyota RAV4",
      Price: "$45/day",
      Availability: "Available",
    },
    {
      ID: 11,
      Type: "Van",
      Category: "Cargo",
      Model: "Ram ProMaster",
      Price: "$55/day",
      Availability: "Unavailable",
    },
    {
      ID: 12,
      Type: "Truck",
      Category: "Pickup",
      Model: "GMC Sierra",
      Price: "$65/day",
      Availability: "Available",
    },
    {
      ID: 13,
      Type: "Car",
      Category: "Luxury",
      Model: "Audi A6",
      Price: "$75/day",
      Availability: "Available",
    },
    {
      ID: 14,
      Type: "SUV",
      Category: "Premium",
      Model: "Volvo XC90",
      Price: "$95/day",
      Availability: "Unavailable",
    },
    {
      ID: 15,
      Type: "Van",
      Category: "Passenger",
      Model: "Toyota Sienna",
      Price: "$85/day",
      Availability: "Available",
    },
    {
      ID: 16,
      Type: "Truck",
      Category: "Cargo",
      Model: "Nissan Titan",
      Price: "$75/day",
      Availability: "Available",
    },
    {
      ID: 17,
      Type: "Car",
      Category: "Compact",
      Model: "Mazda3",
      Price: "$40/day",
      Availability: "Available",
    },
    {
      ID: 18,
      Type: "SUV",
      Category: "Standard",
      Model: "Honda CR-V",
      Price: "$50/day",
      Availability: "Available",
    },
    {
      ID: 19,
      Type: "Van",
      Category: "Cargo",
      Model: "Chevrolet Express",
      Price: "$60/day",
      Availability: "Unavailable",
    },
    {
      ID: 20,
      Type: "Truck",
      Category: "Pickup",
      Model: "Toyota Tacoma",
      Price: "$70/day",
      Availability: "Available",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Fake loading delay for testing
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredVehicles =
    filter === "All"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.Type === filter);

  return (
    <div>
      <Header />
      <div className="main">
        <div className="general-structure">
          <aside className="nav sticky">
            <Link to="/" className="link-style">
              <div className="company-name-nav all-caps">hexad</div>
            </Link>
            <ul className="nav-list-1">
              <li className="nav-list-components-1">Sign In/Sign Up</li>
              <li className="nav-list-components-1">About Hexad</li>
              <li className="nav-list-components-1">Reserve</li>
              <li className="nav-list-components-1">
                <Link to="/Cancel" className="link-style">
                  View/Cancel/Modify
                </Link>
              </li>
            </ul>
            <div className="nav-divider"></div>
            <ul className="nav-list-2">
              <li className="nav-list-components-2 current-page">
                <Link to="/" className="link-style">
                  Browse Vehicles
                </Link>
              </li>
              <li className="nav-list-components-2">Locations</li>
              <li className="nav-list-components-2">Contact Us</li>
            </ul>
            <div className="nav-divider"></div>
          </aside>
          <div className="main-content">
            <h2 className="reservation-title">Browse Vehicles</h2>
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
              ) : filteredVehicles.length === 0 ? (
                <div>No vehicles match the selected filter.</div>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <div key={vehicle.ID} className="vehicle-card">
                    <div>ID: {vehicle.ID}</div>
                    <div>Type: {vehicle.Type}</div>
                    <div>Category: {vehicle.Category}</div>
                    <div>Model: {vehicle.Model}</div>
                    <div>Price: {vehicle.Price}</div>
                    <div>Availability: {vehicle.Availability}</div>
                    <div>
                      <button className="all-caps sign-in-btn btn-background-color reserve-btn">
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
      <Footer />
    </div>
  );
}

export default BrowseVehicles;
