import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import "./../style/style.css";
import "./../style/BrowseVehicles.css";

function BrowseVehicles() {
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

  const filteredVehicles =
    filter === "All"
      ? apiResponse
      : apiResponse.filter((vehicle) => vehicle.Type === filter);

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
              <li className="nav-list-components-2">
                <Link to="/BrowseAccounts" className="link-style">
                  View Accounts
                </Link>
              </li>
              <li className="nav-list-components-2">
                <Link to="/MyAccount" className="link-style">
                  My Account
                </Link>
              </li>
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
