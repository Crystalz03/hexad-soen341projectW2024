import React from "react";
import ModifyReservation from "./../../components/reservationManagement/ModifyReservation";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import "../../../public/css/View.css";
import "../../../public/css/style.css";

function ModifyTheReservation() {
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
    <div className="main-content">
      <div className="view-container">
        <h2 className="view-title">Modify Reservation</h2>
        <div className="view-form">
          <ModifyReservation />
        </div>
      </div>
    </div>
  );
}

export default ModifyTheReservation;
