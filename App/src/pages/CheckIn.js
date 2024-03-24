import React from "react";
import "./../style/style.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CheckInForm from "../components/CheckInForm";
import CRSideMenu from "../components/CRSideMenu";

function SideBar() {
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
    <div className="main">
      <div className="general-structure">
        <div className="main-content" >
            <div className="check-in-title">Customer Check-in</div>
            <div style={{height:"300px"}}>
            <CheckInForm />
            </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
