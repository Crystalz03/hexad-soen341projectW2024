import React from 'react';
import CancelReservation from '../components/CancelReservation';
import './../style/Cancel.css';

function Cancel() {
  return (
<div className="main-content">
  <div className="cancel-container">
    <h2 className="reservation-title">Cancel Reservation</h2>
      <div className="cancel-form"><CancelReservation/></div>
  </div>
</div>
  );
}

export default Cancel;

