import React from "react";
import AdminSideMenu from "./../../components/layout/AdminSideMenu";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";

import AdminInventoryVehicles from "./../../components/adminActions/AdminInventoryVehicles";

function Inventory() {
  return (
    <div>
      <Header />
      <AdminSideMenu />
      <AdminInventoryVehicles />
      <Footer />
    </div>
  );
}

export default Inventory;
