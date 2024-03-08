import React from 'react';
import ViewForm from '../components/ViewForm';
import './../style/View.css';

function View() {
  return (
<div className="main-content">
  <div className="view-container">
    <h2 className="reservation-title">View Reservation</h2>
      <div className="view-form"><ViewForm/></div>
  </div>
</div>
  );
}

export default View;
