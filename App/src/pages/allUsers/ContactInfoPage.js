import React from "react";
import {useParams} from "react-router-dom";
import ContactInfoForm from "../../components/applicationManagement/ContactInfoForm";

function ContactInfoPage() {
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
          Contact Info
          </div>
        </div>
        <ContactInfoForm vehicleApplicationInfo={vehicleApplicationInfo}/>
      </div>
    );
}

export default ContactInfoPage;