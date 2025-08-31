"use client"
import { useEffect, useRef, useState } from "react";
import React from 'react'
import Sidebar from "@/Components/Sidebar";
import useSidebarStore from "@/lib/store/sidebarStore";
// import { Metadata } from "next";

// export const Metadata = {
//     title: 'Home | Patreon',
//     description: '...',
// }

const Promotions = () => {

    const { isToggled } = useSidebarStore(); // get the global toggle state from Zustand


    return <>
        <div className="user-main-container">
            <div className={`user-container ${isToggled ? "resized" : ""}`}>
                <div className="user-sidebar-container">
                    <Sidebar isCreator={true} />
                </div>

                <div className="user-content-container">

                </div>
            </div>
        </div>
    </>

}

export default Promotions;