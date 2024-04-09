
import React from 'react';
import ModifyReservation from "../../components/reservationManagement/ModifyReservation";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/View.css";

function ModifyTheReservation() {
  return (
<div className="main-content">
  <div className="view-container">
    <h2 className="view-title" style={{margin: '1.5em'}}>Modify Reservation</h2>
      <div className="view-form"><ModifyReservation/></div>
  </div>
</div>
  );
}

export default  ModifyTheReservation;
