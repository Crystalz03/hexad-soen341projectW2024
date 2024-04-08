import React from "react";
import "./../style/style.css";
import Navbar from "../components/NavBar";
import VehicleApplicationForm from "../components/VehicleApplicationForm";

function VehicleApplication() {
    return (
        <div>
        <Navbar/>
        <VehicleApplicationForm/>
        </div>
    );
}

export default VehicleApplication;