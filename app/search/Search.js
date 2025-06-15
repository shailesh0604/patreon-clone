"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react'
import { AuroraBackground } from "@/Components/LinearBb";
import { usePathname } from "next/navigation";
import Sidebar from "@/Components/Sidebar";
import Creators from "@/Components/Creators";
import useSidebarStore from '@/lib/store/sidebarStore'

const Search = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {

        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);


    const pathName = usePathname();
    //console.log(pathName)


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

export default Search