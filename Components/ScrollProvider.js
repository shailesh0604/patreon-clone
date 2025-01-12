'use client';

import { useEffect } from 'react';
import { initializeLenis } from '@/lib/Lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProvider = ({ children }) => {
    useEffect(() => {
        const lenis = initializeLenis();

        lenis.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                return lenis.scroll;
            },
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.clearMatchMedia();
        };
    }, []);

    return <>{children}</>;
};

export default ScrollProvider;
