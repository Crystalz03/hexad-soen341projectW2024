
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminAccount from "../components/AdminAccount";

export default function CreateAdminAccount() {

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    const prefix = "A";
    const uniqueId = generateRandomString(9); // Generate a random string of 8 characters
    return prefix + uniqueId;
  }

  const [formData, setFormData] = useState({
    id: generateRepId(),
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:9000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Please try again.");
      }
      setSuccessMessage("Admin Account Successfully Added!");
      navigate("/AdminDashboard");
    } catch (error) {
      setErrorMessage(error.message);
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
      <div className="form">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            required={true}
            placeholder="First name"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required={true}
            placeholder="Last name"
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          required={true}
          placeholder="E-mail"
          onChange={handleChange}
        ></input>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          required={true}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <br />
        <button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white'}} type="submit">Sign Up</button>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    </form>
    
  );
}
