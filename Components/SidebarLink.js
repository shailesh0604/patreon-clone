// sidebarLinks.js

import { AiFillHome } from "react-icons/ai";
import { IoSearch, IoSettingsSharp } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { MdCreate } from "react-icons/md";

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
    { href: "/create", icon: <MdCreate />, text: "Library" },
    { href: "/community", icon: <IoIosChatbubbles />, text: "Audience" },
    { href: "/notification", icon: <FaBell />, text: "Insights" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Payouts" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Promotions" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Community" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Notification" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Settings" },
];
