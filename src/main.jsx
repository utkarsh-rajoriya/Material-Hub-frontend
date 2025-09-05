import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import App from "./App.jsx";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <AdminProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AdminProvider>
  </GoogleOAuthProvider>
);
