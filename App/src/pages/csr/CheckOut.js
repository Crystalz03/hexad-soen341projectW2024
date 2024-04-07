import React from "react";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import Footer from "./../../components/layout/Footer";
import CheckOutForm from "./../../components/checkInOut/CheckOutForm";

export default function CheckOut() {
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
            <div className="reservation-title">Check Out</div>
          </div>
          <div className="extra-content" style={{ height: "300px" }}>
            <CheckOutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
