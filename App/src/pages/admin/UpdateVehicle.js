import React from "react";
import UpdateVehicleForm from "../../components/vehicleManagement/UpdateVehicleForm";
import { useParams } from "react-router-dom";

function UpdateVehicle() {
  const params = useParams();
  const vehicleID = params.vehicleID;

  return (
    <div>
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">
                Update an Existing Vehicle
              </div>
            </div>
            <div
              className="extra-content"
              style={{ height: "450px", width: "300px" }}
            >
              <UpdateVehicleForm vehicleID={vehicleID} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;