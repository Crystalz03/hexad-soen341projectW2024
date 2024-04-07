import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signIn} from "../../Store/UserSlice";


function SignInForm() {
  //states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //redux state
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
        navigate("/");
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label>Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">{loading ? "Loading..." : "SignIn"}</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default SignInForm;
