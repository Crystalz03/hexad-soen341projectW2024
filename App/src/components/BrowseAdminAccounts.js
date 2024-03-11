import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import "./../style/style.css";


function BrowseAdminAccounts() {
    const [apiResponse, setApiResponse] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    const callAPIGetAdmin = () => {
        fetch("http://localhost:9000/admin", {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
            const AdminAccount = data.admins[0].map((admin) => ({
              ID: admin.ID,
              Name: admin.Name,
              Last_Name: admin.Last_Name,
              Email: admin.Email,
              Password: admin.Password,
            }));
    
            setApiResponse(AdminAccount);
            console.log(apiResponse);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setError("Error fetching accounts");
            setLoading(false);
          });
      };
  
    useEffect(() => {
      callAPIGetAdmin();
    }, []);
   
  
    return (
        
  <div >
    <h2 className="accounts-title">Admin Accounts</h2>
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && apiResponse.length === 0 && (
        <div>No customers found.</div>
      )}
      {!loading && !error && apiResponse.length > 0 && (
        <div className="customer-card-scroll-container">
          <div className="customer-card-container">
            {apiResponse.map((admin) => (
              <div key={admin.ID} className="customer-card">
                <div>ID: {admin.ID}</div>
                <div>Name: {admin.Name}</div>
                <div>Last Name: {admin.Last_Name}</div>
                <div>Email: {admin.Email}</div>
                <div>Password: {admin.Password}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
    );
  }
  
  export default BrowseAdminAccounts;