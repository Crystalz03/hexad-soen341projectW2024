import React from 'react';
import ModifyReservation from '../components/ModifyReservation';
import './../style/View.css';

function Modify() {
  return (
    <div className="main-content">
      <div className="view-container">
        <h2 className="reservation-title">Modify Reservation</h2>
        <div className="view-form"><ModifyReservation/></div>
      </div>
    </div>
  );
}

export default Modify;
