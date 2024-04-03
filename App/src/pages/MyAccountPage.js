import React from "react";
import "../style/style.css";
import DisplayUserInfo from "../components/DisplayUserInfo";

function MyAccountPage() {
  return (
    <div className="main">
    <div className="general-structure">
      <div className="main-content">
        <div className="title-box">
          <div className="reservation-title">My Account</div>
          <div className="car-image">
            <img src="" alt="Car Image" className="car-image" />
          </div>
        </div>
        <div className="extra-content" style={{height:"700px", overflow:"scroll"}}>
        <DisplayUserInfo /><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default MyAccountPage
