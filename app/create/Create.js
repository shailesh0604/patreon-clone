"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useRouter } from 'next/navigation';

const Create = () => {
    // const { data: session, status } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/login");
    //     }

    // }, [status, router])


    const [form, setForm] = useState("");
    const [error, setError] = useState(form);
    const [isValid, setIsValid] = useState(false)
    const [showSecondForm, setShowSecondForm] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const sanitizeUsername = (name) => {
        return name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
    };

    const debounceRef = useRef();

    const handleChange = (e) => {
        setForm(e.target.value);
        if (error) setError("");
        // console.log(form);
    }




    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.trim().length < 4) {
            setError("creator name must be at least 4 characters");
            return;
        }

        setIsValid(true);

        console.log("form submitted :", form)

        const timer = setTimeout(() => {
            setShowSecondForm(true);
        }, 1000);

        checkUsername(form);

        return () => clearTimeout(timer); // cleanup on unmount


    }

    const goBack = () => {
        setShowSecondForm(false);
        setIsValid(false);
        setMessage('');
    }

    const handleSubmitDB = async (e) => {
        e.preventDefault();


        if (form.trim().length < 4) {
            setError("creator name must be at least 4 characters");
            return;
        }

        console.log(form);

        try {
            const cleanUsername = sanitizeUsername(form);
            const res = await fetch("/api/update-username", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: cleanUsername }), //Sanitizing Username on Client Side
            });

            const data = await res.json();
            console.log(data);


            if (!res.ok) {
                setMessage(`❌ ${data.message}`);
                return;
            }

            setMessage('✅ Username updated successfully!');
            console.log('Username updated in DB');


            router.push(`/c/${form}`);

        } catch (error) {
            setMessage('❌ Failed to update username');
            console.error(error);
        }

    }

    const checkUsername = async (value) => {

        setLoading(true);
        setMessage('');


        // Clear previous timer
        clearTimeout(debounceRef.current);

        // Start new debounce timer (500ms)
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch("/api/get-username", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: value }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Error checking username');
                }

                setMessage(data.exists ? '❌ Username already taken' : '✅ Username is available');
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms delay
    }

    return (
        <>
            <section className='section-create'>
                <div className="create-container">
                    <div className="create-form-content">
                        <div className="logo">
                            <Image src={"/assets/images/logo/logo2.svg"} width={30} height={30} alt='logo' />
                        </div>

                        {!showSecondForm ? (
                            <form className="flex justify-center items-center flex-col h-[calc(100%-50px)] max-w-96 mx-auto" onSubmit={handleSubmit}>
                                <h2 className='create-title'>Let’s name your page</h2>
                                <p className='create-subtitle'>You can get creative or start with your name. Don’t worry, you can always change this later.</p>
                                <div className="flex items-baseline gap-2 mt-8 mb-6">
                                    <input type="checkbox" name="" id="adult" />
                                    <label htmlFor="adult" className=''>My page isn’t suitable for people under 18</label>
                                </div>

                                <div className="w-full">
                                    <input type="text" onChange={handleChange} value={form} className='border-2 outline-4 outline-black bg-transparent out rounded-md block w-full px-2 py-2' placeholder='your creator name' />
                                    <label className='text-red-500 text-xs inline-block mt-1'>{error}</label>
                                    <button type='submit' className='bg-black flex justify-center items-center gap-2 text-white w-full px-1 py-2 rounded-md mt-3' disabled={isValid ? true : false}><span className={isValid ? "hidden" : "block"}>Continue</span>
                                        <div className={isValid ? "block" : "hidden"}>
                                            <span className='flex items-center justify-center'>
                                                <Loader size="sm" speed="fast" />
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        )
                            :
                            (
                                <form className="flex justify-center items-center flex-col h-[calc(100%-50px)] max-w-96 mx-auto" method='POST' onSubmit={handleSubmitDB}>
                                    <h2 className='create-title'>Choose your URL</h2>
                                    <p className='create-subtitle mb-5'>You can always change this later.</p>
                                    <div className="flex items-center border-2 outline-4 outline-black bg-transparent rounded-md w-full px-2 py-2 relative">
                                        <div className="domain opacity-70 text-sm font-medium">domain/</div>
                                        <input type="text" onChange={(e) => {
                                            setForm(e.target.value);
                                            checkUsername(e.target.value);
                                        }} value={form} className='outline-none text-sm font-medium w-full pl-2.5 pr-10' />
                                        <div className="absolute right-0 top-2/4 -translate-x-2/4 -translate-y-2/4">
                                            {loading ? (<div className="">
                                                <span className='flex items-center justify-center'>
                                                    <Loader size="sm" speed="fast" className='black' />
                                                </span>
                                            </div>
                                            ) : message === "✅ Username is available" ? (<div className="">
                                                <Image src={"/assets/images/icons/tick.svg"} className='text-green-500' width={25} height={25} alt='correct' />
                                            </div>
                                            ) : null
                                            }

                                        </div>
                                    </div>
                                    {message && <label className='inline-block w-full mt-2 text-sm'>{message}</label>}
                                    <button type='submit' disabled={message === "✅ Username is available" ? false : true} className='bg-black flex justify-center items-center gap-2 text-white w-full px-1 py-2 rounded-md mt-3'>Continue
                                    </button>

                                    <button type='button' onClick={() => goBack()} className='bg-slate-100 border border-slate-200 flex justify-center items-center gap-2 text-black w-full px-1 py-2 rounded-md mt-3'>Back
                                    </button>
                                </form>
                            )
                        }
                    </div>

                    <div className="create-img-content">
                        {!showSecondForm ? (
                            <div className="create-img">
                                <Image src={"/assets/images/concierge_name.png"} width={0} height={0} sizes='100' alt='creator image' />
                            </div>
                        ) :
                            (
                                <div className="create-img">
                                    <Image src={"/assets/images/concierge_url.png"} width={0} height={0} sizes='100' alt='creator image' />
                                </div>
                            )
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

export default Create