import React from "react";
import "../../../public/assets/css/style.css";
import ReviewForm from "./../../components/ReviewForm";

function ReviewPage() {
  return (
    <div>
      <Main />
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
