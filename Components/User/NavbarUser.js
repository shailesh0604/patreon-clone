import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiSearch } from "react-icons/fi";

const NavbarUser = () => {
    return (
        <>
            <header className='shadow-lg fixed top-0 w-full bg-white z-10'>
                <nav className="flex justify-between px-6 py-3">
                    <Link className="logo flex justify-center items-center" href={"/"}>
                        <Image src={"/assets/images/logo/logo2.svg"} className='block' width={25} height={25} alt='logo' />
                    </Link>

                    <div className="user-login-links flex items-center gap-4">
                        <div className="find-user relative">
                            <div className="search-icon absolute top-2/4 left-4 -translate-x-1/2 -translate-y-1/2"><FiSearch /></div>
                            <input type="text" className="border-2 pl-8 py-1.5 rounded-md overflow-hidden placeholder:text-black placeholder:opacity-85" placeholder="Find a user" />
                        </div>

                        <div className="user-profile-dropdown">
                            <Link href={"/login"}>Login</Link>
                        </div>

                        <div className="btn-primary">
                            <Link href={"/create"}>Create Patreon</Link>
                        </div>

                    </div>

                </nav>
            </header>
        </>
    )
}

export default NavbarUser