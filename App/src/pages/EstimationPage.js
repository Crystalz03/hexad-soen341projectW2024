import React from "react";
import "./../style/style.css";
import Navbar from "../components/NavBar";
import EstimationForm from "../components/EstimationForm";

function EstimationPage() {
    return (
        <div>
        <Navbar/>
        <EstimationForm/>
        </div>
    );
}

export default EstimationPage;