"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSidebarStore from "@/lib/store/sidebarStore";
import Sidebar from "@/Components/Sidebar";
import FilePreview from "@/Components/FilePreview";

const PostPage = () => {
  const { postId } = useParams(); // get postId from route

  const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand

  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((e) => ({ ...e, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please update all data");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("content", formData.content);

    console.log("Form values:", formData.title, formData.content);

    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      body: data,
    });

    console.log(res);

    if (res.ok) {
      alert("Post saved!");
      // router.push(`/posts/${postId}/edit`);
    } else {
      alert("Error saving post");
    }
  };





  return <>
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

            <div className="">
              <div className="p-6">
                <FilePreview onFileSelect={handleFileSelect} />
              </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save Post
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
}


export default PostPage