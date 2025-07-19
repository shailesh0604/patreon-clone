"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation"
import Sidebar from "@/Components/Sidebar";
import useSidebarStore from '@/lib/store/sidebarStore';
import { BsRocketTakeoffFill } from "react-icons/bs";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";

const CreatorPageView = ({ }) => {

  const { data: session, status } = useSession();
  const [fullUrl, setFullUrl] = useState("")
  const [showUserURL, setShowUserURL] = useState("")
  const [activeTab, setActiveTab] = useState('Home');

  const userLetter = useSidebarStore((state) => state.userLetter);

  const router = useRouter();

  useEffect(() => {

    if (status === "unauthenticated") {
      router.push("/login");
    }


  }, [status, router]);



  const [formData, setformData] = useState({
    name: "",
    headline: ""
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    headline: "",
    profileImage: "",
    coverImage: ""
  })

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (session?.user?.patreon_account_coverpic) {
      setCoverImagePreview(session.user.patreon_account_coverpic);
    }
    if (session?.user?.patreon_account_profilepic) {
      setProfileImagePreview(session.user.patreon_account_profilepic);
    }

    if (session?.user?.patreon_account_name) {
      formData.name = session.user.patreon_account_name;
    }
    if (session?.user?.patreon_account_username_headline) {
      formData.headline = session.user.patreon_account_username_headline;
    }

    if (session?.user?.patreon_account_published) {
      setIsPublished(true);
    }


    if (session?.user) {
      const name = session.user.patreon_account_name || "";
      const headline = session.user.patreon_account_username_headline || "";
      const profilePic = session.user.patreon_account_profilepic || "";
      const coverPic = session.user.patreon_account_coverpic || "";

      setformData({ name, headline });
      setProfileImagePreview(profilePic);
      setCoverImagePreview(coverPic);

      setOriginalData({
        name,
        headline,
        profileImage: profilePic,
        coverImage: coverPic
      });

      if (session.user.patreon_account_published) {
        setIsPublished(true);
      }
    }


    const { protocol, host } = window.location;
    const username = session?.user?.patreon_account_username;
    if (username) {
      setFullUrl(`${protocol}//${host}/${username}`);
      setShowUserURL(`${host}/${username}`);
    }


  }, [session]);



  useEffect(() => {
    const isChanged =
      formData.name !== originalData.name ||
      formData.headline !== originalData.headline ||
      coverImagePreview !== originalData.coverImage ||
      profileImagePreview !== originalData.profileImage;

    setIsDirty(isChanged);
  }, [formData, coverImagePreview, profileImagePreview, originalData]);


  const handleCoverClick = () => {
    document.getElementById("coverPicture").click();
  };

  const handleProfileClick = () => {
    document.getElementById("profilePicture").click();
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((e) => ({ ...e, [name]: value }));
    setIsDirty(true);

  }

  const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand

  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
      setIsDirty(true);
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
      setIsDirty(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, headline } = formData;

    if (!formData.name.trim() ||
      !formData.headline.trim() ||
      (!profileFile && !profileImagePreview) ||
      (!coverFile && !coverImagePreview)) {
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

    setIsDirty(false);
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
              {(!isPublished || isDirty) && (
                <div className="published-content">
                  <div className="text-black text-sm">{isPublished ? "You have unsaved changes" : "Your page is not yet published"}</div>

                  <div className="published-button">
                    <button className="btn-publish" type="submit">
                      <span><BsRocketTakeoffFill /></span>
                      <span>{isPublished ? "Update page" : "Publish page"}</span>
                    </button>
                  </div>
                </div>
              )}

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

                  {fullUrl && (
                    <Link href={fullUrl} className="flex items-center gap-2 text-white opacity-80 mt-4 text-sm"
                      target="_blank" rel="noopener noreferrer">
                      <span><FaLink /></span>
                      <span>{showUserURL}</span>
                    </Link>
                  )}

                </div>
              </div>

              <div className="patreon-account-tabs-contents">
                <ul className="patreon-account-tabs">
                  {["Home", "Collections", "Shop", "Membership", "About", "Recommendations"].map((tab) => (<li key={tab} className={`account-tabs`} role="presentation">
                    <button onClick={() => setActiveTab(tab)} type="button" className={`account-link ${activeTab === tab ? "active" : ""}`}> {tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
                  </li>))}
                </ul>
              </div>

            </div>
          </form>
        </div>
      </div >
    </div >
  </>

}

export default CreatorPageView