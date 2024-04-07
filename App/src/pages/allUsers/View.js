import React from 'react';
import ViewReservation from './../../components/reservationManagement/ViewReservation';
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import './../../../public/css/View.css';
import './../../../public/css/style.css';

function ViewTheReservation() {
  return (
    <div>
      <Header />
      <SideMenu />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
<div className="main-content">
  <div className="view-container">
    <h2 className="view-title">View Reservation</h2>
      <div className="view-form"><ViewReservation/></div>
  </div>
</div>
  );
}

export default ViewTheReservation;
