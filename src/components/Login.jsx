import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ msg: "", color: "" });
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (token) {
      navigate("/myUploads");
    }
  }, [token]);

  const showAlert = (message, color) => {
    setAlert({
      msg: message,
      color: color,
    });

    setTimeout(() => {
      setAlert({ msg: "", color: "" });
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message === "Invalid credentials") {
          showAlert("Invalid credentials", "red");
        } else if (data.message === "User not exist") {
          showAlert("User does not exist", "red");
        } else if (data.token) {
          login(data.token, data.name);
          navigate("/upload");
        }
      } else {
        setAlert({ msg: data.message || "Something went wrong", color: "red" });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({ msg: "Server error. Please try again.", color: "red" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center secondary px-4 pt-28">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {alert.msg && <Alert msg={alert.msg} color={alert.color} />}

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6 text-[#317B74] font-satisfy">
          Login here...
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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

        <Link to="/register">
          <p className="mt-4 text-center primary-g underline">
            Don't have account!
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
