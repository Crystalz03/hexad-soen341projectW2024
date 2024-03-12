import React from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/style.css";
import DisplayUserInfo from "../components/DisplayUserInfo";

export default function MyAccountPage() {
  return (
    <div>
      <Header />
      <SideMenu />
      <Main />
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="reservation-title">My Account</div>
          <div className="extra-content" style={{ height: "550px" }}>
            <DisplayUserInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
