// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SignInForm() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [userID, setApiResponse] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const getUserRole = (userId) => {
//     if (userId.startsWith("CS")) {
//       return "customer";
//     } else if (userId.startsWith("CR")) {
//       return "cr";
//     } else if (userId.startsWith("A")) {
//       return "admin";
//     } else {
//       return "unknown";
//     }
//   };

//   const signIn = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:9000/signin/${formData.username}/${formData.password}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data.id);
//         setApiResponse(data.id);

//         // Get user role based on ID
//         const role = getUserRole(data.id);

//         // Redirect user based on their role
//         switch (role) {
//           case "customer":
//             navigate("/");
//             break;
//           case "cr":
//             navigate("/CustomerRepresentativeDashboard");
//             break;
//           case "admin":
//             navigate("/AdminDashboard");
//             break;
//           default:
//             // Handle unknown roles or errors
//             break;
//         }
//       } else if (response.status === 404) {
//         const errorData = await response.json();
//         setError(errorData.message);
//       } else {
//         setError("An error occurred during sign-in.");
//       }
//     } catch (error) {
//       console.error("Error during fetch:", error);
//       setError("An error occurred during sign-in.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signIn();
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username (Email or ID):</label>
//           <input
//             type="text"
//             id="name"
//             name="username"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;

import React, { useState } from 'react';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Sign-in successful
        setMessage(data.message);
        // Redirect to dashboard or next page based on userType
        // Example: history.push('/dashboard');
      } else {
        // Sign-in failed
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Sign-in error:', error.message);
      setMessage('Error signing in. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Sign In</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default SignInForm;
