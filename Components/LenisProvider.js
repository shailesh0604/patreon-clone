"use client";
import React from "react";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function LenisProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 4), // Ease-out effect
            smooth: true,
            smoothTouch: true, // Enable smooth scrolling for touch devices
            touchMultiplier: 2,
            infinite: false,
        });

        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // return () => {
        //     lenis.destroy();
        //     lenis.ticker.remove((time) => {
        //         lenis.raf(time * 1000);
        //     });
        // };
    });

    return children;
}