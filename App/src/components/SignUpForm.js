import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  // Function to generate a random alphanumeric string of specified length
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Function to generate a unique customer ID with the prefix 'CS'
  function generateCustomerId() {
    const prefix = "CS";
    const uniqueId = generateRandomString(8); // Generate a random string of 8 characters
    return prefix + uniqueId;
  }

  const [formData, setFormData] = useState({
    id: generateCustomerId(),
    name: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
    address:"",
    contactNumber:"",
    licenseNumber:"",
    creditCard:"",
  });

  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:9000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //data variable unused
      if (!response.ok) {
        throw new Error(
          "This email is already associated with an account. Please sign in."
        );
      }
      alert("Account Successfully Created!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callAPI();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} action="Sign Up">
      <div>
        {error && <p className="error">{error}</p>}{" "}
        <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
          <div style={{ flex: 1, marginRight: '10px' }}>
          <input
            type="text"
            id="name"
            name="name"
            required={true}
            placeholder="First name"
            onChange={handleChange}
          ></input>
          </div>
          <div style={{ flex: 1 }}>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required={true}
            placeholder="Last name"
            onChange={handleChange}

          ></input>
          </div>
        </div>
        <br />
        <div style={{marginBottom: '1em'}}>
        <input
          type="email"
          id="email"
          name="email"
          required={true}
          placeholder="E-mail"
          onChange={handleChange}
        ></input>
        </div>
        <div  style={{marginBottom: '1em'}}>
        <input
          type="text"
          id="location"
          name="location"
          required={true}
          placeholder="Location"
          onChange={handleChange}
        ></input>
       </div>
      <div  style={{marginBottom: '1em'}}>
        <input
          type="password"
          id="password"
          name="password"
          required={true}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        </div>
        <div  style={{marginBottom: '1em'}}>
        <input
          type="text"
          id="address"
          name="address"
          required={true}
          placeholder="Address"
          onChange={handleChange}
        ></input>
        </div>
        <div  style={{marginBottom: '1em'}}>
        <input
          type="text"
          id="licenseNumber"
          name="licenseNumber"
          required={true}
          placeholder="License Number"
          onChange={handleChange}
        ></input>
       </div>
        <button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white', width: '100%'}} type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;
