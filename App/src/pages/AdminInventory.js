import React from "react";
import AdminSideMenu from "../components/AdminSideMenu";
import Footer from "../components/Footer";
import Header from "../components/Header";

import AdminInventoryVehicles from "../components/AdminInventoryVehicles";

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
