import React, { useState, useEffect } from "react";
import "../../../public/assets/css/style.css";

function BrowseAdminAccounts() {
    const [apiResponse, setApiResponse] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    const callAPIGetCSR = () => {
        fetch("http://localhost:9000/CSR", {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
            const CSR_Accounts = data.csr[0].map((csr) => ({
              ID: csr.ID,
              Name: csr.Name,
              Last_Name: csr.Last_Name,
              Branch: csr.Branch,
              Email: csr.Email,
              Password: csr.Password,
            }));
    
            setApiResponse(CSR_Accounts);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setError("Error fetching accounts");
            setLoading(false);
          });
      };
  
    useEffect(() => {
      callAPIGetCSR();
    }, []);
   
  
    return (
        
  <div >
    <h2 className="accounts-title">Customer Representative Accounts</h2>
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && apiResponse.length === 0 && (
        <div>No customers found.</div>
      )}
      {!loading && !error && apiResponse.length > 0 && (
        <div className="account-card-scroll-container">
          <div className="account-card-container">
            {apiResponse.map((csr) => (
              <div key={csr.ID} className="account-card">
                <div>ID: {csr.ID}</div>
                <div>Name: {csr.Name}</div>
                <div>Last Name: {csr.Last_Name}</div>
                <div>Brasnch: {csr.Branch}</div>
                <div>Email: {csr.Email}</div>
                <div>Password: {csr.Password}</div>
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