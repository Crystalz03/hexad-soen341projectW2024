import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [userID, setApiResponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUserRole = (userId) => {
    if (userId.startsWith("CS")) {
      return "customer";
    } else if (userId.startsWith("CR")) {
      return "cr";
    } else if (userId.startsWith("A")) {
      return "admin";
    } else {
      return "unknown";
    }
  };

  const signIn = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/signIn/${formData.username}/${formData.password}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.id);
        setApiResponse(data.id);

        // Get user role based on ID
        const role = getUserRole(data.id);

        // Redirect user based on their role
        switch (role) {
          case "customer":
            navigate("/");
            break;
          case "cr":
            navigate("/CustomerRepresentativeDashboard");
            break;
          case "admin":
            navigate("/AdminDashboard");
            break;
          default:
            // Handle unknown roles or errors
            break;
        }
      } else if (response.status === 404) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        setError("An error occurred during sign-in.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during sign-in.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (Email or ID):</label>
          <input
            type="text"
            id="name"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
