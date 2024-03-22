import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signIn} from "../Store/UserSlice";

function SignInForm() {
  //states
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');

  //redux state
  const {loading,error}= useSelector((state)=>state.user);

  const navigate=useNavigate();
  const dispatch= useDispatch();

  const handleSignIn=(e)=>{
    e.preventDefault();
    let userCredentials={
      username, password
    }
    dispatch(signIn(userCredentials)).then((result)=>{
      if(result.payload){
        setUsername('');
        setPassword('');
        navigate('/');
      }
    });

  }
  return(<div>
    <form onSubmit={handleSignIn}>
      <label>Username</label>
      <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} />
      <br/>
      <label>Password</label>
      <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <br/>
      <button type='submit'>{loading?'Loading...':'SignIn'}</button>
    {error&&(<div>{error}</div>)}
    </form>
  </div>);
}

export default SignInForm;

//const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  // const [userID, setApiResponse] = useState("");
  // const [error, setError] = useState("");
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const getUserRole = (userId) => {
  //   if (userId.startsWith("CS")) {
  //     return "customer";
  //   } else if (userId.startsWith("CR")) {
  //     return "cr";
  //   } else if (userId.startsWith("A")) {
  //     return "admin";
  //   } else {
  //     return "unknown";
  //   }
  // };

  // const signIn = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:9000/signIn/${formData.username}/${formData.password}`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.id);
  //       setApiResponse(data.id);

  //       // Get user role based on ID
  //       const role = getUserRole(data.id);

  //       // Redirect user based on their role
  //       switch (role) {
  //         case "customer":
  //           navigate("/");
  //           break;
  //         case "cr":
  //           navigate("/CRDashboard");
  //           break;
  //         case "admin":
  //           navigate("/AdminDashboard");
  //           break;
  //         default:
  //           // Handle unknown roles or errors
  //           break;
  //       }
  //     } else if (response.status === 404) {
  //       const errorData = await response.json();
  //       setError(errorData.message);
  //     } else {
  //       setError("An error occurred during sign-in.");
  //     }
  //   } catch (error) {
  //     console.error("Error during fetch:", error);
  //     setError("An error occurred during sign-in.");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await signIn();
  // };

  // return (
  //   <div>
  //     <h2>Sign In</h2>
  //     {error && <p>{error}</p>}
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Username (Email or ID):</label>
  //         <input
  //           type="text"
  //           id="name"
  //           name="username"
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         <label>Password:</label>
  //         <input
  //           type="password"
  //           id="password"
  //           name="password"
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <button type="submit">Sign In</button>
  //     </form>
  //   </div>