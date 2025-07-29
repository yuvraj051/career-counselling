import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="1028542245103"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
);
