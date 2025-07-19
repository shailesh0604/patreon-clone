"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function Loader() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();

        const timeout = setTimeout(() => {
            NProgress.done();
        }, 300); // You can adjust the timing

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}