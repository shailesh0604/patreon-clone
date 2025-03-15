"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { IoChatbubblesSharp } from "react-icons/io5"
import Link from 'next/link';
import { IoMail } from "react-icons/io5";

const CommunityTabs = () => {
    const [activeTab, setActiveTab] = useState('chats');
    return (
        <>
            <div className="community-nav-tab ">
                <div className="mt-3 mb-4">
                    <ul className="flex gap-4 flex-wrap">
                        {["chats", "Direct Message"].map((tab) => (<li key={tab} className={`nav-tab ${activeTab === tab ? "active" : ""}`} role="presentation">
                            <button onClick={() => setActiveTab(tab)} className="">{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
                        </li>))}
                    </ul>
                </div>

                <div id="default-styled-tab-content">
                    {activeTab === 'chats' && (
                        <div className="w-full h-full flex justify-center min-h-80 items-center">
                            <div className="flex flex-col items-center ">
                                <div className="message-icon">
                                    <IoChatbubblesSharp className='icon' />
                                </div>
                                <div className="message-txt">
                                    <p className='text-center'>When you have new chats from creators,</p>
                                    <p className='text-center'>you’ll see them here.</p>
                                </div>

                                <div className="message-desc">
                                    <Link href={"/"}>Learn more</Link>
                                </div>


                            </div>
                        </div>
                    )}
                    {activeTab === 'Direct Message' && (
                        <div className="w-full h-full flex justify-center min-h-80 items-center">
                            <div className="flex flex-col items-center ">
                                <div className="message-icon">
                                    <IoMail  className='icon' />
                                </div>
                                <div className="message-txt">
                                    <p className='text-center'>Send a message to your creators to share your love</p>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default CommunityTabs