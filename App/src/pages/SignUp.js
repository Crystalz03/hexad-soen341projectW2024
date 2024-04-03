import React from "react";
import SignupForm from "../components/SignUpForm";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function SignUp() {
    return (
      <div>
        <Navbar/>
        <Main />
        <Footer />
      </div>
    );
  }

function Main() {
  return (
    <div class="main-content">
        <div class="check-in-title">Create an Account</div>
        <h6>
          Already have an account? <Link to="/SignIn">Sing In</Link>
        </h6>
        <SignupForm />
      </div>
  );
}

export default SignUp;