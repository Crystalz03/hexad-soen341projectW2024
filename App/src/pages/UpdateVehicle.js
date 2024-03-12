
import React from 'react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import updateVehicle from '../components/UpdateVehicleForm';


function UpdateVehicle() {
    
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Update an Existing Vehicle</div>
          </div>
          <div className="extra-content" style={{height:"400px"}}><updateVehicle /></div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;