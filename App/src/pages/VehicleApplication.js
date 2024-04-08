import React from "react";
import "./../style/style.css";
import Navbar from "../components/NavBar";
import VehicleApplicationForm from "../components/VehicleApplicationForm";

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