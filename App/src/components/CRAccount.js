import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

 function CRAccount() {
  function generateRandomString(length) {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  function generateRepId() {
    const prefix = "CR";
    const uniqueId = generateRandomString(8); // Generate a random string of 8 characters
    return prefix + uniqueId;
  }
  const [error, setError] = useState("");//added error handling
  const [formData, setFormData] = useState({
    id: generateRepId(),
    name: "",
    lastName: "",
    branch: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:9000/csr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

 

      if (!response.ok) {
        throw new Error("Please try again.");
      }
      alert("CR Account Successfully Created!");
      navigate("/CRDashboard");
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
    <form onSubmit={handleSubmit} action="New CR account" className="base-form">
      <div  style={{ display: 'flex', marginTop: '30px', marginBottom: '0px'}}>
      {error && <p className="error">{error}</p>}{" "}
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
        <select id="branch" className="form-select" aria-label="Default select example" style={{width: '40%', marginBottom: '2em'}}>
          <option value="option 1">Laval</option>
          <option value="option 2">Montréal</option>
          <option value="option 3">Airport</option>
        </select>
       <div>
        <input
          type="email"
          id="email"
          name="email"
          required={true}
          placeholder="E-mail"
          onChange={handleChange}
        ></input>
        </div>
        <div>
        <input
          type="password"
          id="password"
          name="password"
          required={true}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        </div>
        <button type="submit" style={{width: '100%'}}>Sign Up</button>
    </form>
  );
}

export default CRAccount;