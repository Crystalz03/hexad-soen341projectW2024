import React from "react";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import Footer from "./../../components/layout/Footer";
import PaymentForm from "./../../components/checkInOut/PaymentForm";

export default function Payment() {
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
          <div className="extra-content">
          <PaymentForm/>
          </div>
        </div>
      </div>
    </div>
  );
}