"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from 'react'
import { AuroraBackground } from "@/Components/LinearBb";
import { usePathname } from "next/navigation";
import Sidebar from "@/Components/Sidebar";
import Creators from "@/Components/Creators";

const Home = () => {


    const { data: session, status } = useSession();
    console.log(session);
    const router = useRouter();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            router.push("/");
        }
    }, []);

    const pathName = usePathname();
    //console.log(pathName)

    const [toggle, setToggle] = useState(false)

    const IsToggled = () => {
        setToggle((toggled) => !toggled)
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