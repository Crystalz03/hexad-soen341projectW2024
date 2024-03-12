import React from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/style.css";
import DisplayUserInfo from "../components/DisplayUserInfo";

import DeleteUser from "../components/DeleteUser";


export default function MyAccount() {
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
            </div>

            <div className="extra-content" style={{height:"300px"}}><DisplayUserInfo />
            <br /><DeleteUser /></div>

            <div className="extra-content">Extra content <DisplayUserInfo /></div>

          </div>
        </div>
      </div>
    );
  }
