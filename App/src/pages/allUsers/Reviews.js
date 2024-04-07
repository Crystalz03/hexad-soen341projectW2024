import React from "react";
import "../../../public/css/style.css";
import Footer from "./../../components/layout/Footer";
import Header from "./../../components/layout/Header";
import SideMenu from "./../../components/layout/SideMenu";
import ReviewForm from "./../../components/ReviewForm";

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
