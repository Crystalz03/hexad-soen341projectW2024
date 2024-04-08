import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import BrowseAccounts from "./pages/BrowseAccounts";
import Vehicle from "./pages/Vehicle";
import Browse from "./pages/Browse";
import Reserve from "./pages/Reserve";
import View from "./pages/View";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCRAccount from "./pages/CreateCRAccount";
import CRDashboard from "./pages/CRDashboard";
import DeleteReservationPage from "./pages/DeleteReservationPage";
import MyAccountPage from "./pages/MyAccountPage";
import CreateAdminAccount from "./pages/CreateAdminAccount";
import Reviews from"./pages/Reviews";
import SignIn from "./pages/SignIn";
import AdminInventory from "./pages/AdminInventory";
import Modify from "./pages/Modify";
import Branches from "./pages/Branches";
import UpdateUserInfoPage from "./pages/UpdateUserInfoPage";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";
import CRCreateAUserAccount from "./pages/CRCreateAUserAccount";
import ConfirmBooking from "./pages/ConfirmBooking";
import ConfirmPayment from "./pages/ConfirmPayment";
import UpdateVehicle from "./pages/UpdateVehicle";
import VehicleApplication from "./pages/VehicleApplication";
import EstimationPage from "./pages/EstimationPage";

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
          <Route path="/" exact element={<Home />} /> {/* missing the implementation */}
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/BrowseAccounts" exact element={<BrowseAccounts/>} /> {/* filtering */}
          <Route path="/Vehicle" exact element={<Vehicle />} />
          <Route path="/Inventory" exact element={<AdminInventory />} /> 
          <Route path="/Reserve/:vehicleID" exact element={<Reserve />} /> 
          <Route path="/AdminDashboard" exact element={<AdminDashboard />} /> {/* empty */}
          <Route path="/CRDashboard" exact element={<CRDashboard />} /> {/* empty */}
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
          <Route path ="/VehicleApplication" element = {<VehicleApplication/>}></Route>
            <Route path="/EstimationPage" component={EstimationPage} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
