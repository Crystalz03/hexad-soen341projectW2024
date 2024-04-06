import React from "react";

import UserRecommendations from "../components/UserRecommendations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

import "./../style/style.css";

function Recommendations() {
  return (
    <div>
      <Header/>
      <SideMenu/>
      <UserRecommendations />
      <Footer/>
    </div>
  );
}
export default Recommendations;