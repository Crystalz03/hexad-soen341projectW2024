import React from "react";
import AdminSideMenu from "../components/AdminSideMenu";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UpdateVehicleForm from "../components/UpdateVehicleForm";
import { useParams } from 'react-router-dom';

function UpdateVehicle() {
    const params = useParams();
    const vehicleID = params.vehicleID;

  return (
    <div>
      <Header/>
      <AdminSideMenu/>
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Update an Existing Vehicle</div>
            </div>
            <div className="extra-content" style={{ height: "450px", width:"300px" }}><UpdateVehicleForm vehicleID={vehicleID} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;

/*<Header />
      <AdminSideMenu />
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Update an Existing Vehicle</div>
            </div>
            <div className="extra-content" style={{ height: "400px" }}><UpdateVehicleForm vehicleID={vehicleID} /></div>
          </div>
        </div>
      </div>
      <Footer />*/
