import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/new.css";


function HorizontalCard({ imageUrl, title, description, buttonText }) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="card mb-3"
        style={{ width: "80vw", height: "250px" }} // Enforce fixed height
      >
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body" style={{ height: "100%" }}> {/* Enforce fixed height for the card body */}
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href="#" className="btn btn-primary custom-btn-primary">
                {buttonText}
              </a>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center"> {/* Centering image vertically and horizontally */}
            <img
              src={imageUrl}
              className="img-fluid"
              alt="CARIMAGE"
              style={{ height: "100%", objectFit: "cover" }} // Ensure image covers the entire height of the card
            />{" "}
            {/* Use rounded-end to round the right side of the image */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
