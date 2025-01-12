import React from 'react'
import Image from "next/image";
import { motion, inView, useInView, stagger } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

const HomeBanner = () => {


    const ref = useRef(null)
    const isInView = useInView(ref);


    useEffect(() => {
        console.log("Element is in view: ", isInView)
    }, [isInView])


    const dataSets = [
        {
            banner: {
                image: "/assets/videos/user2.mp4",
                alt: "Banner 4",
            },
            user: {
                username: "Real Ones",
                image: "/assets/images/user/user1.jpg",
                desc: "Elliott Wilson is building community around hip-hop journalism."
            },
            titles: ["Speak", "volumes"]
        },
        {
            banner: {
                image: "/assets/images/banner/banner1.jpg",
                alt: "Banner 1",
            },
            user: {
                username: "John Doe",
                image: "/assets/images/user/user2.jpg",
                desc: "John is a creative artist who loves painting and sculpture."
            },
            titles: ["Discover Art", "Create Magic"]
        },
        {
            banner: {
                image: "/assets/videos/user.mp4",
                alt: "Banner 4",
            },
            user: {
                username: "Real Ones",
                image: "/assets/images/user/user3.jpg",
                desc: "Elliott Wilson is building community around hip-hop journalism."
            },
            titles: ["Speak", "volumes"]
        },
        {
            banner: {
                image: "/assets/images/banner/banner2.jpg",
                alt: "Banner 2",
            },
            user: {
                username: "John Doe",
                image: "/assets/images/user/user4.jpg",
                desc: "Rachel Maksy is creating a space for vlogs, makeup transformations, and whimsy."
            },
            titles: ["Make it", "Making art"]
        },
        {
            banner: {
                image: "/assets/images/banner/banner3.jpg",
                alt: "Banner 3",
            },
            user: {
                username: "John Doe",
                image: "/assets/images/user/user6.jpg",
                desc: "Elliott Wilson is building community around hip-hop journalism."
            },
            titles: ["From you", "To your crew"]
        },
        {
            banner: {
                image: "/assets/images/banner/banner4.jpg",
                alt: "Banner 3",
            },
            user: {
                username: "John Doe",
                image: "/assets/images/user/user5.jpg",
                desc: "Elliott Wilson is building community around hip-hop journalism."
            },
            titles: ["From you", "To your crew"]
        }

    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    // banner change state
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % dataSets.length);
        }, 10000)

    }, [dataSets.length])

    const currentData = dataSets[currentIndex]

    const isVedio = (filePath) => {
        const videoExtension = [".mp4", ".webm", ".ogg"];
        return videoExtension.some(ext => filePath.endsWith(ext))
    }

    console.log(isVedio)

    //console.log(currentData)

    return (
        <section className="section-banner h-screen overflow-hidden" key={currentIndex}>
            <motion.div className="section-image">
                {isVedio(currentData.banner.image) ? (<video src={currentData.banner.image} autoPlay loop muted />) : (<Image src={currentData.banner.image} initial={{ opacity: 0.9, translateY: 0 }} animate={{ opacity: 1, translateY: 10 }} transition={{ duration: 2 }} width={0} height={0} sizes="100%" alt="banner" />)}

            </motion.div>

            <div className="user-content">
                <div className="user-profile-content">

                    <div className="user-profile flex items-center gap-3">
                        <motion.div className="user-profile-image" ref={ref} initial={{ opacity: 0, scale: 0.2 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2 }}>
                            <Image src={currentData.user.image} width={0} sizes="100%" height={0} alt="user" />
                        </motion.div>

                        <motion.div ref={ref} initial={{ opacity: 0, translateY: -50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 2 }} className="about-user text-pretty">
                            {currentData.user.desc}
                        </motion.div>
                    </div>
                </div>

                <motion.div ref={ref} initial={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 2 }} className="user-title user-title-1">{currentData.titles[0]}</motion.div>
                <motion.div ref={ref} initial={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 2 }} className="user-title user-title-2">{currentData.titles[1]}</motion.div>
            </div>

            <div className="absolute bottom-8 left-8">
                <motion.div initial={{ translateY: -30 }} transition={{ duration: 1 }} animate={{ translateY: 0 }}>
                    <FaArrowDown className="invert text-5xl font-light" />
                </motion.div>
            </div>
        </section >
    )
}

export default HomeBanner