"use client";

import { useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [uploadUrl, setUploadUrl] = useState("");
    const [userId, setUserId] = useState("");

    const handleUpload = async () => {
        if (!file || !userId) return alert("Please select a file and enter a username");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.url) {
            setUploadUrl(data.url);
            alert("Upload successful!");
        } else {
            alert("Upload failed");
        }
    };

    return (
        <div className="p-6">
            <input
                type="text"
                placeholder="Enter Username"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="p-2 border rounded w-full"
            />
            <button
                onClick={handleUpload}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
                Upload
            </button>

            {uploadUrl && (
                <p className="mt-4">
                    File Uploaded:{" "}
                    <a href={uploadUrl} target="_blank" className="text-blue-600">
                        {uploadUrl}
                    </a>
                </p>
            )}
        </div>
    );
}
