"use client"
import { useEffect, useRef, useState } from "react";
import React from 'react'
import { AuroraBackground } from "@/Components/LinearBb";
import Sidebar from "@/Components/Sidebar";
import Creators from "@/Components/Creators";
// import { Metadata } from "next";

// export const Metadata = {
//     title: 'Home | Patreon',
//     description: '...',
// }

const Home = () => {

    const [toggle, setToggle] = useState(false)

    const IsToggled = () => {
        setToggle((toggled) => !toggled);

    }


    return <>
        <div className="user-main-container">
            <div className={`user-container ${toggle ? "resized" : ""}`}>
                <div className="user-sidebar-container">
                    <Sidebar toggle={toggle} IsToggled={IsToggled} />
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