import React from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';


import "./../style/style.css";

function Home() {
  return (
    <div>
      <Header />
      <Main />
      <SideMenu />
      <Footer />
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="general-structure">
        <aside className="nav sticky">
          <div className="company-name-nav all-caps">hexad</div>
          <ul className="nav-list-1">
            <li className="nav-list-components-1"><Link to="/SignIn">Sign In</Link>/<Link to="/SignUp">Sign Up</Link></li>
            <li className="nav-list-components-1">About Hexad</li>
            <li className="nav-list-components-1">Reserve</li>
            <li className="nav-list-components-1">View/Modify</li>
          </ul>
          <div className="nav-divider"></div>
          <ul className="nav-list-2">
            <li className="nav-list-components-2">Browse Vehicles</li>
            <li className="nav-list-components-2">Locations</li>
            <li className="nav-list-components-2">Contact Us</li>
          </ul>
          <div className="nav-divider">
            <ul className='nav-list-3'>Just testing links
              <li><Link to="/AdminDashboard">AD</Link></li>
              <li><Link to="/CustomerRepresentativeDashboard">CRD</Link></li>
            </ul>
          </div>
        </aside>
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