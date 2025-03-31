"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Sidebar from '@/Components/Sidebar'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"

const Setting = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const [toggle, setToggle] = useState(false)

    const IsToggled = () => {
        setToggle((toggled) => !toggled)
    }



    const [settingImg, setSettingImg] = useState("/assets/images/user/default-user.png")

    const [activeTab, setActiveTab] = useState('Basics');


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


    return (
        <>
            <div className="user-main-container">
                <div className={`user-container ${toggle ? "resized" : ""}`}>
                    <div className="user-sidebar-container">
                        <Sidebar toggle={toggle} IsToggled={IsToggled} />
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
                                    <div className="content-title">Memberships</div>
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

                            </div>

                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Setting