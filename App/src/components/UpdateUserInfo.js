import React, { useState, useEffect } from "react";
import {
  getUser,
  getUserRole,
  getAdminInfo,
  getCRInfo,
  getCustomerInfo,
} from "./DisplayUserInfo";

export default function UpdateUserInfo() {
  const [user, setUser] = useState(getUser());
  const [userType, setUserType] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    ID: "",
    Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
    Reservation_ID: "",
    Location: "",
    Address: "",
    Contact_Number: "",
    License_Number: "",
    Credit_Card: "",
  });
  const [csrInfo, setCSRInfo] = useState({
    ID: "",
    Name: "",
    Last_Name: "",
    Branch: "",
    Email: "",
    Password: "",
  });
  const [adminInfo, setAdminInfo] = useState({
    ID: "",
    Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState("");

  //get and set user type
  useEffect(() => {
    if (user) {
      setUserType(getUserRole(user.id));
    }
  }, [user]);

  //get user info
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && userType) {
          let userInformation;
          if (userType === "admin") {
            userInformation = await getAdminInfo(user.id);
            console.log("Admin Info:", userInformation.admin); // Log admin info
            setAdminInfo(userInformation.admin); // Corrected variable name
          } else if (userType === "customer_representative") {
            userInformation = await getCRInfo(user.id);
            console.log("CSR Info:", userInformation.csr); // Log CSR info
            setCSRInfo(userInformation.csr); // Corrected variable name
          } else if (userType === "customer") {
            userInformation = await getCustomerInfo(user.id);
            console.log("Customer Info:", userInformation.customer); // Log customer info
            setCustomerInfo(userInformation.customer); // Corrected variable name
          }
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        setError("Error fetching user information");
      }
    };

    fetchUserDetails();
  }, [user, userType]);

  //handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (userType) {
      case "admin":
        console.log("Admin State Before Update:", adminInfo); // Log admin state before update
        setAdminInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "customer_representative":
        console.log("CSR State Before Update:", csrInfo); // Log CSR state before update
        setCSRInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      case "customer":
        console.log("Customer State Before Update:", customerInfo); // Log customer state before update
        setCustomerInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
      default:
        break;
    }
  };

  //handle update
  const handleUpdate = async (e) => {
    try {
      let url;
      let data;
      switch (userType) {
        case "customer":
          url = `http://localhost:9000/customers/${customerInfo.ID}`;
          data = customerInfo;
          break;
        case "customer_representative":
          url = `http://localhost:9000/csr/${csrInfo.ID}`;
          data = csrInfo;
          break;
        case "admin":
          url = `http://localhost:9000/admin/${adminInfo.ID}`;
          data = adminInfo;
          break;
        default:
          throw new Error("Invalid user type");
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data || ""),
      });

      if (response.ok) {
        alert("Account Updated Successfully");
      } else {
        setError("Error updating user information");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user");
    }
  };

  const fetchUserInfo = async () => {
    let response;
    if (userType === "customer") {
      // If email
      response = await fetch(
        `http://localhost:9000/customers/email/${customerInfo.Email}`
      );
    } else if (userType === "customer_representative") {
      // If CR ID
      response = await fetch(`http://localhost:9000/csr/${csrInfo.ID}`);
    } else if (userType === "admin") {
      // If A ID
      response = await fetch(`http://localhost:9000/admin/${adminInfo.ID}`);
    } else {
      setError("Invalid user type");
      return;
    }
    return response;
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUserInfo();
      if (response.ok) {
        const data = await response.json();

        if (data) {
          if (data.username.includes("@")) {
            try {
              const response = await fetch(
                `http://localhost:9000/customers/${customerInfo.ID}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: customerInfo.Name,
                    lastName: customerInfo.Last_Name,
                    location: customerInfo.Location,
                    email: customerInfo.Email,
                    password: customerInfo.Password,
                    Reservation_ID: customerInfo.Reservation_ID,
                    Location: customerInfo.Location,
                    Address: customerInfo.Address,
                    Contact_Number: customerInfo.Contact_Number,
                    License_Number: customerInfo.License_Number,
                    Credit_Card: customerInfo.Credit_Card,
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
          } else if (data.username.startsWith("CR")) {
            try {
              const response = await fetch(
                `http://localhost:9000/csr/${csrInfo.ID}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: csrInfo.Name,
                    lastName: csrInfo.Last_Name,
                    branch: csrInfo.Branch,
                    email: csrInfo.Email,
                    password: csrInfo.Password,
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
          }
        } else if (formData.username.startsWith("A")) {
          try {
            const response = await fetch(
              `http://localhost:9000/admin/${adminInfo.ID}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: adminInfo.Name,
                  lastName: adminInfo.Last_Name,
                  email: adminInfo.Email,
                  password: adminInfo.Password,
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
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during sign-in.");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        {userType === "admin" && (
          <div>
            <p>Admin Information:</p>
            <label>Name</label>
            <input
              type="text"
              name="Name"
              value={adminInfo.Name}
              onChange={handleChange}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="Last_Name"
              value={adminInfo.Last_Name}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              type="text"
              name="Email"
              value={adminInfo.Email}
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={adminInfo.Password}
              onChange={handleChange}
            />
          </div>
        )}

        {userType === "customer_representative" && (
          <div>
            <p>Customer Representative Information:</p>
            <label>Name</label>
            <input
              type="text"
              name="Name"
              value={csrInfo.Name}
              onChange={handleChange}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="Last_Name"
              value={csrInfo.Last_Name}
              onChange={handleChange}
            />
            <label>Branch:</label>
            <input
              type="text"
              name="Branch"
              value={csrInfo.Branch}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              type="text"
              name="Email"
              value={csrInfo.Email}
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={csrInfo.Password}
              onChange={handleChange}
            />
          </div>
        )}
        {userType === "customer" && (
          <div>
            <p>Customer Information:</p>
            <label>Name</label>
            <input
              type="text"
              name="Name"
              value={customerInfo.Name}
              onChange={handleChange}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="Last_Name"
              value={customerInfo.Last_Name}
              onChange={handleChange}
            />
            <label>Reservation ID:</label>
            <input
              type="text"
              name="reservation_ID"
              value={customerInfo.Reservation_ID}
              disabled
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={customerInfo.Location}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              type="text"
              name="Email"
              value={customerInfo.Email}
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={customerInfo.Password}
              onChange={handleChange}
            />
            <label>Address:</label>
            <input
              type="text"
              name="Address"
              value={customerInfo.Address}
              onChange={handleChange}
            />
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={customerInfo.Contact_Number}
              onChange={handleChange}
            />
            <label>License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              value={customerInfo.License_Number}
              onChange={handleChange}
            />
            <label>Credit Card:</label>
            <input
              type="text"
              name="creditCard"
              value={customerInfo.Credit_Card}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

