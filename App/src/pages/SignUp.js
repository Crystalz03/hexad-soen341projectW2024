import React from "react";
import "../style/SignUpForm.css";
import SignupForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div class="centered">
      <div className="signUp">
        <h2>Create Account</h2>
        <h6>
          Already have an account? <Link to="/SignIn">Sing In</Link>{" "}
        </h6>
        <br />
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUp;
