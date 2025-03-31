"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from 'react'
import { IoSearch } from "react-icons/io5";
import { AuroraBackground } from "@/Components/LinearBb";
import { usePathname } from "next/navigation";
import Sidebar from "@/Components/Sidebar";
import Creators from "@/Components/Creators";

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

export default Search