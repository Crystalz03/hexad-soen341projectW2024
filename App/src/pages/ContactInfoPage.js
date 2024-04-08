import React from "react";
import "./../style/style.css";
import Navbar from "../components/NavBar";
import ContactInfoForm from "../components/ContactInfoForm";

function ContactInfoPage() {
    return (
        <div>
        <Navbar/>
        <ContactInfoForm/>
        </div>
    );
}

export default ContactInfoPage;