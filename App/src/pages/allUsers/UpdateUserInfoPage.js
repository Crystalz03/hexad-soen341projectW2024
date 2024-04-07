import React from "react";
import UpdateUserInfo from "./../../components/userManagement/UpdateUserInfo";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import Footer from "./../../components/layout/Footer";

export default function UpdateUserInfoPage() {
  return (
    <div>
      <Header />
      <SideMenu />
      <Footer />
      <Main />
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
            style={{ height: "300px", overflow: "scroll" }}
          >
            <UpdateUserInfo />
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
