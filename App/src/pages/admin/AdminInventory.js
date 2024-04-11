import React from "react";
import AdminInventoryVehicles from "../../components/adminActions/AdminInventoryVehicle";

function Inventory() {
  return (
    <div className="main-content" >
      <div className="title-box">
            <div className="check-in-title">Vehicle Inventory</div>
          </div>
        <AdminInventoryVehicles />
    </div>
);
}


export default Inventory;
