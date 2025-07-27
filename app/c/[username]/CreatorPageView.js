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
import { IoAdd } from "react-icons/io5";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa"
import { BsFillBarChartFill } from "react-icons/bs";

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

    if (profileFile) {
      data.append("profileImage", profileFile);
    } else if (profileImagePreview) {
      data.append("profileImageUrl", profileImagePreview);
    }

    if (coverFile) {
      data.append("coverImage", coverFile);
    } else if (coverImagePreview) {
      data.append("coverImageUrl", coverImagePreview);
    }


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


  const createPost = async () => {
    const res = await fetch("/api/create-post", { method: "POST" });
    const data = await res.json();
    console.log(data);
    router.push(`/posts/${data.postId}/edit`);
  }


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
            </div>
          </form>

          <div className="patreon-account-tabs-contents">
            <ul className="patreon-account-tabs">
              {["Home", "Collections", "Shop", "Membership", "About", "Recommendations"].map((tab) => (<li key={tab} className={`account-tabs`} role="presentation">
                <button onClick={() => setActiveTab(tab)} type="button" className={`account-link ${activeTab === tab ? "active" : ""}`}> {tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
              </li>))}
            </ul>

            {/* tabs contents */}

            <div id="patreon-style-tab-content" className="tabs-contents">
              {activeTab === 'Home' && (
                <div className="tab-content home-tab-content">
                  <div className="home-heading">
                    <div className="text-lg md:text-xl text-center md:text-start font-semibold mb-4">
                      Your Patreon is ready! Here's how to make it yours
                    </div>
                    <div className="home-subtitle text-center md:text-start">
                      Adding some details helps visitors learn more about you and what you plan to share here.
                    </div>
                  </div>

                  <button type="button" className="btn-post" onClick={createPost}>
                    <span><IoAdd className="text-2xl" /></span>
                    <span>New Post</span>
                  </button>

                </div>
              )}

              {activeTab === 'Collections' && (
                <div className="bg-white rounded-2xl max-w-[85%] mx-auto px-6 py-5">
                  <div className="flex justify-center sm:justify-between  items-center gap-4 flex-wrap mb-10">
                    <div className="text-xl font-semibold">Collection</div>
                    <div className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-full opacity-85">
                      <span><IoAdd className="text-2xl" /></span>
                      <span>Create Collection</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="bg-slate-300 p-5 rounded-full">
                      <BsCollectionPlayFill className="text-2xl" />
                    </div>

                    <div className="font-medium text-lg capitalize mt-3 mb-6">
                      No collections yet!
                    </div>

                    <div className="font-normal text-sm text-balance opacity-85">
                      <p className="text-center">Collections is an improved way to organise your posts and it helps</p>
                      <p className="text-center">your members explore all your great work.</p>

                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Shop' && (
                <div className="bg-white rounded-2xl max-w-[85%] mx-auto px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold mb-6">Earn more with Commerce</div>

                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-2 sm:gap-6">
                          <div>
                            <FaCirclePlay className="text-3xl" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">Sell your work to anyone</h4>
                            <p className="font-normal text-[0.9rem] opacity-90">Easily list your new and existing posts, products and collections for anyone to purchase.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-6">
                          <div>
                            <AiFillThunderbolt className="text-3xl" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">Unlock your earnings from new fans</h4>
                            <p className="font-normal text-[0.9rem] opacity-90">On average, over 80% of one-time payments come from fans who have never paid the creator before.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-6">
                          <div>
                            <RiMoneyRupeeCircleFill className="text-3xl" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">Integrate it with your membership</h4>
                            <p className="font-normal text-[0.9rem] opacity-90">
                              Give fans an option to purchase work individually or join your membership to unlock even more.</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6 mt-10">
                        <button className="bg-black text-white px-5 py-2 rounded-xl">Get started</button>
                        <button className="text-black">Learn more</button>
                      </div>

                    </div>


                    <div className="shop-video">
                      <video muted autoPlay playsInline loop >
                        <source src="/assets/videos/shop.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Membership' && (
                <div className="bg-white rounded-2xl max-w-[85%] mx-auto px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold mb-6">Build your paid membership</div>

                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-2 sm:gap-6">
                          <div>
                            <RiMoneyRupeeCircleFill className="text-3xl" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">Income you can count on</h4>
                            <p className="font-normal text-[0.9rem] opacity-90">Earn recurring income from your biggest fans.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-6">
                          <div>
                            <FaCheckCircle className="text-2xl" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">Start with what you have</h4>
                            <p className="font-normal text-[0.9rem] opacity-90">Offer something you’re already excited to share with your fans, plus some added perks.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-6">
                          <div>
                            <BsFillBarChartFill className="text-2xl" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">Grow your creative business</h4>
                            <p className="font-normal text-[0.9rem] opacity-90">
                              Get insights on your members, create exclusive member-only Chats and more.</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6 mt-10">
                        <button className="bg-black text-white px-5 py-2 rounded-xl">Get started</button>
                      </div>

                    </div>


                    <div className="member-img">
                      <Image src="/assets/images/full_tier_img.png" width={0} height={0} sizes="100vw" alt="member" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'About' && (
                <div className="tab-content home-tab-content">
                  <div className="about-img">
                    <Image src={"/assets/images/about.png"} width={0} height={0} alt="about" sizes="100vw" />
                  </div>

                  <div className="about-heading">
                    <div className="text-lg md:text-xl text-center font-semibold mb-4">
                      Introduce yourself
                    </div>

                    <div className="home-subtitle text-center">
                      Help people coming to your page get to know you. Share more about who you are, what you create and why you're on Patreon! Learn more
                    </div>
                  </div>

                  <div className="flex justify-center w-full mt-4">
                    <button className="border px-4 py-3 rounded-lg text-sm">
                      Add details
                    </button>
                  </div>

                </div>
              )}

              {activeTab === 'Recommendations' && (
                <div className="tab-content home-tab-content">
                  <div className="home-heading">
                    <div className="text-lg md:text-xl text-center md:text-start font-semibold mb-4">
                      Creators recommending you to their fans
                    </div>
                    <div className="home-subtitle text-center md:text-start">
                      Creators who recommend you will appear here. You can try recommending a creator first.
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>


        </div>
      </div >
    </div >
  </>

}

export default CreatorPageView