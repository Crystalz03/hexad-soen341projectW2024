import React from 'react';
import DeleteReservation from '../components/DeleteReservation';
import './../style/Cancel.css';


export default function DeleteReservationPage() {
  return (
    <div className="main-content">
      <div className="cancel-container">
        <h2 className="reservation-title">Delete Reservation</h2>
          <div className="cancel-form"><DeleteReservation/></div>
      </div>
    </div>
      );
    }

