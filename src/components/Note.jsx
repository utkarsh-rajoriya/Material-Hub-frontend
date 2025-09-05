import { useEffect, useRef } from "react";
import { Delete, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

const NoteCard = ({
  id,
  fileUrl,
  notesName,
  author,
  course,
  semester,
  publish,
  deleteOption,
}) => {
  const canvasRef = useRef(null);

  // Detect file type
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
  const isPdf = /\.pdf$/i.test(fileUrl);

  useEffect(() => {
    if (isPdf && canvasRef.current) {
      const loadPdf = async () => {
        try {
          const pdf = await pdfjsLib.getDocument(fileUrl).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;
        } catch (err) {
          console.error("Error rendering PDF:", err);
        }
      };

      loadPdf();
    }
  }, [fileUrl, isPdf]);

  const handleDeleteNote = async (id) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
      const res = await fetch(`${url}/api/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const msg = await res.text();
      alert(msg);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      {/* Thumbnail */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {isImage ? (
          <img
            src={fileUrl}
            alt={notesName}
            className="h-full w-full object-cover"
          />
        ) : isPdf ? (
          <canvas ref={canvasRef} className="h-full w-full object-cover" />
        ) : (
          <div className="text-gray-400 text-sm">📄 Unsupported File</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          {notesName}
        </h3>
        <p className="text-sm text-gray-600 mb-2">✍️ {author}</p>

        <div className="flex flex-wrap gap-2 text-xs mb-3">
          <span className="bg-[#ff9d01]/20 text-[#ff9d01] px-2 py-0.5 rounded-full font-medium">
            {course}
          </span>
          <span className="bg-[#317b74]/20 text-[#317b74] px-2 py-0.5 rounded-full font-medium">
            Sem {semester}
          </span>
          <span className="text-gray-500">
            📅{" "}
            {new Date(publish).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <a
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-[#317b74] text-white rounded-full hover:bg-[#24635d] transition-colors"
          >
            <Download size={14} />
            Download
          </a>
          {/* if DelteOption is true */}
          <div className="flex gap-1">
            {deleteOption && (
              <button
                className="flex items-center px-2 gap-1 py-1.5 text-xs bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors"
                onClick={() => {
                  handleDeleteNote(id);
                }}
              >
                <Delete size={14} />
                Delete
              </button>
            )}
            <Link
              to={`/notes/${encodeURIComponent(fileUrl)}`}
              className="flex items-center px-2 gap-1 py-1.5 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Eye size={14} />
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
