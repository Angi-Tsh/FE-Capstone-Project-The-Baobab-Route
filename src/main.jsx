import React from "react";
import ReactDOM from "react-dom/client"; //Use client for modern React 
import App from "./App";
import "./index.css"; //Import global styles
import { BrowserRouter } from "react-router-dom"; 

//Use this file to hook main component: "App" into the index.html file, using refrenece id "root".
//This is the entry point of the React application.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

//Vite recognises main.jsx as the default entry point and not index.jsx