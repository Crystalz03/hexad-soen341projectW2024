import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/assets/css/style.css";

function AdminInventoryApplications() {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null); // Define apiResponse state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //removed Filter line here

  const callAPIGet = () => {
    fetch("http://localhost:9000/applications", { //modified "vehicles -->applications"
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        const formattedApplications = data.application[0].map((application) => ({
          ID: application.ID,
          Category: application.Category,
          Color: application.Color,
          Damages: application.Damages,
          Make: application.Make,
          Model: application.Model,
          Mileage: application.Mileage,
          Year: application.Year,
          ProposedPrice: `$${application.ProposedPrice}/day`,
          FistName: application.FirstName,
          LastName: application.LastName,
          PhoneNumber: application.PhoneNumber,
          Email: application.Email, //attributes for applications
        }));

        setApiResponse(formattedApplications); //modified
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching applications"); //modified
        setLoading(false);
      });
  };

  useEffect(() => {
    callAPIGet();
  }, []);

  const deleteApplication = (applicationId) => {
    fetch(`http://localhost:9000/applications/${applicationId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, fetch the updated list of applications
          callAPIGet();
        } else {
          throw new Error("Failed to delete application");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Error deleting application");
      });
  }; //modified the DELETE Method

  return ( //got rid of Filter functionality
    <div>
      <br/>
      <div className="application-grid">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : apiResponse.length === 0 ? (
          <div>No applications available.</div>
        ) : (
          apiResponse.map((application) => (
            <div key={application.ID} className="application-card">
              <div>ID: {application.ID}</div>
              <div>Category: {application.Category}</div>
              <div>Color: {application.Color}</div>
              <div>Damages: {application.Damages}</div>
              <div>Make: {application.Make}</div>
              <div>Model: {application.Model}</div>
              <div>Mileage: {application.Mileage}</div>
              <div>Year: {application.Year}</div>
              <div>ProposedPrice: {application.ProposedPrice}</div>
              <div>FistName: {application.FirstName}</div>
              <div>LastName: {application.LastName}</div>
              <div>PhoneNumber: {application.PhoneNumber}</div>
              <div>Email: {application.Email}</div>
  
              <div>
                <button 
                  className="all-caps sign-in-btn btn-background-color reserve-btn"
                  onClick={() => deleteApplication(application.ID)}
                  style={{marginRight: '0.3em'}}
                >
                  Delete Application
                </button>
                <button
                  className="all-caps sign-in-btn btn-background-color reserve-btn"
                  onClick={() => navigate(`/UpdateApplication/${application.ID}`)}
                  style={{marginLeft: '0.3em'}}
                >Update Application</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  

  
}

export default AdminInventoryApplications;