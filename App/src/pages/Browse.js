import React from "react";
import BrowseVehicles from "../components/BrowseVehicles";
import "./../style/style.css";
import "./../style/BrowseVehicles.css";

function Browse() {
  return (
    <div>
      <div className="title-box" style={{ marginLeft: "10em" }}>
            <div className="check-in-title">Rental Vehicles</div>
          </div>
      <BrowseVehicles />
    </div>
  );
}
export default Browse;
