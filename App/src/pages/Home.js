import React from "react";
import { Link } from "react-router-dom";
import "./../style/style.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

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
          <div className="reservation-box">
            <label className="reservation-label">
              *All fields are required
            </label>
            <div className="top-box">
              <label className="all-caps location-title" htmlFor="location">
                Location*
              </label>
              <div className="top-box-input">
                <input
                  type="text"
                  id="location"
                  placeholder="Enter a City, Postal Code, Airport"
                />
              </div>
            </div>

            <div className="bottom-box">
              <div className="bottom-input-boxes">
                <div className="pickup-box">
                  <label className="all-caps location-title" htmlFor="location">
                    Pickup*
                  </label>
                  <div className="top-box-input">
                    <input
                      type="text"
                      id="pickup"
                      placeholder="Date and Time (to implement in the future)"
                    />
                  </div>
                </div>
                <div className="return-box">
                  <label className="all-caps location-title" htmlFor="location">
                    Dropoff*
                  </label>
                  <div className="top-box-input">
                    <input
                      type="text"
                      id="pickup"
                      placeholder="Date and Time (to implement in the future)"
                    />
                  </div>
                </div>
              </div>
              <div className="reservation-btn">
                <label className="blank">blank</label>
                <div>
                  <button className="all-caps btn-background-color check-availability-button">
                    Check availability
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="extra-content">Extra content</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
