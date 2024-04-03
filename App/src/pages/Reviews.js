import React from "react";
import "./../style/style.css";
import Footer from "../components/Footer";
import ReviewForm from "../components/ReviewForm";
import Navbar from "../components/NavBar";

function ReviewPage() {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
      <div className="main-content">
        <div className="check-in-title">Leave a Review</div>
        <ReviewForm />
      </div>
  );
}

export default ReviewPage;
