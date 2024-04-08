
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function CreateAdminAccount() {
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


      if (!response.ok) {
        throw new Error("Please try again.");
      }
      alert("Admin Account Successfully Added!");
      navigate("/AdminDashboard");
    } catch (error) {
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
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}
