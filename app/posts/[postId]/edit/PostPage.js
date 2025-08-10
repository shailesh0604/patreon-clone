"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSidebarStore from "@/lib/store/sidebarStore";
import Sidebar from "@/Components/Sidebar";
import FilePreview from "@/Components/FilePreview";
import { useSession } from "next-auth/react";

const PostPage = () => {
  const { postId } = useParams(); // get postId from route
  const router = useRouter();

  const { data: session } = useSession();
  const { isToggled } = useSidebarStore();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill out all fields");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (selectedFile) {
      data.append("media", selectedFile);
    }

    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      body: data,
    });

    if (res.ok) {
      alert("Post updated successfully!");

      // Clear form
      setFormData({ title: "", content: "" });
      setSelectedFile(null);

      //  Redirect to creator page
      router.push(`/c/${session?.user?.patreon_account_username}`);
    } else {
      console.error(await res.json());
    }
  };

  return (
    <div className="user-main-container">
      <div className={`user-container ${isToggled ? "resized" : ""}`}>
        <div className="user-sidebar-container">
          <Sidebar />
        </div>

        <div className="user-content-container">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-10">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post title"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Post content"
              rows={10}
              className="w-full p-2 border rounded"
            />

            <div className="p-6">
              <FilePreview onFileSelect={handleFileSelect} />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
