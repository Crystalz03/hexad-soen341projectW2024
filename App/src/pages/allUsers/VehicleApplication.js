import React from "react";
import "./../style/style.css";
import VehicleApplicationForm from "../../components/applicationManagement/VehicleApplicationForm";

function VehicleApplication() {
    return (
        <div className="main-content">
        <div className="title-box">
          <div className="check-in-title">
           Recycle Your Vehicle!
          </div>
        </div>
        <VehicleApplicationForm/>
      </div>
    ); 
}

export default VehicleApplication;