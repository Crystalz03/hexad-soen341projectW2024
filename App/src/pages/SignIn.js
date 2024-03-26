import React from 'react';
import SignInForm from '../components/SignInForm';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function SignIn() {
  return (
    <div>
      <Header />
      <SideMenu />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
      <div className="general-structure">
        <div className="main-content" >
          <div className="sign-in-form">
            <SignInForm />
            </div>
        </div>
      </div>
  );
}

export default SignIn;