import React from "react";
import "../style/ReservationForm.css";
import ReservationForm from "../components/ReservationForm";

function Reserve() {
  return (
    <><div className="pageTitle">Start a reservation</div>
    <div className="reservationForm"><ReservationForm /></div></>
        );
}

export default Reserve;