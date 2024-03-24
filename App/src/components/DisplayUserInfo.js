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
          <Link to="/UpdateUserInfo"><button>Update</button></Link>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default DisplayUserInfo;

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [userInfo, setUserInfo] = useState({
//     ID: "",
//     Name: "",
//     Last_Name: "",
//     Reservation_ID: "",
//     Location: "",
//     Email: "",
//     Password: "",
//   });

//   // const [CRInfo, setCR] = useState({
//   //   ID: "",
//   //   Name: "",
//   //   Last_Name: "",
//   //   Branch: "",
//   //   Email: "",
//   //   Password: "",
//   // });
//   // const [adminInfo, setAdmin] = useState({
//   //   ID: "",
//   //   Name: "",
//   //   Last_Name: "",
//   //   Email: "",
//   //   Password: "",
//   // });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetchUserInfo();
//       if (response.ok) {
//         const data = await response.json();
//         let userData;
//         if (formData.username.includes("@")) {
//           userData = data.customer;
//         } else if (formData.username.startsWith("CR")) {
//           userData = data.csr;
//         } else if (formData.username.startsWith("A")) {
//           userData = data.admin;
//         }
//         setUserInfo(userData);
//         setError("");
//         // Pre-fill the form with original values
//         setFormData({
//           ...formData,
//           Name: userData.Name || "",
//           Last_Name: userData.Last_Name || "",
//           Location: userData.Location || "",
//           Email: userData.Email || "",
//           Branch: userData.Branch || "", // For CSR
//           Password: userData.Password || "",
//         });
//       } else {
//         setError("An error occurred during sign-in.");
//         setUserInfo(null);
//       }
//     } catch (error) {
//       console.error("Error during fetch:", error);
//       setError("An error occurred during sign-in.");
//       setUserInfo(null);
//     }
//   };

//   const fetchUserInfo = async () => {
//     let response;
//     if (formData.username.includes("@")) {
//       // If email
//       response = await fetch(
//         `http://localhost:9000/customers/email/${formData.username}`
//       );
//     } else if (formData.username.startsWith("CR")) {
//       // If CR ID
//       response = await fetch(`http://localhost:9000/csr/${formData.username}`);
//     } else if (formData.username.startsWith("A")) {
//       // If A ID
//       response = await fetch(
//         `http://localhost:9000/admin/${formData.username}`
//       );
//     } else {
//       setError("Invalid username");
//       return;
//     }
//     return response;
//   };

//   

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetchUserInfo();
//         if (response.ok) {
//             const data = await response.json();

//             if (formData.username.includes("@")) {
//                 try {
//                     const response = await fetch(
//                         `http://localhost:9000/customers/${userInfo.ID}`,
//                         {
//                             method: "PUT",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                                 name: formData.Name,
//                                 lastName: formData.Last_Name,
//                                 location: formData.Location,
//                                 email: formData.Email,
//                                 password: formData.Password,
//                             }),
//                         }
//                     );
//                     if (response.ok) {
//                         // Successful update
//                         alert("Customer information updated successfully");
//                     } else {
//                         setError("Error updating user information");
//                     }
//                 } catch (error) {
//                     console.error("Error updating user information:", error);
//                     setError("Error updating user information");
//                 }
//             } else if (formData.username.startsWith("CR")) {
//                 try {
//                     const response = await fetch(
//                         `http://localhost:9000/csr/${userInfo.ID}`,
//                         {
//                             method: "PUT",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                                 name: formData.Name,
//                                 lastName: formData.Last_Name,
//                                 branch: formData.Branch,
//                                 email: formData.Email,
//                                 password: formData.Password,
//                             }),
//                         }
//                     );
//                     if (response.ok) {
//                         // Successful update
//                         alert("CSR information updated successfully");
//                     } else {
//                         setError("Error updating user information");
//                     }
//                 } catch (error) {
//                     console.error("Error updating user information:", error);
//                     setError("Error updating user information");
//                 }
//             } else if (formData.username.startsWith("A")) {
//                 try {
//                     const response = await fetch(
//                         `http://localhost:9000/admin/${userInfo.ID}`,
//                         {
//                             method: "PUT",
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                                 name: formData.Name,
//                                 lastName: formData.Last_Name,
//                                 email: formData.Email,
//                                 password: formData.Password,
//                             }),
//                         }
//                     );
//                     if (response.ok) {
//                         // Successful update
//                         alert("Admin information updated successfully");
//                     } else {
//                         setError("Error updating user information");
//                     }
//                 } catch (error) {
//                     console.error("Error updating user information:", error);
//                     setError("Error updating user information");
//                 }
//             }

//             setError("");
//         } else {
//             setError("An error occurred during sign-in.");
//             setUserInfo(null);
//         }
//     } catch (error) {
//         console.error("Error during fetch:", error);
//         setError("An error occurred during sign-in.");
//         setUserInfo(null);
//     }
// };

//   useEffect(() => {
//     console.log(userInfo);
//   }, [userInfo]); // Run this effect whenever `userInfo` changes

//   return (
//     <div>
//       <h2>Display User Info</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Display</button>
//       </form>

//       <div>
//         <h2>Customer Information</h2>
//         {userInfo && (
//           <div>
//             <p>ID: {userInfo.ID}</p>
//             <p>Name: {userInfo.Name}</p>
//             <p>Last Name: {userInfo.Last_Name}</p>
//             <p>Reservation ID: {userInfo.Reservation_ID}</p>
//             <p>Location: {userInfo.Location}</p>
//             {/* Render other properties as needed */}

//             <button onClick={handleDeleteUser}>Delete User</button>

//           </div>
//         )}
//       </div>

//       {/* Form for updating user information */}
//       <h2>Update User Information</h2>
// <form onSubmit={handleUpdateUser}>
//   <div>
//     <label>Name:</label>
//     <input
//       type="text"
//       name="Name"
//       value={formData.Name} // Pre-fill with original value
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label>Last Name:</label>
//     <input
//       type="text"
//       name="Last_Name"
//       value={formData.Last_Name} // Pre-fill with original value
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label>Location:</label>
//     <input
//       type="text"
//       name="Location"
//       value={formData.Location} // Pre-fill with original value
//       onChange={handleChange}
//     />
//   </div>
//   <div>
//     <label>Email:</label>
//     <input
//       type="email"
//       name="Email"
//       value={formData.Email} // Pre-fill with original value
//       onChange={handleChange}
//     />
//   </div>
//   {formData.Branch && ( // Render Branch field only if it's CSR
//     <div>
//       <label>Branch:</label>
//       <input
//         type="text"
//         name="Branch"
//         value={formData.Branch} // Pre-fill with original value
//         onChange={handleChange}
//       />
//     </div>
//   )}
//   <div>
//     <label>Password:</label>
//     <input
//       type="password"
//       name="Password"
//       value={formData.Password} // Pre-fill with original value
//       onChange={handleChange}
//     />
//   </div>
//   <button type="submit">Update</button>
// </form>
//     </div>
//   );
// }
