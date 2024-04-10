import React from "react";
import UserRecommendations from "../components/UserRecommendations";
import "./../style/style.css";

function Recommendations() {
  return (
    <div className="main-content" style={{alignItems: 'normal'}}>
        <div className="title-box" style={{alignItems: 'center', justifyContent: 'center'}}>
        </div>
        <UserRecommendations />
      </div>
  );
}
export default Recommendations;