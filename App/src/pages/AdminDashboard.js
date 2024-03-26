import React from 'react';
import AdminSideMenu from '../components/AdminSideMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "../style/style.css";

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

