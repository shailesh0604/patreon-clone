"use client"
import Lenis from '@studio-freight/lenis';

export const initializeLenis = () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: true,
    });

    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return lenis;
};
