import React,  { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerRepresentativeDashboard from "./pages/CustomerRepresentativeDashboard";

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

  useEffect(() => {
    callAPI();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/AdminDashboard" exact element={<AdminDashboard />} />
          <Route path="/CustomerRepresentativeDashboard" exact element={<CustomerRepresentativeDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
