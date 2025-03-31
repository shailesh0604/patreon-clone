"use client"
import { useState, useEffect } from "react"

export default function Dashboard(userId) {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (!userId) return; // Prevent fetching if userId is missing

        fetch(`/api/getUserMedia?userId=${userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.error("Error fetching user media:", error);
            });
    }, [userId]);

    const handleFileUpload = async () => {

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    file: reader.result
                })
            });

            const data = await response.json();
            setFiles([...files, data]);
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold">User Files</h2>

            {/* Upload File */}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload} className="bg-blue-500 text-white px-3 py-2 mt-2">Upload</button>

            {/* Display Files */}
            <div className="grid grid-cols-3 gap-4 mt-4">
                {files.map((file) => (
                    <div key={file._id} className="border p-3">
                        <p className="text-sm">{file.filename}</p>
                        {file.fileType.startsWith("image") ? (
                            <img src={file.fileUrl} alt={file.filename} className="w-full h-auto" />
                        ) : (
                            <video width="100%" controls>
                                <source src={file.fileUrl} type={file.fileType} />
                            </video>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

}