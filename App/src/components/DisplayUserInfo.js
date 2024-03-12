import React, { useState, useEffect } from "react";

function DisplayUserInfo() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [userInfo, setUserInfo] = useState({
    ID: "",
    Name: "",
    Last_Name: "",
    Reservation_ID: "",
    Location: "",
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUserInfo();
      if (response.ok) {
        const data = await response.json();
        let userData;
        if (formData.username.includes("@")) {
          // If email
          userData = data.customer;
        } else if (formData.username.startsWith("CR")) {
          // If CR ID
          userData = data.csr;
        } else if (formData.username.startsWith("A")) {
          // If A ID
          userData = data.admin;
        }
        setUserInfo(userData);
        setError("");
      } else {
        setError("An error occurred during sign-in.");
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during sign-in.");
      setUserInfo(null);
    }
  };

  const fetchUserInfo = async () => {
    let response;
    if (formData.username.includes("@")) {
      // If email
      response = await fetch(
        `http://localhost:9000/customers/email/${formData.username}`
      );
    } else if (formData.username.startsWith("CR")) {
      // If CR ID
      response = await fetch(
        `http://localhost:9000/csr/${formData.username}`
      );
    } else if (formData.username.startsWith("A")) {
      // If A ID
      response = await fetch(
        `http://localhost:9000/admin/${formData.username}`
      );
    } else {
      setError("Invalid username");
      return;
    }
    return response;
  };


  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUserInfo();
      if (response.ok) {
        const data = await response.json();
        
        if (formData.username.includes("@")) {
          try {
            const response = await fetch(`http://localhost:9000/customers/${userInfo.ID}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              // Successful deletion
              console.log("Customer deleted successfully");
            } else {
              setError("Error deleting user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user");
          }
          
        } else if (formData.username.startsWith("CR")) {
          try {
            const response = await fetch(`http://localhost:9000/csr/${userInfo.ID}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              // Successful deletion
              console.log("CSR deleted successfully");
            } else {
              setError("Error deleting user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user");
          }
        } else if (formData.username.startsWith("A")) {
          try {
            const response = await fetch(`http://localhost:9000/admin/${userInfo.ID}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              // Successful deletion
              console.log("Admin deleted successfully");
            } else {
              setError("Error deleting user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user");
          }
        }
        
        setError("");
      } else {
        setError("An error occurred during sign-in.");
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during sign-in.");
      setUserInfo(null);
    }
  };


  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]); // Run this effect whenever `userInfo` changes

  return (
    <div>
      <h2>Display User Info</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Display</button>
      </form>

      <div>
        <h2>Customer Information</h2>
        {userInfo && (
          <div>
            <p>ID: {userInfo.ID}</p>
            <p>Name: {userInfo.Name}</p>
            <p>Last Name: {userInfo.Last_Name}</p>
            <p>Reservation ID: {userInfo.Reservation_ID}</p>
            <p>Location: {userInfo.Location}</p>
            {/* Render other properties as needed */}

            <button onClick={handleDeleteUser}>Delete User</button>

          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayUserInfo;
