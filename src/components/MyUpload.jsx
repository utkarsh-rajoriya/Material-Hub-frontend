import React, { useEffect, useState } from "react";
import Note from "./Note";

const MyUpload = ({ name }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadUploads = async (pageNo = 0) => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/api/myUploads/${name}?page=${pageNo}&size=4`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if protected
        },
      });
      const data = await res.json();
      setNotes(data.content || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNo);
    } catch (err) {
      console.error("Error loading uploads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) loadUploads(0);
  }, [name]);

  return (
    <div className="pt-30 min-h-screen secondary px-4 sm:px-6 md:px-10 lg:px-16">
  <h1 className="text-3xl md:text-4xl font-bold mb-8 primary-g font-satisfy text-center ">
    📚 My Uploads..
  </h1>

  {loading ? (
    <p className="text-gray-600 italic text-center">Loading...</p>
  ) : notes.length === 0 ? (
    <p className="text-gray-600 italic text-center">No uploads found.</p>
  ) : (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
      {notes.map((note, idx) => (
        <Note key={idx} {...note} deleteOption={true}/>
      ))}
    </div>
  )}

  {/* Pagination */}
  <div className="my-5 flex justify-center items-center gap-4 md:mt-10">
    <button
      onClick={() => loadUploads(page - 1)}
      disabled={page === 0}
      className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 disabled:opacity-50 transition"
    >
      Prev
    </button>
    <span className="text-gray-700 text-lg">
      Page {page + 1} of {totalPages}
    </span>
    <button
      onClick={() => loadUploads(page + 1)}
      disabled={page + 1 >= totalPages}
      className="px-5 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 disabled:opacity-50 transition"
    >
      Next
    </button>
  </div>
</div>

  );
};

export default MyUpload;
