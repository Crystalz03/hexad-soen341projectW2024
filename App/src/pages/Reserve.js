import React from "react";
import { useParams } from "react-router-dom";
import "./../style/style.css";
import ReservationForm from "../components/NewReservationForm";

function Reserve() {
  const params = useParams();
  const vehicleID = params.vehicleID;

  return (
    <div>
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Start a Reservation</div>
              <div className="car-image">
                <img src="" alt="Car Image" className="car-image" />
              </div>
            </div>
            <div className="extra-content" style={{ height: "300px" }}>
              <ReservationForm vehicleID={vehicleID} />
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
