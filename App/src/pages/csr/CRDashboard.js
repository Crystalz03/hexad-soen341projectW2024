import React from "react";
import CRSideMenu from "./../../components/layout/CRSideMenu";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import "../../../public/css/style.css";

function CRDashboard() {
  return (
    <div>
      <Header />
      <CRSideMenu />
      <Main />
      <Footer />
    </div>
  );
}

export default CRDashboard;

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">
              Customer Representative DashBoard
            </div>
          </div>
          <div className="extra-content"></div>
        </div>
      </div>
    </div>
  );
}
