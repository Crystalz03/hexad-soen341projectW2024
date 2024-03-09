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

  const signIn = async() => {
    try {
    const response = await fetch("http://localhost:9000/signIn/${FormData.username}/${FormData.password}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

    
    if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log(data.message);

      // Redirect user based on their role
      switch (data.role) {
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

    }  else if (response.notFound) {
      setError(error.message);
      console.error(error);
        throw new Error(
          "This user doesn't exhist."
        );
     } else {
      setError(error.message);
      console.error(error);

     }
    } catch (error) {
    console.error('Error during fetch:', error);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn();
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
