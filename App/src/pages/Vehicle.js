import React from 'react';
import VehicleForm from '../components/VehicleForm';

function Vehicle() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Create A New Vehicle</div>
          </div>
          <div className="extra-content" style={{ height: "400px" }}>
            <VehicleForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;