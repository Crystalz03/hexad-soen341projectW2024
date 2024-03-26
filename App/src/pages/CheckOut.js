import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import CheckOutForm from "../components/CheckOutForm";

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
          <div className="extra-content" style={{height:"300px"}}>
            <CheckOutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
