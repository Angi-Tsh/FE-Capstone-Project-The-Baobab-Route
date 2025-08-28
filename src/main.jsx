import React from "react";
import ReactDOM from "react-dom/client"; //Use client for modern React 
import App from "./App";
import "./index.css"; //Import global styles

//Use this file to hook main component: "App" into the index.html file, using refrenece id "root".
//This is the entry point of the React application.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Vite recognises main.jsx as the default entry point and not index.jsx