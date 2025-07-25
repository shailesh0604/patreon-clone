"use client"

import CommunityTabs from '@/Components/CommunityTabs'
import Sidebar from '@/Components/Sidebar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import useSidebarStore from '@/lib/store/sidebarStore'



const Community = () => {


    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand

    return (
        <>
            <div className="user-main-container">
                <div className={`user-container ${isToggled ? "resized" : ""}`}>
                    <div className="user-sidebar-container">
                        <Sidebar />
                    </div>

                    <div className="user-content-container">
                        <div className="community-content-container">
                            <div className="community-content">
                                <div className="community-header">
                                    <div className="community-title">
                                        Community
                                    </div>
                                </div>
                            </div>

                            <div className="nav-tab-content">
                                <CommunityTabs />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community