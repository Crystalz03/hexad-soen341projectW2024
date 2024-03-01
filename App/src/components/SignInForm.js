import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();

      // Assuming backend sends a token or some indicator of successful sign-in
      // You can handle this response according to your backend implementation

      // Redirect user based on their role
      switch (data.role) {
        case "customer":
          navigate("/home");
          break;
        case "cr":
          navigate("/crDashboard");
          break;
        case "admin":
          navigate("/adminDashboard");
          break;
        default:
          // Handle unknown roles or errors
          break;
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (Email or ID):</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
