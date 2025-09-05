import React, { useEffect, useState } from "react";
import Note from "./Note";

const ViewNotes = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const size = 6;

  useEffect(() => {
    fetchNotes(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchNotes = async (pageNo) => {
    try {
      const res = await fetch(`${url}/api/getNoteBySearch?query=${searchTerm}&course=${selectedCourse}&semester=${selectedSemester}&page=${pageNo}&size=${size}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (pageNo === 0) {
        // reset notes on first load/search
        setNotes(data.content || []);
      } else {
        setNotes((prev) => [...prev, ...(data.content || [])]);
      }

      setHasMore(!data.last); // "last" from Spring PageImpl
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const handleSearch = () => {
    setPage(0); // reset to first page
    fetchNotes(0);
  };

  return (
    <div className="secondary px-4 sm:px-6 lg:px-10 pt-28 pb-12 min-h-screen">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-satisfy primary-g mb-10 text-center">
        📚 Explore Study Notes
      </h2>

      {/* Search + Filters */}
      <div className="mb-10">
        {/* Search bar */}
        <div className="w-full max-w-3xl mx-auto mb-5">
          <input
            type="text"
            placeholder="🔎 Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#317b74] 
                       shadow-sm text-lg"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-5 py-2 rounded-full border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#317b74] 
                       shadow-sm text-sm md:text-base"
          >
            <option value="">All Courses</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>

          {/* Semester Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-5 py-2 rounded-full border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#317b74] 
                       shadow-sm text-sm md:text-base"
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-[#317b74] hover:bg-[#24635d] text-white 
                       rounded-full shadow-md transition-all text-sm md:text-base"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {notes.length > 0 ? (
          notes.map((note, idx) => <Note key={idx} {...note} />)
        ) : (
          <p className="text-gray-600 italic col-span-full text-center">
            No notes found 📭
          </p>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        {hasMore ? (
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-[#317b74] hover:bg-[#24635d] text-white font-medium rounded-full shadow-md transition-all duration-300"
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-600 italic">✨ You’ve reached the end ✨</p>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
