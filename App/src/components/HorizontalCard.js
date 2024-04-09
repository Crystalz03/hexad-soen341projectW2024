import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/new.css";

function HorizontalCard({ imageUrl, title, description, buttonText, onClick }) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="card mb-3"
        style={{ width: "80vw", height: "250px" }} // Enforce fixed height
      >
        <div className="row g-0" style={{ overflow: 'hidden' }}>
          <div className="col-md-8">
            <div className="card-body" style={{ height: "100%" }}> {/* Enforce fixed height for the card body */}
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <button onClick={onClick} className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#ea4c89', border: '1px solid #ea4c89', color: 'white' }}> 
                {buttonText}
              </button>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center"style={{ height: '100%' }} > 
            <img
              src={imageUrl}
              className="img-fluid"
              alt="CARIMAGE"
              style={{ height: "100%", objectFit: "cover" }}
            />{" "}
            {/* Use rounded-end to round the right side of the image */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
