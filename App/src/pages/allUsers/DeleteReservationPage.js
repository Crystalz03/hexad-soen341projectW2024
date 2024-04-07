import React from "react";
import DeleteReservation from "./../../components/reservationManagement/DeleteReservation";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import "../../../public/css/Cancel.css";

function DeleteTheReservation() {
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
        <h2 className="view-title">Delete Reservation</h2>
        <div className="view-form">
          <DeleteReservation />
        </div>
      </div>
    </div>
  );
}

export default DeleteTheReservation;
