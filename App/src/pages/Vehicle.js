import React from 'react';
import AdminSideMenu from '../components/AdminSideMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VehicleForm from '../components/VehicleForm';

export default function Vehicle() {
  return (
    <div>
      <Navbar />
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
