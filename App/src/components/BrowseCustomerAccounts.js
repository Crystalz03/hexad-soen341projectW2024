import React, { useState, useEffect } from "react";
import "./../style/style.css";
import "./../style/accountsView.css";

function BrowseAccountsComponent() {
    const [apiResponse, setApiResponse] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [emailFilter, setEmailFilter] = useState('');
  const filteredAccounts =  apiResponse ? apiResponse.filter(
    (customer) => customer.Email.includes(emailFilter)
  ) : [];
  
    const callAPIGetCustomers = () => {
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
          console.log(apiResponse)
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError("Error fetching accounts");
          setLoading(false);
        });
    };

  
    useEffect(() => {
      callAPIGetCustomers();
    }, []);

 

    
  
    return (
      <div>
        <div>
          <h2 className="accounts-title">Customer Accounts</h2>
          <div>
            <label className="location-title" htmlFor="emailFilter">Filter by Email:</label>
            <input
              type="text"
              id="emailFilter"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
            />
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && apiResponse.length === 0 && (
              <div>No customers found.</div>
            )}
            {!loading && !error && filteredAccounts.length === 0 && (
              <div>No customers found with the specified email.</div>
            )}
            {!loading && !error && filteredAccounts.length > 0 && (
              <div className="account-card-scroll-container">
                <div className="account-card-container">
                  {filteredAccounts.map((customer) => (
                    <div key={customer.ID} className="account-card">
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
      </div>
    );
  };
  
  
  export default BrowseAccountsComponent;

