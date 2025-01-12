"use client"

import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar"
import HomeBanner from "@/Components/Home/HomeBanner";
import HomeSlider from "@/Components/Home/HomeSlider";
import HomeDesc from "@/Components/Home/HomeDesc";
import HomeCreators from "@/Components/Home/HomeCreators";
import HomeLogin from "@/Components/Home/HomeLogin";

export default function Home() {

  return (
    <>
      <Navbar />
      <HomeBanner />
      <HomeSlider />
      <HomeDesc />
      <HomeCreators />
      <HomeLogin />
      <Footer />
    </>
  );
}
