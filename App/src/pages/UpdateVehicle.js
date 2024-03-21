import React from 'react';
import { useParams } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdateVehicleForm from '../components/UpdateVehicleForm';

function UpdateVehicle() {
  const params = useParams();
  const vehicleID = params.vehicleID;

  return (
    <div>
      <Header />
      <SideMenu />
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
      <Footer />
    </div>
  );
}

export default UpdateVehicle();


/*
import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

*/