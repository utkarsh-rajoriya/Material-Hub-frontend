import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UploadNotes from "./components/UploadNotes";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import ProtectedRoute from "./contexts/ProtectedRoute";
import ViewNotes from "./components/ViewNotes";
import NotesPreview from "./components/NotesPreview";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminProtected from "./contexts/AdminProtected";
import MyUpload from "./components/MyUpload";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AdminContext } from "./contexts/AdminContext";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/admin-login", "/admin/dashboard"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const { logout } = useContext(AuthContext);
  const { adminLogout } = useContext(AdminContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");
    const adminExpiry = localStorage.getItem("adminExpiry");
    const adminToken = localStorage.getItem("adminToken");

    if (token && expiry) {
      if (Date.now() >= parseInt(expiry)) {
        logout();
      }
    }

    if (adminExpiry && adminToken) {
      if (Date.now() >= parseInt(adminExpiry)) {
        adminLogout();
      }
    }
  } , [logout, adminLogout]);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<ViewNotes />} />
        <Route path="/notes/:fileUrl" element={<NotesPreview />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myUploads"
          element={
            <ProtectedRoute>
              <MyUpload name={localStorage.getItem("name")} />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
