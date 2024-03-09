import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [userID, setApiResponse] = useState("");

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
  const response = fetch(`http://localhost:9000/signIn/${formData.username}/${formData.password}`, {
        method: 'GET',
  })
        .then(data => data.json())
        .then(data => {console.log(data.id);
        setApiResponse(data.id)})
        .catch(error => console.log(error));

    
    if (response.ok) {
      // Redirect user based on their role
      switch (data.role) { // you might want to use regex lik i did in the adminRoutes.js
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
   }


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
