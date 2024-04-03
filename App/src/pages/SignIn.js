import React from 'react';
import SignInForm from '../components/SignInForm';
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

function SignIn() {
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
        <div className="main-content" >
          <div className="check-in-title">Sign In</div>
          <SignInForm />
        </div>
    );
  }

export default SignIn;