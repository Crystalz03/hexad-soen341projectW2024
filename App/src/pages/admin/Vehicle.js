import React from 'react';
import VehicleForm from "../../components/vehicleManagement/VehicleForm";

function Vehicle() {
  return (
        <div className="main-content">
          <div className="title-box">
            <div className="check-in-title">Create A New Vehicle</div>
          </div>
            <VehicleForm />
        </div>
  );
}

export default Vehicle;