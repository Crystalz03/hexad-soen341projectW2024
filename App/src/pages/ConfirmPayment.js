import {useParams} from "react-router-dom";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import ConfirmPaymentForm from "../components/ConfirmPaymentForm";

function ConfirmPayment(){
    const params = useParams();
    const formData = {
        vehicleID: params.vehicleID,
        email: params.email,
        pickUpDate: params.pickUpDate,
        returnDate: params.returnDate,
        pickUpLocation: params.pickUpLocation,
        dropOffLocation: params.dropOffLocation,
        additionalServices: params.additionalServices,
        extraEquipment: params.extraEquipment,
        total: params.total,
    };

    return(
        <div>
        <Header/>
        <SideMenu/>
    <div className="main">
      <div className="general-structure">
        <div className="main-content">
          <div className="title-box">
            <div className="reservation-title">Start a Reservation</div>
            <div className="car-image">
              <img src="" alt="Car Image" className="car-image" />
            </div>
          </div>
          <div className="extra-content" style={{height:"300px"}}>
          <ConfirmPaymentForm formData={formData}/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
      </div>
    </div>
        <Footer/>
        </div>
    );
}

export default ConfirmPayment;