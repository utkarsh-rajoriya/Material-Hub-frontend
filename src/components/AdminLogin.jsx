import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { AdminContext } from "../contexts/AdminContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const { adminLogin, adminToken } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ msg: "", color: "" });

  useEffect(() => {
    if (adminToken) {
      navigate("/admin/dashboard");
    }
  }, [adminToken]);

  const showAlert = (message, color) => {
    setAlert({ msg: message, color });
    setTimeout(() => setAlert({ msg: "", color: "" }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      

      if (res.ok) {
        if (data.message === "Invalid credentials") {
          showAlert(data.message, "red");
        } else if (data.message === "Admin not exist") {
          showAlert("Admin does not exist", "red");
        } else if (data.message === "You are not Admin!") {
          showAlert(data.message, "red");
        }
        else if (data.adminToken) {
          adminLogin(data.adminToken, data.adminName); 
          navigate("/admin/dashboard");
        }
      } else {
        showAlert(data.message || "Something went wrong", "red");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Server error. Please try again.", "red");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
    {alert.msg && <Alert msg={alert.msg} color={alert.color} />}

    <h2 className="text-4xl font-bold mb-6 text-[#317B74] font-satisfy text-center">
      Admin Login
    </h2>

    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#317B74] focus:outline-none"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#317B74] focus:outline-none"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-[#317B74] text-white font-semibold hover:bg-[#25645b] transition"
      >
        Login
      </button>
    </form>

    <Link to="/admin/forgot-password">
      <p className="mt-4 text-center text-[#317B74] underline text-sm hover:text-[#25645b] transition">
        Forgot Password?
      </p>
    </Link>
  </div>
</section>

  );
};

export default AdminLogin;
