import { useState, useEffect, useRef } from "react";
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { RiCloseLargeLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { creatorLinks, memberLinks } from "./SidebarLink";
import useSidebarStore from "@/lib/store/sidebarStore";
import { ImCheckmark } from "react-icons/im";


const Sidebar = () => {

    const { isToggled, toggleSidebar } = useSidebarStore();

    const { data: session, status } = useSession();

    const setUserLetter = useSidebarStore((state) => state.setUserLetter);

    // console.log("session :", session);
    const [showCanvas, setShowCanvas] = useState(false);
    const offcanvasRef = useRef(null);
    const patreonPic = session?.user?.patreon_account_profilepic;
    const isPatreon = session?.user?.patreon_account;
    const isPublished = session?.user?.patreon_account_published;
    const patreonName = session?.user?.patreon_account_name;
    const patreonUsername = session?.user?.patreon_account_username;

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/", // Redirect to homepage
            redirect: true,
        });
    };


    const userRef = useRef(null);

    // useEffect(() => {
    //     const handleOutside = (e) => {
    //         setTimeout(() => {
    //             if (userRef.current && !userRef.current.contains(e.target)) {
    //                 setUserInfoHovered(false);
    //                 setIsHovered(false);
    //             }
    //         }, 100);
    //     };

    //     document.addEventListener("mousedown", handleOutside)

    //     return () => { document.removeEventListener("mousedown", handleOutside) }
    // }, [])


    const [isHovered, setIsHovered] = useState(false);
    const [userInfoHovered, setUserInfoHovered] = useState(false);


    useEffect(() => {
        if (isToggled) {
            setIsHovered(false);
            setUserInfoHovered(false)
        }
    }, [isToggled]);


    useEffect(() => {
        if (session?.user?.name) {
            setUserLetter(session.user.name || session.user.email);
        }
    }, [session, setUserLetter]);


    const userLetter = useSidebarStore((state) => state.userLetter);


    const pathName = usePathname();

    const isCreator = pathName?.startsWith("/c/");

    const linksToShow = isCreator ? creatorLinks : memberLinks;


    return (
        <>
            <div className="relative group top-sidebar">
                <div className="sidebar-content">
                    <div className="sidebar-menu" onClick={() => {
                        setShowCanvas(true);
                    }}>
                        <HiMenuAlt3 className="invert" />
                    </div>
                    <Link href={"/home"} className="sidebar-logo">
                        <Image src={"/assets/images/logo/logo2.svg"} className="invert" width={25} height={25} alt="logo" />
                    </Link>
                </div>

                <div className="sidebar-links-content">
                    <div className="sidebar-links">
                        {linksToShow.map(({ href, icon, text }, index) => (
                            <Link
                                key={index}
                                href={href}
                                className={`sidebar-link ${pathName === href ? "active" : ""}`}
                            >
                                <span className="link-icon">{icon}</span>
                                <span className="link-txt">{text}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="sidebar-user-links">
                        <div className="user-link" ref={userRef}>
                            <div className="user-info relative flex items-center gap-3" onClick={() => setUserInfoHovered(true)}>
                                <div className="user-profile-pic">
                                    <Image src={session?.user?.image || "/assets/images/user/default-user.png"} width={0} height={0} sizes="100" alt="user profile picture" />
                                </div>

                                <div className="user-name-content">
                                    <div className="user-name">{session?.user?.name || "user"}</div>
                                    <div className="user-status">Member</div>
                                </div>

                            </div>

                            <div className="user-drop" onMouseEnter={() => setIsHovered(true)}>
                                <MdMoreVert />
                            </div>
                        </div>

                        {userInfoHovered && (
                            isPublished ? (
                                <div className="create-patreon-container">
                                    <div className="close flex justify-center items-center rounded-full w-[20px] h-[20px] absolute top-2 right-2 z-10 cursor-pointer" onClick={() => setUserInfoHovered(false)}>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Link href={`/c/${patreonUsername}`} className="flex justify-between items-center">
                                            <div className="flex gap-2 items-center text-sm font-medium my-2 ml-2">
                                                <span>
                                                    <Image className="rounded-full object-cover" src={patreonPic} width={35} height={35} alt="user profile pic" />
                                                </span>
                                                <span className="flex flex-col">
                                                    <span className="text-base">{patreonName}</span>
                                                    <span className="text-xs opacity-70">Creator</span>
                                                </span>
                                            </div>
                                            {isCreator && <span className="text-green-600"><ImCheckmark /></span>}
                                        </Link>

                                        <hr />

                                        <Link href={`/home`} className="flex justify-between items-center">
                                            <div className="flex gap-2 items-center text-sm font-medium my-2 ml-2">
                                                <span>
                                                    <Image src={session?.user?.image || "/assets/images/user/default-user.png"} width={35} height={35} className="rounded-full object-cover" sizes="100vw" alt="user profile picture" /></span>
                                                <span className="flex flex-col">
                                                    <span className="text-base">{session?.user?.name || "user"}</span>
                                                    <span className="text-xs opacity-70">Member</span>
                                                </span>
                                            </div>

                                            {!isCreator && <span className="text-green-600"><ImCheckmark /></span>}
                                        </Link>


                                    </div>
                                </div>
                            ) : (
                                isPatreon ? (
                                    <div className="create-patreon-container drop-shadow">
                                        <div className="flex flex-col gap-2">
                                            <Link href={`/c/${patreonUsername}`} className="flex items-center gap-2 font-medium my-2 ml-2">
                                                <span className="w-10 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-md bg-indigo-600">{userLetter}</span>
                                                <span className="flex flex-col">
                                                    <span className="text-base">{patreonName || "Patreon"}</span>
                                                    <span className="text-xs opacity-70">Creator</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (<div className="create-patreon-container drop-shadow">
                                    <div className="flex flex-col gap-2">
                                        <Link href={"/create"} className="flex items-center text-sm font-medium my-2 ml-2">
                                            <span>Create Patreon</span>
                                            <span><GrFormNextLink className="text-lg" /></span>
                                        </Link>
                                    </div>
                                </div>)

                            )

                        )
                        }

                    </div>

                    {(isHovered && !isToggled) && (
                        <div className="user-more-content">
                            <div className="close flex justify-center items-center rounded-full w-[20px] h-[20px] absolute top-2 right-2 z-10 cursor-pointer" onClick={() => setIsHovered(false)}>
                                <IoClose />
                            </div>
                            <div className="appearance-main">
                                <h3 className="appearance-title">Appearance</h3>
                                <div className="appearance-content flex items-baseline justify-between">
                                    <div className="appearance active">Light</div>
                                    <div className="appearance">Dark</div>
                                    <div className="appearance">System</div>
                                </div>
                            </div>

                            <hr className="mt-4 mb-2 block" />

                            <div className="flex flex-col gap-3">
                                <div className="more-c">News</div>
                                <div className="more-c">Creator Hub</div>
                                <div className="more-c">Help center & FAQ</div>
                                <div className="more-c">Terms of Use</div>
                                <div className="more-c">Privacy Policy</div>
                            </div>

                            <hr className="mt-4 mb-2 block" />


                            <button type="button" className="btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <div className={`toggle-icon ${isToggled ? "" : "rotate"}`} title={`${isToggled ? "open menu" : "close menu"}`} onClick={toggleSidebar}>
                    <IoIosArrowForward />
                </div>

                <div className="mobile-user-content-div">
                    <div className="user-profile-pic">
                        <Image src={session?.user?.image || "/assets/images/user/default-user.png"} width={0} height={0} sizes="100" alt="user profile picture" />
                    </div>

                    <div className="user-profile-link">
                        {
                            isPublished ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <Link href={`/c/${patreonUsername}`} className="flex gap-2 items-center text-sm font-medium my-2 ml-2">
                                            <span>
                                                <Image className="rounded-full object-cover" src={patreonPic} width={35} height={35} alt="user profile pic" />
                                            </span>
                                            <span className="flex flex-col">
                                                <span className="text-base">{patreonName}</span>
                                                <span className="text-xs opacity-70">Creator</span>
                                            </span>
                                        </Link>

                                        {isCreator && <span className="text-green-600"><ImCheckmark /></span>}
                                    </div>
                                    <hr />

                                    <div className="flex items-center justify-between">
                                        <Link href={`/home`} className="flex gap-2 items-center text-sm font-medium my-2 ml-2">
                                            <span>
                                                <Image src={session?.user?.image || "/assets/images/user/default-user.png"} width={35} height={35} className="rounded-full object-cover" sizes="100vw" alt="user profile picture" /></span>
                                            <span className="flex flex-col">
                                                <span className="text-base">{session?.user?.name || "user"}</span>
                                                <span className="text-xs opacity-70">Member</span>
                                            </span>
                                        </Link>

                                        {!isCreator && <span className="text-green-600"><ImCheckmark /></span>}

                                    </div>
                                </div>
                            ) : (
                                isPatreon ? (
                                    <div className="create-patreon-container drop-shadow">
                                        <div className="flex flex-col gap-2">
                                            <Link href={`/c/${patreonUsername}`} className="flex items-center gap-2 font-medium my-2 ml-2">
                                                <span className="w-10 h-10 flex justify-center items-center text-white font-semibold text-lg rounded-md bg-indigo-600">{userLetter}</span>
                                                <span className="flex flex-col">
                                                    <span className="text-base">{patreonName || "Patreon"}</span>
                                                    <span className="text-xs opacity-70">Creator</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (<div className="create-patreon-container drop-shadow">
                                    <div className="flex flex-col gap-2">
                                        <Link href={"/create"} className="flex items-center text-sm font-medium my-2 ml-2">
                                            <span>Create Patreon</span>
                                            <span><GrFormNextLink className="text-lg" /></span>
                                        </Link>
                                    </div>
                                </div>)

                            )
                        }

                        <hr />

                        <div className="mx-auto mt-3 mb-3">
                            <button className="text-center w-full" onClick={handleLogout}>Logout</button >
                        </div>
                    </div>
                </div>
            </div >


            {/* sidebar offcanvas */}


            <div
                className={`offcanvas-container ${showCanvas ? "show" : ""}`
                }
                ref={offcanvasRef}
            >
                <div className="offcanvas-content px-3">
                    <div className="offcanvas-header flex justify-between items-center pt-4">
                        <div className="offcanvas-logo">
                            <Link href={"/"}>
                                <Image
                                    src={"/assets/images/logo/logo.svg"}
                                    width={150}
                                    className="block mx-auto cursor-pointer"
                                    height={150}
                                    alt="logo"
                                />
                            </Link>
                        </div>

                        <div
                            className="offcanvas-close cursor-pointer"
                            onClick={() => {
                                setShowCanvas(false);
                            }}
                        >
                            <RiCloseLargeLine className="text-xl invert" />
                        </div>
                    </div>

                    <div className="offcanvas-links">
                        <div className="offcanvas-links-content">

                            {linksToShow.map(({ href, text, icon }, index) => (
                                <div className="offcanvas-link" key={index}>
                                    <Link
                                        key={index}
                                        href={href}
                                        onClick={() => {
                                            setShowCanvas(true);
                                        }}
                                        className={`sidebar-link flex items-center ${pathName === href ? "active" : ""}`}
                                    >
                                        <span className="link-icon">{icon}</span>
                                        <span className="link-txt">{text}</span>
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div >
            {/* sidebar offcanvas */}
        </>
    )
}

export default Sidebar