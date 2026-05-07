// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <App />
          </LoadScript>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  // </StrictMode>
);