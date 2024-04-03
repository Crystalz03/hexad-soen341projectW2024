import React from "react";
import "../style/style.css";
import DisplayUserInfo from "../components/DisplayUserInfo";

function MyAccountPage() {
  return (
      <div className="main-content" style={{alignItems: 'normal'}}>
        <div className="title-box" style={{alignItems: 'center', justifyContent: 'center'}}>
          <div className="check-in-title">My Account</div>
          {/*<div className="car-image">
            <img src="" alt="Car Image" className="car-image" />
          </div> */}
        </div>
        <DisplayUserInfo />
      </div>
  );
}

export default MyAccountPage
