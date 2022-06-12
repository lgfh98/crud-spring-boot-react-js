import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./style/index.css";
import App from "./App";

const root = ReactDOMClient.createRoot(document.getElementById("react"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
