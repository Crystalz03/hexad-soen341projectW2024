import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerRepresentativeDashboard from "./pages/CustomerRepresentativeDashboard";
import CreateCRAccount from "./pages/CreateCRAccount";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/AdminDashboard" exact element={<AdminDashboard />} />
          <Route
            path="/CustomerRepresentativeDashboard"
            exact
            element={<CustomerRepresentativeDashboard />}
          />
          <Route path="/CreateCRAccount" exact element={<CreateCRAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
