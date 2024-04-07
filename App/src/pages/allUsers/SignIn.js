import React from "react";
import SignInForm from "./../../components/authentication/SignInForm";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";

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
      <div className="main-content">
        <div className="sign-in-form">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
