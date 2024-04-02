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
          data = {
            name: customerInfo.Name,
          lastName: customerInfo.Last_Name,
          location: customerInfo.Location,
          email: customerInfo.Email,
          password: customerInfo.Password,
          address: customerInfo.Address,
          contactNumber: customerInfo.Contact_Number,
          licenseNumber: customerInfo.License_Number,
          creditCard: customerInfo.Credit_Card};
          break;
        case "customer_representative":
          url = `http://localhost:9000/csr/${csrInfo.ID}`;
          data ={ name: csrInfo.Name,
            lastName: csrInfo.Last_Name,
            branch: csrInfo.Branch,
            email: csrInfo.Email,
            password: csrInfo.Password,};
          break;
        case "admin":
          url = `http://localhost:9000/admin/${adminInfo.ID}`;
          data = {  name: adminInfo.Name,
            lastName: adminInfo.Last_Name,
            email: adminInfo.Email,
            password: adminInfo.Password,};
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
              name="Password"
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
              name="Password"
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
              name="Reservation_ID"
              value={customerInfo.Reservation_ID}
              disabled
            />
            <label>Location:</label>
            <input
              type="text"
              name="Location"
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
              name="Password"
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
              name="Contact_Number"
              value={customerInfo.Contact_Number}
              onChange={handleChange}
            />
            <label>License Number:</label>
            <input
              type="text"
              name="License_Number"
              value={customerInfo.License_Number}
              onChange={handleChange}
            />
            <label>Credit Card:</label>
            <input
              type="text"
              name="Credit_Card"
              value={customerInfo.Credit_Card}
              onChange={handleChange}
            />
          </div>
        )}
        <button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white'}} type="submit">Update</button>
      </form>
    </div>
  );
}

