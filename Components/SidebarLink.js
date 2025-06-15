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


// Links for members
export const memberLinks = [
    { href: "/home", icon: <AiFillHome />, text: "Home" },
    { href: "/search", icon: <IoSearch />, text: "Find creators" },
    { href: "/community", icon: <IoIosChatbubbles />, text: "Community" },
    { href: "/notification", icon: <FaBell />, text: "Notifications" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Settings" },
];

// Links for creators
export const creatorLinks = [
    { href: "/home", icon: <AiFillHome />, text: "My page" },
    { href: "/create", icon: <MdLibraryBooks />, text: "Library" },
    { href: "/community", icon: <FaUsers />, text: "Audience" },
    { href: "/notification", icon: <HiMiniChartBar />, text: "Insights" },
    { href: "/setting", icon: <MdPayments />, text: "Payouts" },
    { href: "/setting", icon: <AiFillThunderbolt />, text: "Promotions" },
    { href: "/setting", icon: <IoIosChatbubbles />, text: "Community" },
    { href: "/setting", icon: <FaBell />, text: "Notification" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Settings" },
];
