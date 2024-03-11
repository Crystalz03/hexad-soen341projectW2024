import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import "./../style/style.css";


function BrowseAccountsComponent() {
    const [apiResponse, setApiResponse] = useState(null); // Define apiResponse state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("All");
  
    const callAPIGet = () => {
      fetch("http://localhost:9000/customers", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          const customersAccount = data.customers[0].map((customer) => ({
            ID: customer.ID,
            Name: customer.Name,
            Last_Name: customer.Last_Name,
            Reservation_ID: customer.Reservation_ID,
            Location: customer.Location,
            Email: customer.Email,
            Password: customer.Password,
          }));
  
          setApiResponse(customersAccount);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError("Error fetching accounts");
          setLoading(false);
        });
    };
  
    useEffect(() => {
      callAPIGet();
    }, []);
  
    return (
        <div>
  <Header />
  <div >
    <h2 >Customer Accounts</h2>
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && apiResponse.length === 0 && (
        <div>No customers found.</div>
      )}
      {!loading && !error && apiResponse.length > 0 && (
        <div className="customer-card-scroll-container">
          <div className="customer-card-container">
            {apiResponse.map((customer) => (
              <div key={customer.ID} className="customer-card">
                <div>ID: {customer.ID}</div>
                <div>Name: {customer.Name}</div>
                <div>Last Name: {customer.Last_Name}</div>
                <div>Reservation ID: {customer.Reservation_ID}</div>
                <div>Location: {customer.Location}</div>
                <div>Email: {customer.Email}</div>
                <div>Password: {customer.Password}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  <Footer />
</div>
    );
  }
  
  export default BrowseAccountsComponent;

