import React from "react";
import "../../../public/css/style.css";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import CheckInForm from "./../../components/checkInOut/CheckInForm";
import CRSideMenu from "./../../components/layout/CRSideMenu";

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
      <div className="main-content">
        <div className="check-in-title">Customer Check-in</div>
        <CheckInForm />
      </div>
    </div>
  );
}

export default checkIn;
