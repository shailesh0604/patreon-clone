import React from 'react'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Creators = () => {


    const [activeTab, setActiveTab] = useState("All");

    const [scrolling, setScrolling] = useState(0);

    const scrollRef = useRef(null);

    const creatorRef = useRef(null);

    const newCreatorRef = useRef(null);

    const topCreatorRef = useRef(null);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    // Scroll right
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    const creatorLeft = () => {
        if (creatorRef.current) {
            creatorRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    // Scroll right
    const creatorRight = () => {
        if (creatorRef.current) {
            creatorRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };


    const newCreatorLeft = () => {
        if (newCreatorRef.current) {
            newCreatorRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    // Scroll right
    const newCreatorRight = () => {
        if (newCreatorRef.current) {
            newCreatorRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const topCreatorLeft = () => {
        if (topCreatorRef.current) {
            topCreatorRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    // Scroll right
    const topCreatorRight = () => {
        if (topCreatorRef.current) {
            topCreatorRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };




    const [popularity, setPopularity] = useState([]);
    const [creators, setCreators] = useState([]);
    const [topic, setTopic] = useState([]);
    const [newCreator, setNewCreator] = useState([]);
    const [topCreator, setTopCreator] = useState([]);

    useEffect(() => {
        fetch("/data.json").then((response) => response.json()).then(data => setPopularity(data.popularity)).catch((error) => console.error(error));

        fetch("/data.json").then((response2) => response2.json()).then(data2 => setCreators(data2.creators)).catch((error) => console.error(error));

        fetch("/data.json").then((response3) => response3.json()).then(data3 => setTopic(data3.topic)).catch((error) => console.error(error));

        fetch("/data.json").then((response4) => response4.json()).then(data4 => setNewCreator(data4.newcreator)).catch((error) => console.error(error));

        fetch("/data.json").then((response5) => response5.json()).then(data5 => setTopCreator(data5.topcreator)).catch((error) => console.error(error));

        const handleScrolling = () => {
            //console.log("Scrolling detected", window.scrollY);
            setScrolling(window.scrollY > 60);
        };

        // Add event listener
        window.addEventListener('scroll', handleScrolling);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScrolling);
        };

    }, [])

    return (
        <>
            <div className="creator-search-container w-full">

                <div className={`fixed-header ${scrolling ? "scrolled" : ""} `}>


                    <div className="creator-searchbar mx-auto w-[90%] sm:w-[80%] lg:w-[36rem]  relative transition-all duration-300">
                        <input type="text" className="w-full pl-11 pr-4 py-2.5 rounded-full border-none outline-none text-black text-base" placeholder="Search creators or topics" />
                        <div className="search-icon absolute  left-7 top-1/2 -translate-x-2/4 -translate-y-2/4">
                            <IoSearch className="opacity-75 text-2xl" />
                        </div>
                    </div>

                    <div className="category-container relative">
                        <button className="scroll-btn left" onClick={scrollLeft}><MdOutlineArrowBackIosNew /></button>
                        <div className="category-list" ref={scrollRef}>
                            {["All", "Paranormal", "Podcasts & shows", "Pop culture", "Comedy", "Role playing games", "True crime", "Art tutorials", "Handicrafts", "Illustration", "Musical education", "Education", "Indie games"].map((tab) => (<button type="button" onClick={() => setActiveTab(tab)} className={`btn-cat ${activeTab === tab ? "active" : ""}`} key={tab}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>))}
                        </div>
                        <button className="scroll-btn right" onClick={scrollRight}><MdOutlineArrowForwardIos /></button>
                    </div>

                </div>

                <div className="main-container-home">


                    <div className="creator-container">
                        <div className="heading flex justify-between items-center gap-4">
                            <div className="heading-title flex items-center gap-0.5">
                                <p className="txt">Creators for you</p>
                                <p className="icon"><IoIosArrowForward /></p>
                            </div>

                            <div className="heading-nav flex items-center gap-1.5">
                                <button className="" onClick={creatorLeft}><MdOutlineArrowBackIosNew /></button>
                                <button className="" onClick={creatorRight}><MdOutlineArrowForwardIos /></button>
                            </div>

                        </div>

                        <div className="creator-content" ref={creatorRef}>
                            {creators.map((creator, index) => (<Link key={index} href={creator.userName} className="creator">
                                <div className="creator-img">
                                    <Image src={creator.image} width={0} height={0} sizes="100" alt="creator" />
                                </div>

                                <h3 className="creator-title">{creator.title}</h3>
                                <p className="creator-subtitle">{creator.subTitle}</p>
                            </Link>))
                            }
                        </div>

                    </div>

                    <div className="popular-container">
                        <div className="heading flex justify-between items-center gap-4">
                            <div className="heading-title flex items-center gap-0.5">
                                <p className="txt">Popular this week</p>
                                <p className="icon"><IoIosArrowForward /></p>
                            </div>

                            <div className="heading-nav flex items-center gap-1.5">
                                <button ref={prevRef} className=""><MdOutlineArrowBackIosNew /></button>
                                <button ref={nextRef} className=""><MdOutlineArrowForwardIos /></button>
                            </div>

                        </div>

                        <div className="hidden lg:block">
                            <div className="popular-content">
                                {popularity.map((p, index) => (
                                    <Link key={index} href={`/${p.userName}`} className="pop-content">
                                        <div className="flex items-center gap-3">
                                            <div className="pop-user-img">
                                                <Image src={p.image} width={0} sizes="100" height={0} alt={"pop images"} />
                                            </div>
                                            <div className="pop-user-txt">
                                                <p className="pop-user-title">{p.title}</p>
                                                <span className="pop-user-subtitle">{p.subTitle}</span>
                                            </div>
                                        </div>

                                        <div className="pop-more">
                                            <MdMoreVert />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="block lg:hidden">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3} // adjust as per design
                                onInit={(swiper) => {
                                    // Bind custom navigation refs after Swiper initializes
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }}
                                pagination={{ clickable: true }}
                                autoplay={{delay : 5000 , disableOnInteraction: false}}
                                loop={true}
                                speed={2000}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    767: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                className="popularity-swiper"
                            >
                                {popularity.map((p, index) => (
                                    <SwiperSlide key={index}>
                                        <Link href={`/${p.userName}`} className="pop-content block">
                                            <div className="flex items-center gap-3">
                                                <div className="pop-user-img relative w-14 h-14">
                                                    <Image
                                                        src={p.image}
                                                        fill
                                                        alt="pop images"
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="pop-user-txt">
                                                    <p className="pop-user-title">{p.title}</p>
                                                    <span className="pop-user-subtitle">{p.subTitle}</span>
                                                </div>
                                            </div>

                                            <div className="pop-more">
                                                <MdMoreVert />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>


                    <div className="topic-main">

                        <div className="heading flex justify-between items-center gap-4 mt-9 mb-5">
                            <div className="heading-title flex items-center gap-0.5">
                                <p className="txt">Explore topics</p>
                            </div>
                        </div>

                        <div className="topic-container">
                            {topic.map((t, index) => (<Link key={index} href={t.link} className={`topic-content color-${index}`}>
                                <div className="topic-title">
                                    {t.title}
                                </div>
                                <div className="topic-img">
                                    <Image src={t.image} width={0} height={0} alt="topic icon" sizes="100" />
                                </div>
                            </Link>))}
                        </div>
                    </div>


                    <div className="creator-containe mt-12">
                        <div className="heading flex justify-between items-center gap-4">
                            <div className="heading-title flex items-center gap-0.5">
                                <p className="txt">New on Patreon</p>
                                <p className="icon"><IoIosArrowForward /></p>
                            </div>

                            <div className="heading-nav flex items-center gap-1.5">
                                <button className="" onClick={newCreatorLeft}><MdOutlineArrowBackIosNew /></button>
                                <button className="" onClick={newCreatorRight}><MdOutlineArrowForwardIos /></button>
                            </div>

                        </div>

                        <div className="creator-content" ref={newCreatorRef}>
                            {newCreator.map((c, index) => (<Link key={index} href={c.userName} className="creator">
                                <div className="creator-img">
                                    <Image src={c.image} width={0} height={0} sizes="100" alt="creator" />
                                </div>

                                <h3 className="creator-title">{c.title}</h3>
                                <p className="creator-subtitle">{c.subTitle}</p>
                            </Link>))
                            }
                        </div>

                    </div>

                    <div className="creator-containe mt-2 pb-8">
                        <small className="block text-white opacity-95 font-medium text-[0.795rem]">Top creators</small>
                        <div className="heading flex justify-between items-center gap-4">
                            <div className="heading-title flex items-center gap-0.5">
                                <p className="txt">Pop culture</p>
                                <p className="icon"><IoIosArrowForward /></p>
                            </div>

                            <div className="heading-nav flex items-center gap-1.5">
                                <button className="" onClick={topCreatorLeft}><MdOutlineArrowBackIosNew /></button>
                                <button className="" onClick={topCreatorRight}><MdOutlineArrowForwardIos /></button>
                            </div>

                        </div>

                        <div className="creator-content" ref={topCreatorRef}>
                            {topCreator.map((t, index) => (<Link key={index} href={t.userName} className="creator">
                                <div className="creator-img">
                                    <Image src={t.image} width={0} height={0} sizes="100" alt="creator" />
                                </div>

                                <h3 className="creator-title">{t.title}</h3>
                                <p className="creator-subtitle">{t.subTitle}</p>
                            </Link>))
                            }
                        </div>

                    </div>

                </div>

            </div >
        </>
    )
}

export default Creators