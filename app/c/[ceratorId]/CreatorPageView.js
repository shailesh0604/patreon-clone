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

const CreatorPageView = () => {

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



  const pathName = usePathname();
  //console.log(pathName)


  const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand

  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handlefileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }


  const handleProfileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }


  



  return <>
    <div className="user-main-container">
      <div className={`user-container ${isToggled ? "resized" : ""}`}>

        <div className="user-sidebar-container">
          <Sidebar />
        </div>


        <div className="user-content-container">
          <form>
            <div className="published-container">
              <div className="published-content">
                <div className="text-black text-sm">Your page is not yet published</div>

                <div className="published-button">
                  <button className="btn-publish">
                    <span><BsRocketTakeoffFill /></span>
                    <span>Publish page</span>
                  </button>
                </div>
              </div>

              <div className="publish-banner">
                <div className="publish-cover">
                  {coverImage ? (
                    <Image
                      src={coverImage}
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
                    {profileImage ? (
                      <Image src={profileImage} width={0}
                        height={0}
                        sizes="100vw"
                        alt="profile" />
                    ) : null}
                    <input type="file" hidden accept="image/*" id="profilePicture" onChange={handleProfileChange} />

                    <button className="btn-profile" type="button" onClick={handleProfileClick}>
                        <FaImage />
                      <span className="cover-info">1600px by 400px recommended</span>
                    </button>

                  </div>
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