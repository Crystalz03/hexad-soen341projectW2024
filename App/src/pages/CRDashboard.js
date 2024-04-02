import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import "../style/style.css";

function CRDashboard() {
  return (
    <div>
     <Navbar />
     <Main />
     <Footer />
     
    </div>
    
  );
}

export default CRDashboard;

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Customer Representative DashBoard</div>
          </div>
          <div className="extra-content"></div>
        </div>
      </div>
    </div>
  );
}