import React from "react";
import ReactDOM from "react-dom/client";

import AnotherApp from "./scripts/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AnotherApp />
  </React.StrictMode>
);
