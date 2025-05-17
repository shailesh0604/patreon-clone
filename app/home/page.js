"use client"
import { useEffect, useRef, useState } from "react";
import React from 'react'
import { AuroraBackground } from "@/Components/LinearBb";
import Sidebar from "@/Components/Sidebar";
import Creators from "@/Components/Creators";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Home = () => {

    // const session = await getServerSession(authOptions);

    // if (!session) redirect("/login");


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