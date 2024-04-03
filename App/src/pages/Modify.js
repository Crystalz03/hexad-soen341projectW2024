
import React from 'react';
import ModifyReservation from '../components/ModifyReservation';
import './../style/View.css';
import './../style/style.css';


function ModifyTheReservation() {
  return (
<div className="main-content">
  <div className="view-container">
    <h2 className="view-title">Modify Reservation</h2>
      <div className="view-form"><ModifyReservation/></div>
  </div>
</div>
  );
}

export default  ModifyTheReservation;
