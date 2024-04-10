import React from "react";
import UserRecommendations from "../../components/RecommendationsGenerator/UserRecommendations";
import "../../../public/assets/css/style.css";

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