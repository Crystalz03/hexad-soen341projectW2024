import React, { useState, useEffect } from "react";

import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./pages/allUsers/Home";
import Browse from "./pages/allUsers/Browse";
import Reserve from "./pages/allUsers/Reserve";
import View from "./pages/allUsers/View";
import SignIn from "./pages/allUsers/SignIn";
import DeleteReservationPage from "./pages/allUsers/DeleteReservationPage";
import MyAccountPage from "./pages/allUsers/MyAccountPage";
import Reviews from"./pages/allUsers/Reviews";
import Modify from "./pages/allUsers/Modify";
import Branches from "./pages/allUsers/Branches";
import UpdateUserInfoPage from "./pages/allUsers/UpdateUserInfoPage";

import BrowseAccounts from "./pages/admin/BrowseAccounts";
import Vehicle from "./pages/admin/Vehicle";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCRAccount from "./pages/admin/CreateCRAccount";
import CreateAdminAccount from "./pages/admin/CreateAdminAccount";
import AdminInventory from "./pages/admin/AdminInventory";
import UpdateVehicle from "./pages/admin/UpdateVehicle";

import CRDashboard from "./pages/csr/CRDashboard";
import CheckIn from "./pages/csr/CheckIn";
import CheckOut from "./pages/csr/CheckOut";
import Payment from "./pages/csr/Payment";
import CRCreateAUserAccount from "./pages/csr/CRCreateAUserAccount";
import ConfirmBooking from "./pages/csr/ConfirmBooking";
import ConfirmPayment from "./pages/csr/ConfirmPayment";


function NotFound() {
return (
  <div className="main-content">
    <h1>404: Page Not Found</h1>
    </div>
);
}

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(error => console.error('Error fetching data:', error));
  }
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <Router>
      <div className="app">
      <NavBar/>
      
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/BrowseAccounts" exact element={<BrowseAccounts/>} />
          <Route path="/Vehicle" exact element={<Vehicle />} />
          <Route path="/Inventory" exact element={<AdminInventory />} /> 
          <Route path="/Reserve/:vehicleID" exact element={<Reserve />} /> 
          <Route path="/AdminDashboard" exact element={<AdminDashboard />} />
          <Route path="/CRDashboard" exact element={<CRDashboard />} />
          <Route path="/CreateCRAccount" exact element={<CreateCRAccount />} /> 
          <Route path="/DeleteReservationPage" exact element={<DeleteReservationPage />} /> 
          <Route path="/MyAccountPage" exact element={<MyAccountPage />} />
          <Route path="/CreateAdminAccount" exact element={<CreateAdminAccount/>} />
          <Route path="/Browse" exact element={<Browse/>} />
          <Route path="/Reviews" exact element={<Reviews/>} /> 
          <Route path="/View" exact element={<View/>} />
          <Route path="/Modify" exact element={<Modify/>} />
          <Route path="/Branches" exact element={<Branches/>} /> 
          <Route path="/CheckIn" exact element={<CheckIn/>} /> 
          <Route path="/UpdateUserInfo" exact element={<UpdateUserInfoPage />} /> 
          <Route path="/CheckOut" exact element={<CheckOut/>} />
          <Route path="/Payment" exact element={<Payment/>} />
          <Route path="/NewCustomer" exact element={<CRCreateAUserAccount/>} /> 
          <Route path="/ConfirmBooking/:vehicleID/:email/:pickUpDate/:returnDate/:pickUpLocation/:dropOffLocation/:additionalServices/:extraEquipment" exact element={<ConfirmBooking/>} /> 
          <Route path="/ConfirmPayment/:vehicleID/:email/:pickUpDate/:returnDate/:pickUpLocation/:dropOffLocation/:additionalServices/:extraEquipment/:total" exact element={<ConfirmPayment/>} />
          <Route path="/UpdateVehicle/:vehicleID" element={<UpdateVehicle/>} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
