
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const Sidebar = ({ toggle, IsToggled }) => {

    const { data: session, status } = useSession();
    // console.log("session :", session);

    const pathName = usePathname();
    return (
        <>
            <div className="sidebar-content">
                <div className="sidebar-menu">
                    <HiMenuAlt3 className="invert" />
                </div>
                <Link href={"/home"} className="sidebar-logo">
                    <Image src={"/assets/images/logo/logo2.svg"} className="invert" width={25} height={25} alt="logo" />
                </Link>
            </div>

            <div className="sidebar-links-content">
                <div className="sidebar-links">
                    <Link href={"/home"} className={`sidebar-link ${pathName === "/home" ? "active" : ""}`}>
                        <span className="link-icon">
                            <AiFillHome />
                        </span>
                        <span className="link-txt">Home</span>
                    </Link>

                    <Link href={"/search"} className={`sidebar-link ${pathName === "/search" ? "active" : ""}`}>
                        <span className="link-icon">
                            <IoSearch />
                        </span>
                        <span className="link-txt">Find creators</span>
                    </Link>

                    <Link href={"/community"} className={`sidebar-link ${pathName === "/community" ? "active" : ""}`}>
                        <span className="link-icon">
                            <IoIosChatbubbles />
                        </span>
                        <span className="link-txt">Community</span>
                    </Link>

                    <Link href={"/notification"} className={`sidebar-link ${pathName === "/notification" ? "active" : ""}`}>
                        <span className="link-icon">
                            <FaBell />
                        </span>
                        <span className="link-txt">Notifications</span>
                    </Link>

                    <Link href={"/setting"} className={`sidebar-link ${pathName === "/setting" ? "active" : ""}`}>
                        <span className="link-icon">
                            <IoSettingsSharp />
                        </span>
                        <span className="link-txt">Settings</span>
                    </Link>


                </div>

                <div className="sidebar-user-links">
                    <div className="user-link">
                        <div className="user-info flex items-center gap-3">
                            <div className="user-profile-pic">
                                <Image src={session?.user?.image || "/assets/images/user/default-user.png"} width={0} height={0} sizes="100" alt="user profile picture" />
                            </div>

                            <div className="user-name-content">
                                <div className="user-name">{session?.user?.name || "user"}</div>
                                <div className="user-status">Member</div>
                            </div>
                        </div>

                        <div className="user-drop">
                            <MdMoreVert />

                            <div className="user-more-content">
                                <div className="btn-logout" onClick={() => signOut({ callbackUrl: "/" })}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`toggle-icon ${toggle ? "" : "rotate"}`} title={`${toggle ? "open menu" : "close menu"}`} onClick={IsToggled}>
                <IoIosArrowForward />
            </div>

            <div className="mobile-user-content-div">
                <div className="user-profile-pic">
                    <Image src={session?.user?.image || "/assets/images/user/default-user.png"} width={0} height={0} sizes="100" alt="user profile picture" />
                </div>
            </div></>
    )
}

export default Sidebar