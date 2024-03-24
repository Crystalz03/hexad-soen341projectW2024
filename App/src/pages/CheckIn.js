import React from "react";
import "./../style/style.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CheckInForm from "../components/CheckInForm";
import CRSideMenu from "../components/CRSideMenu";

function checkIn() {
  return (
    <div>
      <Header />
      <CRSideMenu />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
      <div className="general-structure">
        <div className="main-content" >
            <div className="check-in-title">Customer Check-in</div>
            <CheckInForm />
        </div>
      </div>
  );
}

export default checkIn;
