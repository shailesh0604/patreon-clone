"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar"
import HomeBanner from "@/Components/Home/HomeBanner";
import HomeSlider from "@/Components/Home/HomeSlider";
import HomeDesc from "@/Components/Home/HomeDesc";
// import HomeCreators from "@/Components/Home/HomeCreators";
import HomeLogin from "@/Components/Home/HomeLogin";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import LenisProvider from "@/Components/LenisProvider";
import { useRouter } from "next/navigation";

const HomeCreators = new dynamic(() => import("@/Components/Home/HomeCreators"), { ssr: false })

export default function Home() {

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  return (
    <>
      <LenisProvider>
        <Navbar />
        <HomeBanner />
        <HomeSlider />
        <HomeDesc />
        <HomeCreators />
        <HomeLogin />
        <Footer />
      </LenisProvider>
    </>
  );
}
