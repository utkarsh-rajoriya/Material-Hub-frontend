import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Download, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const NotesPreview = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const { fileUrl } = useParams();
  const decodedUrl = decodeURIComponent(fileUrl);
  const navigate = useNavigate();

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [], // removes sidebar
  });

  useEffect(() => {
    if (!decodedUrl) return;

    const pdfCheck = /\.pdf$/i.test(decodedUrl);
    const imageCheck = /\.(jpg|jpeg|png|gif|webp)$/i.test(decodedUrl);

    setIsPdf(pdfCheck);
    setIsImage(imageCheck);
  }, [decodedUrl]);

  if (!decodedUrl) return <p className="p-6 text-center">Loading note...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow rounded-2xl mt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-full hover:bg-gray-300 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Notes
        </button>
        <a
          href={decodedUrl}
          download
          className="flex items-center gap-2 px-4 py-2 bg-[#317b74] text-white text-sm rounded-full hover:bg-[#24635d] transition-all shadow"
        >
          <Download size={16} />
          Download
        </a>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-4 primary-g font-satisfy text-center">
        Preview
      </h2>

      {/* File Viewer */}
      <div className="flex justify-center bg-gray-100 rounded-lg p-3 sm:p-4 min-h-[500px] sm:min-h-[600px]">
        {isImage ? (
          <img
            src={decodedUrl}
            alt="Note Preview"
            className="max-h-[70vh] w-auto object-contain rounded-md shadow"
          />
        ) : isPdf ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
            <Viewer fileUrl={decodedUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        ) : (
          <div className="text-gray-500 text-lg">📄 Unsupported file type</div>
        )}
      </div>
    </div>
  );
};

export default NotesPreview;
