"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/css/style.css";

import React from 'react'

const Home = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {

        if (!session) {
            router.push("/");
        }


        if (status === "unauthenticated") {
            router.push("/home");
        }
    }
        , [status, router]);

    return <>
        <div>Home</div>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </>

}

export default Home