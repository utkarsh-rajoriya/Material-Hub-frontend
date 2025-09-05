import { useContext, useEffect, useState } from "react";
import Alert from "./Alert";
import { AdminContext } from "../contexts/AdminContext";

const AdminDashboard = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [requests, setRequests] = useState([]);
  const [alert, setAlert] = useState({ msg: "", color: "" });
  const [loadingId, setLoadingId] = useState(null);
  const { adminLogout } = useContext(AdminContext);

  const showAlert = (msg, color) => {
    setAlert({ msg, color });
    setTimeout(() => setAlert({ msg: "", color: "" }), 2500);
  };

  // Fetch pending teacher requests
  const loadRequests = async () => {
    try {
      const res = await fetch(`${url}/api/admin/getReqs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      showAlert("Failed to load requests", "red");
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAction = async (id, action) => {
    setLoadingId(id);
    try {
      const res = await fetch(`${url}/api/admin/${action}/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      showAlert(
        data.message || `${action}d! successfully`,
        action === "approve" ? "green" : "red"
      );
      loadRequests(); // refresh list
    } catch (err) {
      console.error(err);
      showAlert(`Failed to ${action} teacher`, "red");
    } finally {
      setLoadingId(null);
    }
  };

  return (
   <div className="pt-[2rem] min-h-screen secondary p-6 sm:p-10 relative">
  {alert.msg && <Alert msg={alert.msg} color={alert.color} />}

  {/* Top bar with title and logout button */}
  <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
    <h1 className="text-2xl sm:text-4xl font-satisfy font-bold primary-g max-md:w-55">
      Pending Teacher Requests
    </h1>
    <button
      onClick={adminLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold shadow-md transition text-sm sm:text-base"
    >
      Logout
    </button>
  </div>

  {/* Requests Section */}
  {requests.length === 0 ? (
    <p className="text-gray-600 text-base sm:text-lg italic text-center sm:text-left">
      ✨ No pending requests right now.
    </p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((teacher) => (
        <div
          key={teacher.id}
          className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 italic">
              {teacher.name}
            </h2>
            <p className="text-gray-700 mb-1 italic text-sm sm:text-base">
              <span className="font-medium">Email:</span> {teacher.email}
            </p>
            <p className="text-gray-700 mb-1 italic text-sm sm:text-base">
              <span className="font-medium">Role:</span> {teacher.role}
            </p>
            <p className="text-gray-700 text-xs sm:text-sm italic">
              <span className="font-medium">Requested on:</span>{" "}
              {teacher.date
                ? new Date(teacher.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={() => handleAction(teacher.id, "approve")}
              disabled={loadingId === teacher.id}
              className={`flex-1 py-2 rounded-lg text-white font-semibold transition text-sm sm:text-base ${
                loadingId === teacher.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#317b74] hover:bg-[#25645b]"
              }`}
            >
              {loadingId === teacher.id ? "Processing..." : "Approve"}
            </button>

            <button
              onClick={() => handleAction(teacher.id, "reject")}
              disabled={loadingId === teacher.id}
              className={`flex-1 py-2 rounded-lg text-white font-semibold transition text-sm sm:text-base ${
                loadingId === teacher.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#ff9d01] hover:bg-[#e68c00]"
              }`}
            >
              {loadingId === teacher.id ? "Processing..." : "Reject"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default AdminDashboard;
