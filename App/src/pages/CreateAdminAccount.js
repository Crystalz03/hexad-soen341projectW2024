import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import CreateAdminAccount from "../components/AdminAccount";
import "../style/style.css";

function AdminAccount() {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default AdminAccount;

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
            <CreateAdminAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
