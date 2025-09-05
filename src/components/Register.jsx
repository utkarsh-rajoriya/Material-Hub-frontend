import { useEffect, useState } from "react";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Teacher",
  });

  const [alert, setAlert] = useState({ msg: "", color: "" });
  const [loading, setLoading] = useState(false); // 👈 loading state

  const showAlert = (message, color) => {
    setAlert({ msg: message, color: color });
    setTimeout(() => setAlert({ msg: "", color: "" }), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showAlert("Passwords do not match!", "red");
      return;
    }

    setLoading(true); // start loading
    try {
      const response = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.message === "Email does not exist") {
          showAlert(data.message, "red");
        } else if (data.message === "User already exists with email") {
          showAlert(data.message, "red");
        } else if (data.message === "Request already Exist with this email") {
          showAlert(data.message, "red");
        } else {
          showAlert("Request sent to Admin", "green");
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Teacher",
          });
        }
      } else {
        showAlert(data.message || "Registration failed!", "red");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Something went wrong. Try again later.", "red");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <section className="min-h-screen pt-24 flex items-center justify-center secondary px-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-7">
        {alert.msg && <Alert msg={alert.msg} color={alert.color} />}

        <h2 className="text-4xl font-bold font-satisfy mb-6 text-[#317B74]">
          Sign up here...
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            />
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            >
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 sm:py-3 rounded-xl text-white font-semibold transition text-sm sm:text-base ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#317B74] hover:bg-[#25645b]"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <Link to="/login">
          <p className="mt-3 text-center primary-g underline text-sm sm:text-base">
            Already have an account?
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Register;
