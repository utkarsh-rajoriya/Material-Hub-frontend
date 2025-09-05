import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import materialHubLogo from "../assets/material-hub-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Reusable nav links
  const commonLinks = (
    <>
      <Link
        to="/"
        className="text-gray-800 hover:text-[#317B74] transition"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-gray-800 hover:text-[#317B74] transition"
        onClick={() => setIsOpen(false)}
      >
        About
      </Link>
      <Link
        to="/notes"
        className="text-gray-800 hover:text-[#317B74] transition"
        onClick={() => setIsOpen(false)}
      >
        Notes
      </Link>
    </>
  );

  return (
    <div className="flex justify-center items-center">
      <nav className="z-50 fixed top-2 w-[95%] px-6 py-4 flex items-center justify-between rounded-4xl bg-white/20 backdrop-blur-lg shadow-lg">
        <Link to="/">
          <img
            src={materialHubLogo}
            alt="Material Hub Logo"
            className="h-10 bg-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">{commonLinks}</div>

        <div className="hidden md:flex gap-3">
          {!token ? (
            <Link to="/login">
              <button className="px-4 py-2 rounded-xl bg-[#317B74] text-white font-semibold hover:bg-[#25645b] transition">
                Login
              </button>
            </Link>
          ) : (
            <>
              <Link to="/myUploads">
                <button className="px-4 py-2 rounded-xl bg-[#bf00ea] text-white font-semibold hover:bg-[#8501c3] transition">
                  My uploads
                </button>
              </Link>
              <button
                className="px-4 py-2 rounded-xl bg-[#ff2929] text-white font-semibold hover:bg-[#da4040] transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {/* Upload → always visible */}
          <Link to="/upload">
            <button className="px-4 py-2 rounded-xl bg-[#FF9D01] text-white font-semibold hover:bg-[#e68c00] transition">
              Upload
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col gap-4 text-center z-40">
          {commonLinks}

          {!token ? (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-2 px-4 py-2 rounded-xl bg-[#317B74] text-white font-semibold hover:bg-[#25645b] transition">
                Login
              </button>
            </Link>
          ) : (
            <>
              <Link to="/myUploads" onClick={() => setIsOpen(false)}>
                <button className="w-full mt-2 px-4 py-2 rounded-xl bg-[#bf00ea] text-white font-semibold hover:bg-[#8501c3] transition">
                  My uploads
                </button>
              </Link>
              <button
                className="w-full mt-2 px-4 py-2 rounded-xl bg-[#ff2929] text-white font-semibold hover:bg-[#da4040] transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {/* Upload → always visible */}
          <Link to="/upload" onClick={() => setIsOpen(false)}>
            <button className="w-full px-4 py-2 rounded-xl bg-[#FF9D01] text-white font-semibold hover:bg-[#e68c00] transition">
              Upload
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;