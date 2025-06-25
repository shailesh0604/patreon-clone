"use client";

import React, { useRef, useEffect, useState } from "react";
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
    <section className="section-banner h-screen overflow-hidden relative">
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
            <motion.div
              className="user-profile-image"
              ref={ref}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
            >
              <Image
                src={currentData.user.image}
                width={60}
                height={60}
                alt="user"
                sizes="100"
                className="rounded-full"
              />
            </motion.div>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 2 }}
              className="about-user text-pretty"
            >
              {currentData.user.desc}
              <IoArrowForwardSharp className="inline-block ml-1" />
            </motion.div>
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

      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10">
        <motion.div
          initial={{ translateY: -30 }}
          transition={{ duration: 1 }}
          animate={{ translateY: 0 }}
        >
          <FaArrowDown className="invert text-2xl md:text-5xl font-light" />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBanner;
