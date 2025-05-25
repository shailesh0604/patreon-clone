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
    { href: "/home", icon: <AiFillHome />, text: "Home2" },
    { href: "/create", icon: <MdCreate />, text: "Create Content2" },
    { href: "/community", icon: <IoIosChatbubbles />, text: "Community2" },
    { href: "/notification", icon: <FaBell />, text: "Notifications2" },
    { href: "/setting", icon: <IoSettingsSharp />, text: "Settings2" },
];
