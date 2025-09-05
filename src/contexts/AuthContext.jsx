import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

 
  const login = (token , name) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("name" , name)
    localStorage.setItem("expiry" , Date.now() + 3 * 60 * 60 * 1000);
  };

  // Clear token (logout)
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("expiry");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
