"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from '@/Components/Sidebar'
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"

import { IoNotifications } from "react-icons/io5";

const Notification = () => {

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

    return (
        <>
            <div className="user-main-container">
                <div className={`user-container ${toggle ? "resized" : ""}`}>
                    <div className="user-sidebar-container">
                        <Sidebar toggle={toggle} IsToggled={IsToggled} />
                    </div>

                    <div className="user-content-container">
                        <div className="notify-contet">
                            <div className="notify-header">
                                <div className="notify-title">
                                    Notification
                                </div>
                            </div>

                            <div className="w-full  flex justify-center h-80 items-center">
                                <div className="flex flex-col items-center ">
                                    <div className="message-icon">
                                        <IoNotifications className='icon' />
                                    </div>
                                    <div className="message-txt">
                                        <p className='text-center'>When you have new chats from creators,</p>
                                        <p className='text-center'>you’ll see them here.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification