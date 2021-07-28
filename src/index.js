import React from "react";
import ReactDOM from "react-dom";

// Global CSS
import "scss/index.scss";

// The entry point of our application
import App from "App";

// Gets the div#root from public/index.html and injects/renders our React app inside
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Note: React.StrictMode is just to warn you for potential errors, use of deprecated functions, etc.
