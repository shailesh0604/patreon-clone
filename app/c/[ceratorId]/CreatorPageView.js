"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react'
import { usePathname } from "next/navigation";
import Sidebar from "@/Components/Sidebar";
import useSidebarStore from '@/lib/store/sidebarStore';
import { BsRocketTakeoffFill } from "react-icons/bs";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";


const CreatorPageView = ({ userLetter }) => {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleCoverClick = () => {
    document.getElementById("coverPicture").click();
  };

  const handleProfileClick = () => {
    document.getElementById("profilePicture").click();
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((e) => ({ ...e, [name]: value }))

  }

  const pathName = usePathname();
  //console.log(pathName)

  const [formData, setformData] = useState({
    name: "",
    headline: ""
  })

  const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }


  const handleProfileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, headline } = formData;

    if (!formData.name.trim() || !formData.headline.trim() || !profileFile || !coverFile) {
      alert("Please update all data");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("headline", formData.headline);
    if (profileFile) data.append("profileImage", profileFile);
    if (coverFile) data.append("coverImage", coverFile);


    // console.log(formData);

    const res = await fetch("/api/user/update", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    if (result.success) {
      alert("Updated successfully!");
    } else {
      alert("Update failed");
    }

  };


  return <>
    <div className="user-main-container">
      <div className={`user-container ${isToggled ? "resized" : ""}`}>

        <div className="user-sidebar-container">
          <Sidebar />
        </div>


        <div className="user-content-container">
          <form onSubmit={handleSubmit}>
            <div className="published-container">
              <div className="published-content">
                <div className="text-black text-sm">Your page is not yet published</div>

                <div className="published-button">
                  <button className="btn-publish" onClick={handleSubmit}>
                    <span><BsRocketTakeoffFill /></span>
                    <span>Publish page</span>
                  </button>
                </div>
              </div>

              <div className="publish-banner">
                <div className="publish-cover">
                  {coverImagePreview ? (
                    <Image
                      src={coverImagePreview}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="cover"
                    />
                  ) : null}
                  <input type="file" hidden accept="image/*" id="coverPicture" onChange={handlefileChange} />
                  <button className="btn-cover" type="button" onClick={handleCoverClick}>
                    <span>
                      <FaImage />
                    </span>
                    <span>Set Cover</span>

                    <span className="cover-info">1600px by 400px recommended</span>
                  </button>

                  <div className="publish-profile">
                    {profileImagePreview ? (
                      <Image src={profileImagePreview} width={0}
                        height={0}
                        sizes="100vw"
                        alt="profile" />
                    ) : <span className="text-5xl text-white font-semibold">{userLetter}</span>}
                    <input type="file" hidden accept="image/*" id="profilePicture" onChange={handleProfileChange} />

                    <button className="btn-profile" type="button" onClick={handleProfileClick}>
                      <FaImage />
                    </button>
                  </div>
                </div>
              </div>

              <div className="publish-other-content">
                <div className="flex items-center flex-col mt-20">
                  <input type="text" placeholder="Add name" name="name" value={formData.name} onChange={handleChange} className=" bg-transparent text-white text-lg font-semibold border-none outline-none text-center focus:bg-transparent" />
                  <input type="text" name="headline" value={formData.headline} onChange={handleChange} className="bg-transparent focus:bg-transparent text-white mt-2 text-base border-none outline-none text-center" placeholder="Add headline" />
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  </>

}

export default CreatorPageView