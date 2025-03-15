"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const Login = () => {

    // const { data: session, status } = useSession();
    // const router = useRouter();

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         router.push("/home");
    //     }
    // }, [status, router]);


    if (status === "loading") {
        return <div className="text-white text-center">Loading...</div>; // Show a loader or placeholder
    }


    return (
        <>
            <section className="relative ">
                <div className="flex justify-center bg-black items-center w-full h-screen">
                    <div className="max-w-[90%] w-[25rem]">
                        <div>
                            <Image
                                src={"assets/images/logo/logo2.svg"}
                                className="invert mx-auto"
                                width={50}
                                height={50}
                                sizes="100"
                                alt="logo"
                            />
                        </div>
                        <div className="login-title text-center text-white mt-5 mb-6 font-medium text-2xl">
                            Log in or sign up
                        </div>
                        <div className="flex flex-col gap-3 ">
                            <Link
                                href={"/"} onClick={() => signIn('google')}
                                className="bg-white flex justify-center items-center gap-1 text-black px-2 py-1.5 rounded-[4px]"
                            >
                                <span>
                                    <Image src={"/assets/images/icons/google.svg"} width={30} height={30} alt="login" />
                                </span>
                                <span className="font-semibold text-sm">
                                    Continue with Google
                                </span>
                            </Link>

                            <Link
                                href={"/"} onClick={() => signIn('github')}
                                className="bg-white flex justify-center items-center gap-1 text-black px-2 py-1.5 rounded-[4px]"
                            >
                                <span>
                                    <Image
                                        src={"/assets/images/icons/github-30.svg"}
                                        width={30}
                                        height={30}
                                        alt="login"
                                    />
                                </span>
                                <span className="font-semibold text-sm">Continue with GitHub</span>
                            </Link>

                            <Link
                                href={"/"}
                                className="bg-white flex justify-center items-center gap-1 text-black px-2 py-1.5 rounded-[4px]"
                            >
                                <span>
                                    <Image src={"/assets/images/icons/apple.svg"} width={30} height={30} alt="login" />
                                </span>

                                <span className="font-semibold text-sm">Continue with Apple</span>
                            </Link>
                        </div>
                        <div className="opacity-60 text-center my-2 text-white">or</div>

                        <div className="flex flex-col gap-3">
                            <div className="">
                                <input
                                    type="email"
                                    className="w-full outline-none font-normal bg-[#363636] text-white rounded-md px-2 py-2.5 placeholder:text-white placeholder:opacity-80"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="">
                                <Link href={"/"} className="block w-full font-semibold text-center bg-white text-black px-2 py-2.5 rounded-md">
                                    Continue
                                </Link>
                            </div>
                        </div>

                        <div className="">
                            <Link href={"/"} className="text-white text-center block mt-6 opacity-65 font-semibold text-sm">Need help signing in?</Link>
                        </div>
                    </div>
                </div>

                {/* 
                <div className="login-footer absolute left-2/4">
                    <div className="">By signing up, you are creating a Patreon account and agree to Patreon’s Terms and Privacy Policy</div>
                </div> */}

            </section>
        </>
    );
};

export default Login;
