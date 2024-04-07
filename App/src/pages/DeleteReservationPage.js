import React from 'react';
import DeleteReservation from '../components/DeleteReservation';
import './../style/Cancel.css';
 
    function DeleteTheReservation() {
      return (
    <div className="main-content">
      <div className="view-container">
        <h2 className="view-title" style={{margin: '1.5em'}}>Delete Reservation</h2>
          <div className="view-form" ><DeleteReservation/></div>
      </div>
    </div>
      );
    }
    
    export default DeleteTheReservation;
    