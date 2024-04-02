import React from "react";
import "./../style/style.css";
import Footer from "../components/Footer";
import CheckInForm from "../components/CheckInForm";
import Navbar from "../components/NavBar";

function checkIn() {
  return (
    <div>
      <Navbar />
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
