import React from 'react';
import DeleteReservation from '../components/DeleteReservation';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/NavBar";
import './../style/Cancel.css';
 
    
    function DeleteTheReservation() {
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
        <h2 className="view-title">Delete Reservation</h2>
          <div className="view-form"><DeleteReservation/></div>
      </div>
    </div>
      );
    }
    
    export default DeleteTheReservation;
    