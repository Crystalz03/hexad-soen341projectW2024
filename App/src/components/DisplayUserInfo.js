import React, { useState, useEffect } from "react";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";

//reusable functions

export function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

export function getUserRole(id) {
  let role;
  if (id.startsWith("A")) {
    role = "admin";
  } else if (id.startsWith("CR")) {
    role = "customer_representative";
  } else if (id.startsWith("CS") || id.includes("@")) {
    role = "customer";
  } else {
    throw new Error("Invalid username");
  }
  return role;
}

export async function getAdminInfo(id) {
  try {
    const response = await fetch(`http://localhost:9000/admin/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch admin information");
    }
    const adminInfo = await response.json();
    return adminInfo;
  } catch (error) {
    console.error("Error fetching admin information:", error);
    throw error; // Re-throw the error to handle it at the caller level if necessary
  }
}

export async function getCRInfo(id) {
  try {
    const response = await fetch(`http://localhost:9000/csr/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer representative information");
    }
    const crInfo = await response.json();
    return crInfo;
  } catch (error) {
    console.error("Error fetching customer representative information:", error);
    throw error; // Re-throw the error to handle it at the caller level if necessary
  }
}
export async function getCustomerInfo(id) {
  try {
    const response = await fetch(`http://localhost:9000/customers/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer information");
    }
    const customerInfo = await response.json();
    return customerInfo;
  } catch (error) {
    console.error("Error fetching customer information:", error);
    throw error; // Re-throw the error to handle it at the caller level if necessary
  }
}

//component

export function DisplayUserInfo() {
  const [user, setUser] = useState(getUser());
  const [userType, setUserType] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      setUserType(getUserRole(user.id)); // Use user.id directly
    }
  }, [user]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && userType) {
          let userInformation;
          if (userType === "admin") {
            userInformation = await getAdminInfo(user.id);
            setUserInfo(userInformation.admin);
          } else if (userType === "customer_representative") {
            userInformation = await getCRInfo(user.id);
            setUserInfo(userInformation.csr);
          } else if (userType === "customer") {
            userInformation = await getCustomerInfo(user.id);
            setUserInfo(userInformation.customer);
          }
         
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        setError("Error fetching user information");
      }
    };

    fetchUserDetails();
  }, [user, userType]);

  return (
    <div>
      {user ? (
        <>
          <h1>
            Hello,{" "}
            {user.message === "Sign-in successful" ? user.id : userInfo.Name}

          </h1>
          {/* Display user information based on userType */}
          {userType === "admin" && (
            <div>
              <p>Admin Information:</p>
              <p>ID: {userInfo.ID}</p>
              <p>Name: {userInfo.Name}</p>
              <p>Last Name: {userInfo.Last_Name}</p>
              <p>Email: {userInfo.Email}</p>
              <p>Password: {userInfo.Password}</p>
              
              {/* Add other admin-specific fields here */}
            </div>
          )}
          {userType === "customer_representative" && (
            <div>
              <p>Customer Representative Information:</p>
              <p>ID: {userInfo.ID}</p>
              <p>Name: {userInfo.Name}</p>
              <p>Last Name: {userInfo.Last_Name}</p>
              <p>Branch: {userInfo.Branch}</p>
              <p>Email: {userInfo.Email}</p>
              <p>Password: {userInfo.Password}</p>
              {/* Add other customer representative-specific fields here */}
            </div>
          )}
          {userType === "customer" && (
            <div>
              <p>Customer Information:</p>
              <p>ID: {userInfo.ID}</p>
              <p>Name: {userInfo.Name}</p>
              <p>Last Name: {userInfo.Last_Name}</p>
              <p>Reservation ID: {userInfo.Reservation_ID}</p>
              <p>Location: {userInfo.Location}</p>
              <p>Email: {userInfo.Email}</p>
              <p>Password: {userInfo.Password}</p>
              <p>Address: {userInfo.Address}</p>
              <p>Contact Number: {userInfo.Contact_Number}</p>
              <p>License Number: {userInfo.License_Number}</p>
              <p>Credit Card: {userInfo.Credit_Card}</p>
              {/* Add other customer-specific fields here */}
            </div>
          )}
          <DeleteUser />
          <Link to="/UpdateUserInfo"><button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white'}}>Update</button></Link>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default DisplayUserInfo;
