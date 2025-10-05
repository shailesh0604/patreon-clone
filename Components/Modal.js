"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { IoCloseOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa6";

const Modal = ({ message, status }) => {
    const [showModal, setShowModal] = useState(true);
    const handledModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <div className={`modal-container ${showModal ? "show" : ""}`}>
                <div className="modal-header flex justify-between items-center gap-2 pt-6 pr-4 pb-2 pl-6">
                    <div className="logo flex items-center gap-2">
                        <Image src={"/assets/images/logo/logo2.svg"} width={30} height={30} alt='logo' />
                        <span className='block text-base font-medium'>Patreon Clone</span>
                    </div>


                    <button className='p-2 duration-150 transition-all ease-in rounded-full hover:bg-neutral-300' type='button'><IoCloseOutline className='text-2xl' /></button>
                </div>

                <div className="line"></div>

                <div className="modal-body">
                    <div className="modal-content px-4 pt-2 pb-4">
                        <div className="flex justify-center items-center flex-wrap">
                            {status === "ok" ? (
                                <div className='modal-icon flex items-center gap-1'>
                                    <Image src="/assets/images/icons/success.png" width={40} height={40} alt='status' />
                                    <div className='title text-base font-medium' >Success!!</div>
                                </div>
                            ) :
                                (
                                    <div className='modal-icon flex items-center gap-1'>
                                        <Image src="/assets/images/icons/failed.png" width={40} height={40} alt='status' />
                                        <div className='title text-base font-medium'>Oops, Something went wrong!!</div>
                                    </div>
                                )
                            }
                        </div>

                        <div className="text-center text-balance opacity-90 my-3">{message}</div>

                        <div className="flex justify-center mt-5">
                            <button className='flex items-center gap-2 bg-black py-2 px-4 rounded-md text-white' type='button' onClick={() => handledModal()}>
                                <span><FaThumbsUp className='' /></span>
                                <span>Got it</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Modal