"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineIosShare } from "react-icons/md";
import { RiMoreFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { IoIosStar } from "react-icons/io";
import Blogs from '../Blogs';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';

const UserInfo = ({ userData }) => {
    // console.log(userData)
    const [postCount, setPostCount] = useState(0);
    const [isMember, setIsMember] = useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();
    const memberId = pathname.split("/")[1];
    const creatorId = session?.user?.patreon_account_username;

    useEffect(() => {
        const fetchPostCount = async () => {
            try {
                const res = await fetch(`/api/posts/user/${userData?.patreon_account_username}/count`);
                const data = await res.json();
                // console.log(data);
                setPostCount(data.count || 0);
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        }

        if (userData?.patreon_account_username) {
            fetchPostCount();
        }


    }, [userData]);


    useEffect(() => {
        if (!userData?._id) return;

        if (!session) {
            setIsMember(false);
            return;
        }

        const checkMembership = async () => {
            try {
                const res = await fetch(
                    `/api/membership/check?creatorId=${encodeURIComponent(userData._id)}`
                );
                const data = await res.json();
                // console.log("[UserInfo] membership check response:", data);
                setIsMember(Boolean(data.isMember));
            } catch (err) {
                console.error("[UserInfo] checkMembership error:", err);
                setIsMember(false);
            }
        };

        checkMembership();
    }, [userData?._id, session?.user?.id]);


    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    const handleBecomeMember = async (creatorId, tier) => {

        // console.log(creatorId);
        if (!session) {
            redirect('/login');
        }

        try {

            const resScript = await loadRazorpayScript();
            if (!resScript) {
                alert("Failed to load Razorpay SDK. Are you online?");
                return;
            }


            const amount = tier === "pro" ? 10 : 5;

            const res = await fetch("/api/payment/order",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount }),
                });

            const order = await res.json();


            // console.log("order :", order);

            if (!order.id) throw new Error("Order creation failed");

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Patreon Clone",
                description: `Membership: ${tier}`,
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST", description: `Membership: ${tier}`, body: JSON.stringify({
                            ...response,
                            creatorId,
                            tier,
                            amount: order.amount / 100,
                            currency: order.currency,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    console.log("verify data :", verifyData);
                    if (verifyRes.ok && verifyData.success) {
                        const checkRes = await fetch(`/api/membership/check?creatorId=${creatorId}`);
                        const checkData = await checkRes.json();
                        setIsMember(Boolean(checkData.isMember));
                        alert("Membership activated!");
                    } else {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: session?.user?.name,
                    email: session?.user?.email,
                },
                theme: { color: "#3399cc" },
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed");
        }
    };


    async function handleLeaveMembership(creatorId) {
        try {
            const res = await fetch("/api/membership", {
                method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ creatorId })
            });

            const data = await res.json();

            if (res.ok) {
                // Update local state
                // setMemberships((prev) =>
                //     prev.map((m) =>
                //         m.creator._id === creatorId ? { ...m, status: "cancelled" } : m
                //     )
                // );

                // Re-check membership status immediately
                const checkRes = await fetch(`/api/membership/check?creatorId=${creatorId}`);
                const checkData = await checkRes.json();
                setIsMember(Boolean(checkData.isMember));
            } else {
                console.error("Failed to unsubscribe:", data.message);
            }

        } catch (error) {
            console.error("Unsubscribe error:", error);
        }
    }

    return (
        <>
            <section className='search-user-info'>
                <div className="user-cover-pic">
                    <Image src={userData?.patreon_account_coverpic} width={"0"} height={"0"} sizes='100' alt={"cover pic"} />
                    <div className="user-pic">
                        <Image src={userData?.patreon_account_profilepic} width={0} height={0} sizes="100" alt={"user profile picture"} />
                    </div>

                    <div className="shares">
                        <div className="share">
                            <MdOutlineIosShare />
                        </div>

                        <div className="share">
                            <RiMoreFill />
                        </div>
                    </div>
                </div>

                <div className="user-about">
                    <h2 className='about-name'>{userData?.patreon_account_name}</h2>
                    <p className='about-skill'>{userData?.patreon_account_username_headline}</p>

                    <p className='about-post'>{postCount} Posts</p>

                    <div className="member">
                        {isMember ? (
                            <button onClick={() => handleLeaveMembership(userData?._id)} className="btn-primary">
                                Leave membership
                            </button>
                        ) : (
                            <button onClick={() => handleBecomeMember(userData?._id, "normal")} className="btn-primary">
                                Become a member
                            </button>
                        )}
                    </div>

                    <div className="social-handle flex justify-center items-center gap-3">
                        <Link href={""}>
                            <Image src={"/assets/images/icons/instagram.svg"} width={35} height={35} sizes='100' alt='social media' />
                        </Link>

                        <Link href={""}>
                            <Image src={"/assets/images/icons/x.svg"} width={35} height={35} sizes='100' alt='social media' />
                        </Link>

                        <Link href={""}>
                            <Image src={"/assets/images/icons/youtube.svg"} width={35} height={35} sizes='100' alt='social media' />
                        </Link>

                        <Link href={""}>
                            <Image src={"/assets/images/icons/gmail.svg"} width={35} height={35} sizes='100' alt='social media' />
                        </Link>
                    </div>
                </div>
            </section>


            {!isMember ? (
                <section className='section-membership'>
                    <hr />
                    <div className="container">

                        <div className='member-title'>
                            Choose your membership
                        </div>

                        <div className="member-swiper-container">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                speed={1200}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 10
                                    },
                                    991: {
                                        slidesPerView: 2,
                                        spaceBetween: 20
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                        spaceBetween: 30
                                    },
                                }}
                                pagination={{ clickable: true }}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                <SwiperSlide>
                                    <div className="member-content">
                                        <div className="member-video">
                                            <video width="" height="" autoPlay loop muted preload="none">
                                                <source src="/assets/videos/member.mp4" type="video/mp4" />
                                            </video>
                                        </div>

                                        <div className="px-4 py-5">
                                            <div className="member-txt">
                                                <h2 className="member-txt-1">Normal Membership</h2>
                                                <div className="star"><IoIosStar /></div>
                                            </div>
                                            <div className="member-amount">
                                                <h3 className="amount">$5</h3>
                                                <p>/ month</p>
                                            </div>

                                            <div className="join">
                                                <button className="btn-primary w-full" onClick={() => handleBecomeMember(userData?._id, "normal")}>Join</button>
                                            </div>

                                            <div className="member-about">
                                                Aite so you got a little money in your pocket so you gonna get a little somethin somethin. Lol in this tier you get No Chaser episodes with NO ADS. You get early access to Dudes Behind the Foods.</div>

                                            <div className="member-point">
                                                <ul>
                                                    <li>Patron-only posts and messages</li>
                                                    <li>Early access to Dudes Behind the Foods</li>
                                                    <li>Ad-free episodes of No Chaser</li>
                                                    <li>Submit Questions for No Chaser</li>
                                                    <li>Exclusive voting power</li>
                                                    <li>Behind-the-scenes content</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="member-content">
                                        <div className="member-video">
                                            <video src="/assets/videos/member.mp4" autoPlay loop muted playsInline></video>
                                        </div>

                                        <div className="px-4 py-5">
                                            <div className="member-txt">
                                                <h2 className="member-txt-1">Pro Membership</h2>
                                                <div className="star"><IoIosStar /> <IoIosStar /> <IoIosStar /></div>
                                            </div>
                                            <div className="member-amount">
                                                <h3 className="amount">$10</h3>
                                                <p>/ month</p>
                                            </div>

                                            <div className="join">
                                                <button className="btn-primary w-full" onClick={() => handleBecomeMember(userData?._id, "pro")}>Join</button>
                                            </div>

                                            <div className="member-about">
                                                it's gonna live EXCLUSIVELY on Patreon for like special for yall. ALSO, Imma force Chia to do a bi-monthly podcast which will ALSO live ONLY on Patreon! GODDAMNNN!!! And of course a bunch of BTS footage from all the things.
                                            </div>

                                            <div className="member-point">
                                                <ul>
                                                    <li>Exclusive Sticker</li>
                                                    <li>Ad-free episodes of No Chaser</li>
                                                    <li>Everything from the Dollar Menu</li>
                                                    <li>Exclusive content - Brand New Shows</li>
                                                    <li>Behind-the-scenes content</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </section>
            ) :
                (<div className='my-8 text-center font-medium'>Congratulations!, You are already a member.</div>)
            }

            <hr />

            <Blogs username={userData} isMember={isMember} />

        </>
    )
}

export default UserInfo