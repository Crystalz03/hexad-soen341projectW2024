import React from "react";
import ViewReservation from "../../components/reservationManagement/ViewReservation";
import "../../../public/assets/css/View.css";
import "../../../public/assets/css/style.css";

function ViewTheReservation() {
  return (
    <div className="main-content">
      <div className="view-container">
        <h2 className="view-title" style={{margin: '1.5em'}}>View Reservation</h2>
        <div className="view-form">
          <ViewReservation />
        </div>
      </div>
    </div>
  );
}

export default ViewTheReservation;
