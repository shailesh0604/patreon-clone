"use client"
import { useEffect, useRef, useState } from "react";
import React from 'react'
import { AuroraBackground } from "@/Components/LinearBb";
import Sidebar from "@/Components/Sidebar";
import Creators from "@/Components/Creators";
import useSidebarStore from "@/lib/store/sidebarStore";
// import { Metadata } from "next";

// export const Metadata = {
//     title: 'Home | Patreon',
//     description: '...',
// }

const Home = () => {

    const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand


    return <>
        <div className="user-main-container">
            <div className={`user-container ${isToggled ? "resized" : ""}`}>
                <div className="user-sidebar-container">
                    <Sidebar />
                </div>

                <div className="user-content-container">
                    <AuroraBackground>
                        <Creators />
                    </AuroraBackground>
                </div>
            </div>
        </div>
    </>

}

export default Home