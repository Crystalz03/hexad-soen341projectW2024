import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BrowseAccounts from "./pages/BrowseAccounts";
import Vehicle from "./pages/Vehicle";
import Browse from "./pages/Browse";
import Reserve from "./pages/Reserve";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCRAccount from "./pages/CreateCRAccount";
import SignIn from "./pages/SignIn";
import CRDashboard from "./pages/CRDashboard";
import DeleteReservationPage from "./pages/DeleteReservationPage";
import MyAccountPage from "./pages/MyAccountPage";
import CreateAdminAccount from "./pages/CreateAdminAccount";
import View from "./pages/View";
import AdminInventory from "./pages/AdminInventory";
import Modify from "./pages/Modify";
import UpdateVehicle from "./pages/UpdateVehicle";

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => {console.log(res); 
        setApiResponse(res
        )})
      .catch(error => console.error('Error fetching data:', error));
  }
  const callAPI2 = () => {
    fetch("http://localhost:9000/vehicles", {
      method: 'GET', 
    })
      .then(data => data.json())
      .then(data => {console.log(data.vehicle[0][0]); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
        setApiResponse(data                              // data.vehicle[0] = array of vehicles  -- data.vehicle[0][0] = 1st vehicle in the list -- data.vehicle[0][0].ID == ID of the first vehicle
        )})
      .catch(error => console.error(error));
  };
  useEffect(() => {
    callAPI();
    callAPI2();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/BrowseAccounts" exact element={<BrowseAccounts/>} />
          <Route path="/Vehicle" exact element={<Vehicle />} />
          <Route path="/Inventory" exact element={<AdminInventory />} />
          <Route path="/Reserve" exact element={<Reserve />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/AdminDashboard" exact element={<AdminDashboard />} />
          <Route path="/CRDashboard" exact element={<CRDashboard />} />
          <Route path="/CreateCRAccount" exact element={<CreateCRAccount />} />
          <Route path="/DeleteReservationPage" exact element={<DeleteReservationPage />} />
          <Route path="/MyAccountPage" exact element={<MyAccountPage />} />
          <Route path="/CreateAdminAccount" exact element={<CreateAdminAccount/>} />
          <Route path="/Browse" exact element={<Browse/>} />
          <Route path="/View" exact element={<View/>} />
          <Route path="/Modify" exact element={<Modify/>} />
          <Route path="/UpdateVehicle" exact element={<UpdateVehicle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
