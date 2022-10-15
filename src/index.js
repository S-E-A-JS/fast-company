import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <BrowserRouter>
  <React.StrictMode>
   <App />
  </React.StrictMode>
 </BrowserRouter>
);

reportWebVitals();
