import React from "react";
import "./../style/style.css";
import Navbar from "../components/NavBar";
import ContactInfoForm from "../components/ContactInfoForm";

function ContactInfoPage() {
    return (
        <div className="main-content">
        <div className="title-box">
          <div className="check-in-title">
          Contact Info
          </div>
        </div>
        <ContactInfoForm/>
      </div>
    );
}

export default ContactInfoPage;