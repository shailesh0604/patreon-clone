"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Sidebar from '@/Components/Sidebar'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react";
import useSidebarStore from "@/lib/store/sidebarStore";
import { MdDeleteOutline } from "react-icons/md";

const Setting = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);


    const { isToggled } = useSidebarStore();


    const [settingImg, setSettingImg] = useState("/assets/images/user/default-user.png")

    const [activeTab, setActiveTab] = useState('Basics')

    const [loading, setLoading] = useState(true);;


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        //console.log(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettingImg(reader.result);
            }

            reader.readAsDataURL(file);
        }
    }

    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        if (activeTab === "Memberships") {
            try {
                fetch("/api/membership/subscribed")
                    .then((res) => res.json()).then((data) => {
                        // console.log("Membership data:", JSON.stringify(data));
                        if (Array.isArray(data.members)) {
                            setMemberships(data.members);
                            setLoading(false);
                        } else {
                            setMemberships([]);
                            setLoading(false);
                        }
                    })
            } catch (error) {
                console.error("Error fetching memberships:", error);
            }
        }
    }, [activeTab])


    async function handleUnsubscribe(creatorId) {
        try {
            const res = await fetch("/api/membership", {
                method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ creatorId })
            });

            const data = await res.json();

            if (res.ok) {
                setMemberships((prev) => {
                    prev.filter(m => m.creator._id !== creatorId);
                });
            } else {
                console.error("Failed to unsubscribe:", data.message);
            }

        } catch (error) {
            console.error("Unsubscribe error:", error);
        }
    }


    return (
        <>
            <div className="user-main-container">
                <div className={`user-container ${isToggled ? "resized" : ""}`}>
                    <div className="user-sidebar-container">
                        <Sidebar />
                    </div>

                    <div className="user-content-container">
                        <div className="setting-container">
                            <div className="setting-title">
                                Settings
                            </div>

                            <div className="setting-navs">
                                <ul className='setting-nav'>
                                    {["Basics", "Account", "Email notifications", "Memberships"].map((tab) => (<li key={tab} className='setting-link'>
                                        <button onClick={() => setActiveTab(tab)} className={`btn-setting ${activeTab === tab ? "active" : ""}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button></li>))}
                                </ul>
                            </div>

                            <div className="setting-navs-content">
                                {activeTab === "Basics" && <div className="setting-content">
                                    <div className="content-title">Profile information</div>
                                    <form className='mt-4'>
                                        <div className="setting-profile">
                                            <div className="setting-profile-title">Profile</div>
                                            <div className="flex items-center gap-4">
                                                <div className="setting-profile-img">
                                                    <Image src={settingImg} width={0} height={0} sizes="100" alt="user profile picture" />
                                                </div>

                                                <div className="setting-profile-btn">
                                                    <input type="file" accept='image/*' hidden id='settingProfileImg' onChange={handleFileChange} />
                                                    <button type='button' className='btn-upload' onClick={() => document.getElementById("settingProfileImg").click()}>Upload photo</button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <label>Display name</label>
                                                <input type="text" className="custom-input" placeholder='Your name' name="username" />
                                            </div>

                                            <div className="mt-6">
                                                <label>Email</label>
                                                <input type="email" className="custom-input" placeholder='Your email' name="username" />
                                            </div>

                                            <div className="mt-5">
                                                <label>Country of Residence</label>
                                                <input className="custom-input"
                                                    name="phone"
                                                    placeholder="Enter State"
                                                />
                                            </div>

                                            <div className="mt-8">
                                                <input type='submit' className='btn-sumit'
                                                    value={"Sumbit"}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                }

                                {activeTab === "Account" && <div className="setting-content"> <div className="content-title">Login</div>
                                    <form className='mt-4'>
                                        <div className="setting-profile">
                                            <div className="setting-profile-title">Profile</div>
                                            <div className="flex items-center gap-4">
                                                <div className="setting-profile-img">
                                                    <Image src={settingImg} width={0} height={0} sizes="100" alt="user profile picture" />
                                                </div>

                                                <div className="setting-profile-btn">
                                                    <input type="file" accept='image/*' hidden id='settingProfileImg' onChange={handleFileChange} />
                                                    <button type='button' className='btn-upload' onClick={() => document.getElementById("settingProfileImg").click()}>Upload photo</button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <label>Display name</label>
                                                <input type="text" className="custom-input" placeholder='Your name' name="username" />
                                            </div>

                                            <div className="mt-6">
                                                <label>Email</label>
                                                <input type="email" className="custom-input" placeholder='Your email' name="username" />
                                            </div>

                                            <div className="mt-5">
                                                <label>Country of Residence</label>
                                                <input className="custom-input"
                                                    name="phone"
                                                    placeholder="Enter State"
                                                />
                                            </div>

                                            <div className="mt-8">
                                                <input type='submit' className='btn-sumit'
                                                    value={"Sumbit"}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                }

                                {activeTab === "Email notifications" && <div className="setting-content">
                                    <div className="content-title">General</div>
                                    <form className='mt-4'>
                                        <div className="setting-profile">
                                            <div className="setting-profile-title">Profile</div>
                                            <div className="flex items-center gap-4">
                                                <div className="setting-profile-img">
                                                    <Image src={settingImg} width={0} height={0} sizes="100" alt="user profile picture" />
                                                </div>

                                                <div className="setting-profile-btn">
                                                    <input type="file" accept='image/*' hidden id='settingProfileImg' onChange={handleFileChange} />
                                                    <button type='button' className='btn-upload' onClick={() => document.getElementById("settingProfileImg").click()}>Upload photo</button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <label>Display name</label>
                                                <input type="text" className="custom-input" placeholder='Your name' name="username" />
                                            </div>

                                            <div className="mt-6">
                                                <label>Email</label>
                                                <input type="email" className="custom-input" placeholder='Your email' name="username" />
                                            </div>

                                            <div className="mt-5">
                                                <label>Country of Residence</label>
                                                <input className="custom-input"
                                                    name="phone"
                                                    placeholder="Enter State"
                                                />
                                            </div>

                                            <div className="mt-8">
                                                <input type='submit' className='btn-sumit'
                                                    value={"Sumbit"}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>}

                                {activeTab === "Memberships" && <div className="setting-content">
                                    <div className="setting-content">
                                        <div className="content-title mb-5">Memberships</div>

                                        {loading ? (<div className='flex justify-center items-center gap-3 my-10'>
                                            <div className='loader dark'></div>
                                        </div>
                                        ) :
                                            (!memberships && memberships.length === 0 ? (
                                                <p>You haven’t subscribed to any creators yet.</p>
                                            ) : (
                                                <ul className="membership-list flex flex-col gap-5">
                                                    {memberships.map((e) => (
                                                        <li key={e._id} className="membership-item flex justify-between items-center gap-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className='creator-member-img'>
                                                                    <Image
                                                                        src={e.creator?.profilepic || "/assets/images/user/default-user.png"}
                                                                        alt={e.creator?.username || "Creator"}
                                                                        width={0}
                                                                        height={0}
                                                                        sizes='100%'
                                                                    />
                                                                </div>
                                                                <span>{e.creator?.name || e.creator?.username}</span>
                                                            </div>

                                                            <button className='w-9 cursor-pointer bg-red-500 h-9 flex justify-center items-center rounded-full' onClick={() => handleUnsubscribe(e.creator?._id)} title='UnSubscribe'>
                                                                <MdDeleteOutline className='text-white text-lg' />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ))}
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Setting