import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/new.css";

function Card({imageUrl, title, description, buttonText, onClick}){
 return(
    <div className="card" style={{width: '30rem'}}>
        <img
              style={{marginTop: '2em'}}
              src={imageUrl}
              className="card-img-top"
              alt="CARIMAGE"
            />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <button onClick={onClick} className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#ea4c89', border: '1px solid #ea4c89', color: 'white' }}> 
                {buttonText}
              </button>
        </div>
        </div>

 );   
}

export default Card;