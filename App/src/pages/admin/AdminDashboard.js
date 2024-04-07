import React from "react";
import AdminSideMenu from "./../../components/layout/AdminSideMenu";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import "../../../public/css/style.css";

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Admin DashBoard</div>
          </div>
          <div className="extra-content"></div>
        </div>
      </div>
    </div>
  );
}
function AdminDashboard() {
  return (
    <div>
      <Header />
      <AdminSideMenu />
      <Main />
      <Footer />
    </div>
  );
}

export default AdminDashboard;
