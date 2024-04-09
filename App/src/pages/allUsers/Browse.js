import React from "react";
import BrowseVehicles from "../../components/vehicleManagement/BrowseVehicles";
import "../../../public/assets/css/style.css";


function Browse() {
  return (
    <div>
      <div className="title-box" style={{ marginLeft: "10em" }}>
            <div className="check-in-title">Rental Vehicles</div>
          </div>
          <hr className="my-4" />
      <BrowseVehicles card={"Horizontal"} />
    </div>
  );
}
export default Browse;
