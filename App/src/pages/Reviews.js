import React from "react";
import "./../style/style.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import ReviewForm from "../components/ReviewForm";

function SideBar() {
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
            <div className="reservation-title">Leave a Review</div>
            <div style={{height:"300px"}}>
            <ReviewForm /><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
