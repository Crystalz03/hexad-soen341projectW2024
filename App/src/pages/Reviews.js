import React from "react";
import "./../style/style.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import ReviewForm from "../components/ReviewForm";

function ReviewPage() {
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
      <div className="general-structure">
        <div className="main-content">
            <div className="check-in-title">Leave a Review</div>
            <ReviewForm />
            </div>
        </div>
  );
}

export default ReviewPage;
