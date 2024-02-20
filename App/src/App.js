import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "./pages/AdminDashboard";
import Representative from "./pages/CustomerRepresentativeDashboard";

function app() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/AdminDashboard" exact element={<Admin />} />
          <Route
            path="/CustomerRepresentative"
            exact
            element={<Representative />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default app;
