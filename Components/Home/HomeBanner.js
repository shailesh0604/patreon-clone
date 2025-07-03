"use client";

import React, { useRef, useEffect, useState, use } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { FaArrowDown } from "react-icons/fa6";
import { IoArrowForwardSharp } from "react-icons/io5";

const HomeBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const dataSets = [
    {
      banner: {
        image: "/assets/videos/user2.mp4",
        alt: "Banner 4",
      },
      user: {
        username: "Real Ones",
        image: "/assets/images/user/user1.jpg",
        desc: "RossDraws is creating, sharing, and teaching the art of worldbuilding.",
      },
      titles: ["Your house", "Your rules"],
    },
    {
      banner: {
        image: "/assets/images/banner/banner1.jpg",
        alt: "Banner 1",
      },
      user: {
        username: "John Doe",
        image: "/assets/images/user/user2.jpg",
        desc: "John is a creative artist who loves painting and sculpture.",
      },
      titles: ["Discover Art", "Create Magic"],
    },
    {
      banner: {
        image: "/assets/videos/user.mp4",
        alt: "Banner 4",
      },
      user: {
        username: "Real Ones",
        image: "/assets/images/user/user3.jpg",
        desc: "Real Ones is diving deep into the biggest issues of our time.",
      },
      titles: ["Speak", "volumes"],
    },
    {
      banner: {
        image: "/assets/images/banner/banner2.jpg",
        alt: "Banner 2",
      },
      user: {
        username: "John Doe",
        image: "/assets/images/user/user4.jpg",
        desc: "Rachel Maksy is creating a space for vlogs, makeup transformations, and whimsy.",
      },
      titles: ["Make it", "Making art"],
    },
    {
      banner: {
        image: "/assets/images/banner/banner3.jpg",
        alt: "Banner 3",
      },
      user: {
        username: "John Doe",
        image: "/assets/images/user/user6.jpg",
        desc: "Elliott Wilson is building community around hip-hop journalism.",
      },
      titles: ["From you", "To your crew"],
    },
    {
      banner: {
        image: "/assets/images/banner/banner4.jpg",
        alt: "Banner 3",
      },
      user: {
        username: "John Doe",
        image: "/assets/images/user/user5.jpg",
        desc: "Tim Chantarangsu is dropping podcast episodes and spitting fire.",
      },
      titles: ["Creators", "is now a career"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex = useRef(0);
  const itemsRefs = useRef([]);
  const videoRefs = useRef([]);
  const textRefs = useRef([]);
  const arrowRef = useRef(null);
  const descRef = useRef(null);
  const imgRef = useRef(null);

  // Auto-slide every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % dataSets.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [dataSets.length]);

  // Animate titles on first render
  useEffect(() => {
    const [title1, title2] = textRefs.current;

    gsap.fromTo(
      title1,
      { y: -300 },
      { y: 0, duration: 2, ease: "power3.out", stagger: 0.2, delay: 0.2 }
    );

    gsap.fromTo(
      title2,
      { y: -300 },
      { y: 0, duration: 2, ease: "power3.out", stagger: 0.2, delay: 0.5 } // extra delay
    );

    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { y: -150 },
        { y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    if (descRef.current) {
      const wordSpans = descRef.current.querySelectorAll(".word-span");
      gsap.fromTo(
        wordSpans,
        { y: -100 },
        {
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.025,
        }
      );
    }

    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { scale: 0.7, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // GSAP transition effect
  useEffect(() => {
    const prev = prevIndex.current;
    const curr = currentIndex;
    if (prev === curr) return;

    const tl = gsap.timeline();

    tl.to(itemsRefs.current[prev], {
      autoAlpha: 0,
      duration: 2,
      ease: "power1.inOut",
    });

    tl.to(
      itemsRefs.current[curr],
      {
        autoAlpha: 1,
        duration: 2,
        ease: "power1.inOut",
        onStart: () => {
          const vid = videoRefs.current[curr];
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }

          const [title1, title2] = textRefs.current;

          gsap.fromTo(
            title1,
            { y: -300 },
            {
              y: 0,
              duration: 2,
              ease: "power3.out",
              stagger: 0.2,
              delay: 0.2,
            }
          );

          gsap.fromTo(
            title2,
            { y: -300 },
            {
              y: 0,
              duration: 2,
              ease: "power3.out",
              stagger: 0.2,
              delay: 0.5,
            } // extra delay
          );

          if (arrowRef.current) {
            gsap.fromTo(
              arrowRef.current,
              { y: -150 },
              { y: 0, duration: 1.5, ease: "power3.out" }
            );
          }

          if (descRef.current) {
            const wordSpans = descRef.current.querySelectorAll(".word-span");
            gsap.fromTo(
              wordSpans,
              { y: -100 },
              {
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.025,
              }
            );
          }

          if (imgRef.current) {
            gsap.fromTo(
              imgRef.current,
              { scale: 0.7, autoAlpha: 0 },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "power2.out",
              }
            );
          }
        },
      },
      0
    );

    prevIndex.current = curr;
  }, [currentIndex]);

  // Initial visibility setup
  useEffect(() => {
    itemsRefs.current.forEach((el, i) => {
      gsap.set(el, {
        autoAlpha: i === currentIndex ? 1 : 0,
      });
    });

    videoRefs.current.forEach((vid) => {
      if (vid) vid.play();
    });
  }, []);

  const isVideo = (filePath) => {
    return [".mp4", ".webm", ".ogg"].some((ext) => filePath.endsWith(ext));
  };

  const currentData = dataSets[currentIndex];

  return (
    <section className="section-banner h-dvh overflow-hidden relative">
      {/* BANNER BACKGROUND SLIDES */}
      {dataSets.map((item, i) => (
        <div
          key={i}
          ref={(el) => (itemsRefs.current[i] = el)}
          className="absolute inset-0 w-full h-full"
        >
          {isVideo(item.banner.image) ? (
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={item.banner.image}
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={item.banner.image}
              alt={item.banner.alt || `slide-${i}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          )}
        </div>
      ))}

      {/* OVERLAY CONTENT */}
      <div className="user-content z-10 relative">
        <div className="user-profile-content">
          <div className="user-profile flex items-center gap-3">
            <div className="user-profile-image" ref={imgRef}>
              <Image
                src={currentData.user.image}
                width={60}
                height={60}
                alt="user"
                sizes="100"
                className="rounded-full"
              />
            </div>

            <div ref={descRef} className="about-user text-pretty">
              {currentData.user.desc.split(" ").map((word, index) => (
                <span key={index} className="inline-block mr-1 word-span">
                  {word}
                </span>
              ))}
              <IoArrowForwardSharp className="inline-block ml-1" />
            </div>
          </div>
        </div>

        <div className="user-title user-title-1">
          <span ref={(el) => (textRefs.current[0] = el)}>
            {currentData.titles[0]}
          </span>
        </div>

        <div className="user-title user-title-2">
          <span ref={(el) => (textRefs.current[1] = el)}>
            {currentData.titles[1]}
          </span>
        </div>
      </div>

      <div className="absolute bottom-2 left-4 md:bottom-6 md:left-8 z-10">
        <div className="banner-arrow">
          <div ref={arrowRef}>
            <FaArrowDown className="invert text-3xl md:text-5xl font-light" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
