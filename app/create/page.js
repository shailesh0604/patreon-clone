"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Create = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/login");
    //     }

    //     console.log(session.user.name)


    // }, [status, router])

    return (
        <>
            <section className='section-create'>
                <div className="create-container">
                    <div className="create-form-content">
                        <div className="logo">
                            <Image src={"/assets/images/logo/logo2.svg"} width={30} height={30} alt='logo' />
                        </div>

                        <div className="flex justify-center items-center flex-col h-[calc(100%-50px)] max-w-96 mx-auto">
                            <h2 className='create-title'>Let’s name your page</h2>
                            <p className='create-subtitle'>You can get creative or start with your name. Don’t worry, you can always change this later.</p>
                            <div className="flex items-baseline gap-2 mt-8 mb-6">
                                <input type="checkbox" name="" id="adult" />
                                <label htmlFor="adult" className=''>My page isn’t suitable for people under 18</label>
                            </div>

                            <div className="w-full">
                                <input type="text" className='border-2 outline-4 outline-black bg-transparent out rounded-md block w-full px-2 py-2' placeholder='your creator name' />
                                <button className='bg-black text-white w-full px-1 py-2 rounded-md mt-5'>Continue</button>
                            </div>
                        </div>
                    </div>
                    <div className="create-img-content">
                        <div className="create-img">
                            <Image src={"/assets/images/concierge_name.png"} width={0} height={0} sizes='100' alt='creator image' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Create