"use client"
import React from 'react'
import Sidebar from "@/Components/Sidebar";
import useSidebarStore from "@/lib/store/sidebarStore";
import UserInfo from "@/Components/User/UserInfo";

const UserContent = ({ userData }) => {
    const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand
    return <>
        <div className="user-main-container">
            <div className={`user-container ${isToggled ? "resized" : ""}`}>
                <div className="user-sidebar-container">
                    <Sidebar />
                </div>

                <div className="user-content-container logged-user">
                    <UserInfo userData={userData} />
                </div>
            </div>
        </div>
    </>

}

export default UserContent