// sidebarLinks.js

import { AiFillHome } from "react-icons/ai";
import { IoSearch, IoSettingsSharp } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { MdCreate } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiMiniChartBar } from "react-icons/hi2";
import { MdPayments } from "react-icons/md"
import { AiFillThunderbolt } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import { RiDashboardFill } from "react-icons/ri";



export default function useSidebarLinks() {
    const { data: session } = useSession();
    const patreonUsername = session?.user?.patreon_account_username;


    // Links for members
    const memberLinks = [
        { href: "/home", icon: <AiFillHome />, text: "Home" },
        { href: "/search", icon: <IoSearch />, text: "Find creators" },
        { href: "/community", icon: <IoIosChatbubbles />, text: "Community" },
        { href: "/notification", icon: <FaBell />, text: "Notifications" },
        { href: "/setting", icon: <IoSettingsSharp />, text: "Settings" },
    ];

    // Links for creators
    const creatorLinks = [
        { href: `/c/${patreonUsername}`, icon: <RiDashboardFill />, text: "Dashboard" },
        { href: "/library", icon: <MdLibraryBooks />, text: "Library" },
        { href: "/members", icon: <FaUsers />, text: "Audience" },
        { href: "/insights", icon: <HiMiniChartBar />, text: "Insights" },
        { href: "/payouts", icon: <MdPayments />, text: "Payouts" },
        { href: "/promotions", icon: <AiFillThunderbolt />, text: "Promotions" },
        { href: "/community", icon: <IoIosChatbubbles />, text: "Community" },
        { href: "/notification", icon: <FaBell />, text: "Notification" },
        { href: "/setting", icon: <IoSettingsSharp />, text: "Settings" },
    ];

    return { memberLinks, creatorLinks };

}
