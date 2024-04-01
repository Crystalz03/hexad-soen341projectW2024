
import React from 'react';
import ModifyReservation from '../components/ModifyReservation';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import './../style/View.css';
import './../style/style.css';
import Navbar from '../components/NavBar';

function ModifyTheReservation() {
  return (
    <div>
      <Navbar />
      
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
<div className="main-content">
  <div className="view-container">
    <h2 className="view-title">Modify Reservation</h2>
      <div className="view-form"><ModifyReservation/></div>
  </div>
</div>
  );
}

export default  ModifyTheReservation;
