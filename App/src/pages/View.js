
import React from 'react';
import ViewReservation from '../components/ViewReservation';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import './../style/View.css';
import './../style/style.css';

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
