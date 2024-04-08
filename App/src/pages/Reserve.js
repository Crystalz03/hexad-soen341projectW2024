import React from "react";
import { useParams } from "react-router-dom";
import "./../style/style.css";
import ReservationForm from "../components/NewReservationForm";

function Reserve() {
  const params = useParams();
  const vehicleID = params.vehicleID;

  return (
          <div className="main-content">
            <div className="title-box">
              <div className="check-in-title">Start a Reservation</div>
            </div>
              <ReservationForm vehicleID={vehicleID} />
          </div>
  );
}

export default Reserve;

/*
function Reserve() {
  return (
    <><div className="pageTitle">Start a reservation</div>
    <div className="reservationForm"><ReservationForm /></div></>
        );
}

export default Reserve;*/
