import React from "react";
import UpdateVehicleForm from "../../components/vehicleManagement/UpdateVehicleForm";
import { useParams } from "react-router-dom";

function UpdateVehicle() {
  const params = useParams();
  const vehicleID = params.vehicleID;

  return (
    <div>
        <div className="main-content" >
          <div className="title-box">
            <div className="check-in-title">
              Update an Existing Vehicle
            </div>
          </div >
            <UpdateVehicleForm vehicleID={vehicleID} />
        </div>
    </div>
  );
}

export default UpdateVehicle;