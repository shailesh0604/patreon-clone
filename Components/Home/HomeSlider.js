import React from 'react'
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper'
import { GrFormNextLink } from "react-icons/gr";
import 'swiper/css/bundle';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import Link from "next/link";
import "@/css/style.css";

const HomeSlider = () => {



    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [isMounted, setIsMounted] = useState(false);

    return (

        <section className="section-creativity relative">
            <div className="creativity-container">
                <div className="section-heading flex flex-col justify-start absolute top-12 left-8 z-10">
                    <h2 className="section-title leading-12">Creativity</h2>
                    <h2 className="section-title leading-10">Powered</h2>
                </div>

                {isMounted &&
                    <div className="swiper-container">
                        <Swiper className={`mySwiper sample-slider`} modules={[Autoplay]} loop={true} autoplay={{
                            delay: 0,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                            spaceBetween={10}
                            slidesPerView={1.5}
                            speed={9000}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                            }}
                        >

                            <SwiperSlide>
                                <div className="slider middle">
                                    <div className="slider-content">
                                        <div className="slider-img">
                                            <Image src={"/assets/images/slider/slider1.jpg"} sizes="100%" width={0} height={0} alt="slider img" />
                                        </div>
                                        <div className="slider-text">
                                            <Link href={"/"} className="flex items-center text-white drop-shadow-2xl">
                                                <span className="capitalize font-semibold">Tina Yu</span>
                                                <span><GrFormNextLink /></span>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="slider up">
                                    <div className="slider-content">
                                        <div className="slider-img">
                                            <Image src={"/assets/images/slider/slider2.jpg"} sizes="100%" width={0} height={0} alt="slider img" />
                                        </div>
                                        <div className="slider-text">
                                            <Link href={"/"} className="flex items-center text-white drop-shadow-2xl">
                                                <span className="capitalize font-semibold">Jade Voha</span>
                                                <span><GrFormNextLink /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="slider down">
                                    <div className="slider-content">
                                        <div className="slider-img">
                                            <Image src={"/assets/images/slider/slider3.jpg"} sizes="100%" width={0} height={0} alt="slider img" />
                                        </div>
                                        <div className="slider-text">
                                            <Link href={"/"} className="flex items-center text-white drop-shadow-2xl">
                                                <span className="capitalize font-semibold">Tim Chantrag</span>
                                                <span><GrFormNextLink /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="slider up">
                                    <div className="slider-content">
                                        <div className="slider-img">
                                            <Image src={"/assets/images/slider/slider4.jpg"} sizes="100%" width={0} height={0} alt="slider img" />
                                        </div>
                                        <div className="slider-text">
                                            <Link href={"/"} className="flex items-center text-white drop-shadow-2xl">
                                                <span className="capitalize font-semibold">Kevin Woo</span>
                                                <span><GrFormNextLink /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="slider down">
                                    <div className="slider-content">
                                        <div className="slider-img">
                                            <Image src={"/assets/images/slider/slider5.jpg"} sizes="100%" width={0} height={0} alt="slider img" />
                                        </div>
                                        <div className="slider-text">
                                            <Link href={"/"} className="flex items-center text-white drop-shadow-2xl">
                                                <span className="capitalize font-semibold">Jerry Pole</span>
                                                <span><GrFormNextLink /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="slider up">
                                    <div className="slider-content">
                                        <div className="slider-img">
                                            <Image src={"/assets/images/slider/slider6.jpg"} sizes="100%" width={0} height={0} alt="slider img" />
                                        </div>
                                        <div className="slider-text">
                                            <Link href={"/"} className="flex items-center text-white drop-shadow-2xl">
                                                <span className="capitalize font-semibold">Loo Chan</span>
                                                <span><GrFormNextLink /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                }

                <div className="swiper-more-content">
                    <div className="flex justify-between md:gap-4 gap-8 items-end flex-col-reverse md:flex-row">
                        <div className="md:w-2/6 w-full section-desc">
                            Patreon is the best place to build community with your biggest fans, share exclusive work and turn your passion into a lasting creative business.
                        </div>

                        <div className="">
                            <h2 className="section-title leading-12">by</h2>
                            <h2 className="section-title leading-10">fandom</h2>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default HomeSlider