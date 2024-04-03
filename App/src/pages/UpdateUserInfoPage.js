import React from "react";
import UpdateUserInfo from "../components/UpdateUserInfo";

function UpdateUserInfoPage() {
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
          <div
            className="extra-content"
            style={{ height: "300px", overflow: "scroll" }}
          >
            <UpdateUserInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserInfoPage;
