import React from "react";
import AdminSideMenu from "./../../components/layout/AdminSideMenu";
import Header from "./../../components/layout/Header";
import Footer from "./../../components/layout/Footer";
import VehicleForm from "./../../components/vehicleManagement/VehicleForm";

export default function Vehicle() {
  return (
    <div>
      <Header />
      <AdminSideMenu />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
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
