import React, { useState, useEffect } from "react";
import {
  getAdminInfo,
  getCRInfo,
  getCustomerInfo,
  getUser,
  getUserRole,
} from "./DisplayUserInfo";
import { useNavigate } from "react-router";

export default function UpdateUserInfo() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedUser = getUser(); // Fetch user directly
    if (fetchedUser) {
      setUser(fetchedUser); // Set user after fetching
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) { // Ensure user and user.id are available
      setUserType(getUserRole(user.id));
    }
  }, [user]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && userType) {
          let userInformation;
          if (userType === "admin") {
            userInformation = await getAdminInfo(user.id);
          } else if (userType === "customer_representative") {
            userInformation = await getCRInfo(user.id);
          } else if (userType === "customer") {
            userInformation = await getCustomerInfo(user.id);
          }
          setUserInfo(userInformation);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        setError("Error fetching user information");
      }
    };

    fetchUserDetails();
  }, [user, userType]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
        let endpoint;
        let body = {
            name: formData.Name,
            lastName: formData.Last_Name,
            email: formData.Email,
            password: formData.Password,
        };

        if (formData.username.includes("@")) {
            endpoint = `http://localhost:9000/customers/${userInfo.ID}`;
            body.location = formData.Location;
        } else if (formData.username.startsWith("CR")) {
            endpoint = `http://localhost:9000/csr/${userInfo.ID}`;
            body.branch = formData.Branch;
        } else if (formData.username.startsWith("A")) {
            endpoint = `http://localhost:9000/admin/${userInfo.ID}`;
        }

        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            // Successful update
            if (formData.username.includes("@")) {
                alert("Customer information updated successfully");
            } else if (formData.username.startsWith("CR")) {
                alert("CSR information updated successfully");
            } else if (formData.username.startsWith("A")) {
                alert("Admin information updated successfully");
            }
        } else {
            setError("Error updating user information");
        }
    } catch (error) {
        console.error("Error updating user information:", error);
        setError("Error updating user information");
    }
};



  return (
    <div>
    <form onSubmit={handleUpdateUser}>
      <h1>
        Hello, {userType === "admin" ? userInfo.Name : user.name}
      </h1>
      {userType === "admin" && (
        <div>
          <p>Admin Information:</p>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="ID"
              defaultValue={userInfo.ID}
              onChange={(e) => setFormData({ ...formData, ID: e.target.value })}
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              defaultValue={userInfo.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="Last_Name"
              defaultValue={userInfo.Last_Name}
              onChange={(e) => setFormData({ ...formData, Last_Name: e.target.value })}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              defaultValue={userInfo.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="Password"
              defaultValue={userInfo.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
            />
          </div>
        </div>
      )}
      {/* Add similar input fields for customer_representative and customer */}
      <button type="submit">Update</button>
    </form>
    {error && <p>{error}</p>}
  </div>
  
  );
}
