import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Home";
import Footer from "./Home";

import "./../style/style.css";

function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:9000/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data.vehicle);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Error fetching vehicles");
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <Header />
      <Main vehicles={vehicles} loading={loading} error={error} />
      <Footer />
    </div>
  );
}

function Main({ vehicles, loading, error }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">hexad</div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1">Sign In/Sign Up</li>
            <li className="nav-list-components-1">About Hexad</li>
            <li className="nav-list-components-1">Reserve</li>
            <li className="nav-list-components-1">
              <Link to="/Cancel">View/Cancel/Modify</Link>
            </li>
          </ul>
          <div className="nav-divider"></div>
          <ul className="nav-list-2">
            <li className="nav-list-components-2 current-page">
              Browse Vehicles
            </li>
            <li className="nav-list-components-2">Locations</li>
            <li className="nav-list-components-2">Contact Us</li>
          </ul>
          <div className="nav-divider"></div>
        </aside>
        <div className="main-browse-content">
          <h2>Browse Vehicles</h2>
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.ID}>
                <div>ID: {vehicle.ID}</div>
                <div>Type: {vehicle.Type}</div>
                <div>Category: {vehicle.Category}</div>
                <div>Model: {vehicle.Model}</div>
                <div>Price: {vehicle.Price}</div>
                <div>Availability: {vehicle.Availability}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BrowseVehicles;
