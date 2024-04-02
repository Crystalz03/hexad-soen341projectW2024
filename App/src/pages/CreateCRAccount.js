import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import CRAccount from '../components/CRAccount';
import "../style/style.css";

function CreateCRAccount() {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default CreateCRAccount;

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">
              Create Admin Account 
            </div>
          </div>
          <div className="extra-content">
            {" "}
            <CRAccount />
          </div>
        </div>
      </div>
    </div>
  );
}