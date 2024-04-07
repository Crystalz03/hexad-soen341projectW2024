import React from "react";
import { useParams } from "react-router-dom";
import "../../../public/css/style.css";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import ReservationForm from "./../../components/reservationManagement/NewREservationForm";

function Reserve() {
  const params = useParams();
  const vehicleID = params.vehicleID;

  return (
    <div>
      <Header />
      <SideMenu />
      <div className="main">
        <div className="general-structure">
          <div className="main-content">
            <div className="title-box">
              <div className="reservation-title">Start a Reservation</div>
              <div className="car-image">
                <img src="" alt="Car Image" className="car-image" />
              </div>
            </div>
            <div className="extra-content" style={{ height: "300px" }}>
              <ReservationForm vehicleID={vehicleID} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reserve;
