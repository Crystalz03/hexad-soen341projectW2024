import React, { useState, useEffect } from "react";
import "./../style/style.css";
import "./../style/accountsView.css";


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
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setError("Error fetching admin accounts");
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
        <div className="account-card-scroll-container">
          <div className="account-card-container">
            {apiResponse.map((admin) => (
              <div key={admin.ID} className="account-card">
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