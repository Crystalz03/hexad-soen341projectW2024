import React from "react";
import "./../style/style.css";
import Navbar from "../components/NavBar";
import EstimationForm from "../components/EstimationForm";
import {useParams} from "react-router-dom";

function EstimationPage() {
    const params = useParams();
    const vehicleApplicationInfo = {
        category: params.category,
        color: params.color,
        damages: params.damages,
        make: params.make,
        model: params.model,
        mileage: params.mileage,
        year: params.year,
        offerAmount: params.offerAmount,
    };
    return (
        <div className="main-content">
        <div className="title-box">
        <div className="check-in-title">
        Estimation of your Vehicle
        </div>
        </div>
        <EstimationForm vehicleApplicationInfo={vehicleApplicationInfo}/>
        </div>   
        );
}

export default EstimationPage;

