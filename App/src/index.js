import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
   
  <Provider store={store}>
     <React.StrictMode>
    <App />
    </React.StrictMode>
  </Provider>

  
);
