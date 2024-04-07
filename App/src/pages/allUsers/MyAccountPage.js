import React from "react";
import SideMenu from "./../../components/layout/SideMenu";
import Header from "./../../components/layout/Header";
import Footer from "./../../components/layout/Footer";
import "../../../public/css/style.css";
import DisplayUserInfo from "./../../components/userManagement/DisplayUserInfo";

export default function MyAccountPage() {
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
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">My Account</div>
            <div className="car-image">
              <img src="" alt="Car Image" className="car-image" />
            </div>
          </div>
          <div
            className="extra-content"
            style={{ height: "700px", overflow: "scroll" }}
          >
            <DisplayUserInfo />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
