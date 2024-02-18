import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';


function app() {
  return (
    <div className="app">
      
    <Router>
      <Routes> 
        <Route path="/" exact element={<Home />} />
      
      </Routes>
    </Router>
    </div>
  );
}

export default app;