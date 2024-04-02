import React from "react";
import Footer from "../components/Footer";
import AdminInventoryVehicles from "../components/AdminInventoryVehicles";
import Navbar from "../components/NavBar";

function Inventory() {
  return (
    <div>
      <Navbar />
      <AdminInventoryVehicles />
      <Footer />
    </div>
  );
}

export default Inventory;
