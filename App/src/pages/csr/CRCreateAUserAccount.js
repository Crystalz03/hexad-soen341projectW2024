import React from "react";
import SignUpFrom from "./../../components/authentication/SignUpForm";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import CRSideMenu from "./../../components/layout/CRSideMenu";

export default function () {
  return (
    <div>
      {" "}
      <Header />
      <CRSideMenu />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Create a customer account</div>
          </div>
          <div className="extra-content">
            {" "}
            <SignUpFrom />
          </div>
        </div>
      </div>
    </div>
  );
}
