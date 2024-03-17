import React from "react";
import { Link } from "react-router-dom";
import "./../style/style.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import ReservationForm from "../components/ReservationForm";

function Home() {
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
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Start a Reservation</div>
            <div className="car-image">
              <img src="" alt="Car Image" className="car-image" />
            </div>
          </div>
          <div className="extra-content" style={{height:"300px"}}>
          <ReservationForm /><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


/*
function Reserve() {
  return (
    <><div className="pageTitle">Start a reservation</div>
    <div className="reservationForm"><ReservationForm /></div></>
        );
}

export default Reserve;*/