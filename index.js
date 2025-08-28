import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Use this file to hook main component: "App" into the index.html file, using refrenece id "root".
//This is the entry point of the React application.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);