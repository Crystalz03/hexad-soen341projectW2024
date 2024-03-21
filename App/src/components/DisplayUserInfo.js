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
    address: "",
    contactNumber: "",
    licenseNumber: "",
    creditCard: "",
  });

  // const [CRInfo, setCR] = useState({
  //   ID: "",
  //   Name: "",
  //   Last_Name: "",
  //   Branch: "",
  //   Email: "",
  //   Password: "",
  // });
  // const [adminInfo, setAdmin] = useState({
  //   ID: "",
  //   Name: "",
  //   Last_Name: "",
  //   Email: "",
  //   Password: "",
  // });
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
          userData = data.customer;
        } else if (formData.username.startsWith("CR")) {
          userData = data.csr;
        } else if (formData.username.startsWith("A")) {
          userData = data.admin;
        }
        setUserInfo(userData);
        setError("");
        // Pre-fill the form with original values
        setFormData({
          ...formData,
          Name: userData.Name || "",
          Last_Name: userData.Last_Name || "",
          Location: userData.Location || "",
          Email: userData.Email || "",
          Branch: userData.Branch || "", // For CSR
          Password: userData.Password || "",
          address: userData.address || "", //only for customer
          contactNumber: userData.contactNumber || "",
          licenseNumber: userData.licenseNumber || "",
          creditCard: userData.creditCard || "",
        });
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
      response = await fetch(`http://localhost:9000/csr/${formData.username}`);
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
            const response = await fetch(
              `http://localhost:9000/customers/${userInfo.ID}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              // Successful deletion
              alert("Customer deleted successfully");
            } else {
              setError("Error deleting user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user");
          }
        } else if (formData.username.startsWith("CR")) {
          try {
            const response = await fetch(
              `http://localhost:9000/csr/${userInfo.ID}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              // Successful deletion
              alert("CSR deleted successfully");
            } else {
              setError("Error deleting user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user");
          }
        } else if (formData.username.startsWith("A")) {
          try {
            const response = await fetch(
              `http://localhost:9000/admin/${userInfo.ID}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              // Successful deletion
              alert("Admin deleted successfully");
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUserInfo();
      if (response.ok) {
        const data = await response.json();

        if (formData.username.includes("@")) {
          try {
            const response = await fetch(
              `http://localhost:9000/customers/${userInfo.ID}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: formData.Name,
                  lastName: formData.Last_Name,
                  location: formData.Location,
                  email: formData.Email,
                  password: formData.Password,
                  address: formData.address,
                  contactNumber: formData.contactNumber,
                  licenseNumber: formData.licenseNumber,
                  creditCard: formData.creditCard,
                }),
              }
            );
            if (response.ok) {
              // Successful update
              alert("Customer information updated successfully");
            } else {
              setError("Error updating user information");
            }
          } catch (error) {
            console.error("Error updating user information:", error);
            setError("Error updating user information");
          }
        } else if (formData.username.startsWith("CR")) {
          try {
            const response = await fetch(
              `http://localhost:9000/csr/${userInfo.ID}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: formData.Name,
                  lastName: formData.Last_Name,
                  branch: formData.Branch,
                  email: formData.Email,
                  password: formData.Password,
                }),
              }
            );
            if (response.ok) {
              // Successful update
              alert("CSR information updated successfully");
            } else {
              setError("Error updating user information");
            }
          } catch (error) {
            console.error("Error updating user information:", error);
            setError("Error updating user information");
          }
        } else if (formData.username.startsWith("A")) {
          try {
            const response = await fetch(
              `http://localhost:9000/admin/${userInfo.ID}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: formData.Name,
                  lastName: formData.Last_Name,
                  email: formData.Email,
                  password: formData.Password,
                }),
              }
            );
            if (response.ok) {
              // Successful update
              alert("Admin information updated successfully");
            } else {
              setError("Error updating user information");
            }
          } catch (error) {
            console.error("Error updating user information:", error);
            setError("Error updating user information");
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
            <p>Address: {userInfo.address}</p>
            <p>Contact Number: {userInfo.contactNumber}</p>
            <p>License Number: {userInfo.licenseNumber}</p>
            <p>Credit Card: {userInfo.creditCard}</p>

            {/* Render other properties as needed */}

            <button onClick={handleDeleteUser}>Delete Account</button>
          </div>
        )}
      </div>

      {/* Form for updating user information */}
      <h2>Update User Information</h2>
      <form onSubmit={handleUpdateUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name} // Pre-fill with original value
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="Last_Name"
            value={formData.Last_Name} // Pre-fill with original value
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="Location"
            value={formData.Location} // Pre-fill with original value
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email} // Pre-fill with original value
            onChange={handleChange}
          />
        </div>
        {formData.Branch && ( // Render Branch field only if it's CSR
          <div>
            <label>Branch:</label>
            <input
              type="text"
              name="Branch"
              value={formData.Branch} // Pre-fill with original value
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password} // Pre-fill with original value
            onChange={handleChange}
          />          
        </div>
        <div>
        <label>Address:</label>
        <input
              type="text"
              name="address"
              value={formData.address} // Pre-fill with original value
              onChange={handleChange}
            />
        </div>
        <div>
        <label>Contact Number:</label>
        <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber} 
              onChange={handleChange}
            />
        </div>
        <div>
        <label>License Number:</label>
        <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber} 
              onChange={handleChange}
            />
        </div>
        <div>
        <label>Credit Card:</label>
        <input
              type="text"
              name="creditCard"
              value={formData.creditCard} 
              onChange={handleChange}
            />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default DisplayUserInfo;
