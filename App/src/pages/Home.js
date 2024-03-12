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
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="general-structure">

          <aside className="nav sticky">
            <div className="company-name-nav all-caps">
              <Link to="/" className = "link-style">hexad</Link>
            </div>
            <ul className="nav-list-1">
              <li className="nav-list-components-1">
                <Link to="/SignIn"className = "link-style">Sign In</Link>
                
              </li>
              <li className="nav-list-components-1">
               
                <Link to="/SignUp" className = "link-style">Sign Up</Link>
              </li>
              <li className="nav-list-components-1">About Hexad</li>
              <li className="nav-list-components-1"><Link to="/Reserve" className = "link-style">Reserve</Link></li>
              <li className="nav-list-components-1">View/Modify/<Link to="/DeleteReservationPage" className = "link-style">Delete</Link></li>
              <li className="nav-list-components-1">
              <Link to="/Cancel" className="link-style">
                View/Cancel/Modify
              </Link>
            </li>
            </ul>
            <div className="nav-divider"></div>

            <ul className="nav-list-2">
              <Link to="/Browse" className="link-style">
                Browse Vehicles
              </Link>
              <li className="nav-list-components-2">Locations</li>
              <li className="nav-list-components-2">Contact Us</li>
              <li className="nav-list-components-2">
                <Link to="/BrowseAccounts" className = "link-style">View Accounts</Link>
              </li>
              <li className="nav-list-components-2">
                <Link to="/MyAccount" className = "link-style">My Account</Link>
              </li>
            </ul>
            <div className="nav-divider"></div>
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
