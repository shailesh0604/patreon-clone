
// components/CustomFileUpload.jsx
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function FilePreview({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm", "video/ogg"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Only images and videos are allowed.");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    onFileSelect?.(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col items-center">
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-400 p-6 rounded-xl cursor-pointer hover:border-blue-500 transition-colors w-full max-w-md flex flex-col items-center justify-center gap-3"
      >
        <FaCloudUploadAlt className="text-4xl text-blue-500" />
        <p className="text-gray-600">Drag & drop or click to upload</p>
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {previewUrl && (
        file.type.startsWith("video") ? (
          <video controls className="mt-4 rounded-lg max-w-md">
            <source src={previewUrl} type={file.type} />
          </video>
        ) : (
          <img src={previewUrl} alt="Preview" className="mt-4 rounded-lg max-w-md" />
        )
      )}
    </div>
  );
}
