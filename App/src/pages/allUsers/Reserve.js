import React from "react";
import { useParams } from "react-router-dom";
import "../../../public/assets/css/style.css";
import ReservationForm from "../../components/reservationManagement/NewReservationForm";

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