import React from "react";
import "./../style/style.css";
import ReviewForm from "../components/ReviewForm";

function ReviewPage() {
  return (
      <div className="main-content">
        <div className="check-in-title">Leave a Review</div>
        <ReviewForm />
      </div>
  );
}

export default ReviewPage;
