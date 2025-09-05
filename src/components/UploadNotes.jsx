import { useState } from "react";
import notesLogo from "../assets/Notes-logo.png";
import Alert from "./Alert";

const UploadNotes = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [info, setInfo] = useState({
    course: "",
    semester: "",
    notesName: "",
    author: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ msg: "", color: "" });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const showAlert = (message, color) => {
    setAlert({ msg: message, color });
    setTimeout(() => setAlert({ msg: "", color: "" }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!info.course || !info.semester || !info.notesName || !file) {
      showAlert("Please fill all fields and select a file!", "red");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      showAlert("File size exceeds 10MB limit!", "red");
      return;
    }

    setLoading(true);

    try {
      const author = localStorage.getItem("name");
      const noteData = { ...info, author };

      const formData = new FormData();
      formData.append(
        "note",
        new Blob([JSON.stringify(noteData)], { type: "application/json" })
      );
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await fetch(`${url}/api/uploadNotes`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        showAlert("Notes uploaded successfully!", "green");
        setInfo({ course: "", semester: "", notesName: "", author: "" });
        setFile(null);
      } else {
        showAlert("Upload failed. Try again!", "red");
      }
    } catch (err) {
      console.error(err);
      showAlert("Something went wrong!", "red");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !info.course || !info.semester || !info.notesName || !file || loading;

  return (
    <section className="min-h-screen pt-24 flex items-center justify-center secondary px-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        {alert.msg && <Alert msg={alert.msg} color={alert.color} />}

        <h2 className="text-3xl font-bold font-satisfy mb-6 text-[#317B74] flex items-center gap-2">
          <img src={notesLogo} alt="Notes Logo" className="h-10 w-10" />
          Upload Notes
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Course */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Course
            </label>
            <select
              name="course"
              value={info.course}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Semester
            </label>
            <select
              name="semester"
              value={info.semester}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            >
              <option value="" disabled>
                Select Semester
              </option>
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Notes Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Notes Name
            </label>
            <input
              type="text"
              name="notesName"
              value={info.notesName}
              onChange={handleChange}
              placeholder="Enter notes name"
              className="w-full px-3 sm:px-4 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Upload File
            </label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#317B74] focus:outline-none"
            />
            <p className="text-sm text-gray-500 mt-1 pl-1">
              Allowed formats: PDF, JPG, PNG less than 10MB.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-white transition ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#317B74] hover:bg-[#25645b]"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadNotes;
