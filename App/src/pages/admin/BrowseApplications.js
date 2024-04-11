import React from "react";
import AdminInventoryApplications from "../../components/adminActions/AdminInventoryApplications";

function Inventory() {
  return (
    <div className="main-content" >
      <div className="title-box">
            <div className="check-in-title">Applications Inventory</div>
          </div>
        <AdminInventoryApplications />
    </div>
);
}


export default Inventory;