import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";

import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCRAccount from "./pages/CreateCRAccount";
import SignIn from "./pages/SignIn";
import Cancel from "./pages/Cancel";
import Browse from "./pages/Browse";
import AdminInventory from "./pages/AdminInventory";

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        setApiResponse(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const callAPI2 = () => {
    fetch("http://localhost:9000/vehicles", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.vehicle[0][0]); // always keep data.vehicle[0] this will return you an arrray with all the vehilce
        setApiResponse(
          data // data.vehicle[0] = array of vehicles  -- data.vehicle[0][0] = 1st vehicle in the list -- data.vehicle[0][0].ID == ID of the first vehicle
        );
      })
      .catch((error) => console.error(error));
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
          <Route path="/Vehicle" exact element={<Vehicle />} />
          <Route path="/AdminInventory" exact element={<AdminInventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
