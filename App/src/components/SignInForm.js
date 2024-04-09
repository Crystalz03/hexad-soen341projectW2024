import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Store/UserSlice";
import { getUserRole } from "./DisplayUserInfo";

function SignInForm() {
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redux state
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();


const handleSignIn = (e) => {
  e.preventDefault();
  let userCredentials = {
    username,
    password,
  };

  dispatch(signIn(userCredentials)).then((result) => {
    if (result.payload) {
      setUsername("");
      setPassword("");
      // Fetch user details from localStorage after successful sign-in
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userType = getUserRole(user.id);
        if (userType === "customer") {
          navigate("/");
        } else if (userType === "customer_representative") {
          navigate("/CRDashboard");
        } else if (userType === "admin") {
          navigate("/AdminDashboard");
        }
      }
    }
  });
};

  return (
      <form onSubmit={handleSignIn} action="Sign In">
      <div>
      {error && <p className="error">{error}</p>}{" "}
        <label>Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{height: '50%'}}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{height: '50%'}}
        />
        <br/>
        <br/>
        <button className="btn btn-primary" style={{backgroundColor: '#ea4c89', border: '#ea4c89', color: 'white'}} type="submit">{loading ? "Loading..." : "Sign In"}</button>
        </div>
      </form>
  );
}

export default SignInForm;
