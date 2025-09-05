import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

 
  const adminLogin = (adminToken , adminName) => {
    setAdminToken(adminToken);
    localStorage.setItem("adminToken", adminToken);
    localStorage.setItem("adminName" , adminName)
    localStorage.setItem("adminExpiry" , Date.now() + 3 * 60 * 60 * 1000);
  };

  // Clear token (logout)
  const adminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminExpiry");
  };

  return (
    <AdminContext.Provider value={{ adminToken, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
