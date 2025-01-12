"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  const [showCanvas, setShowCanvas] = useState(false);

  const offcanvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const outSideClick = (e) => {
      if (offcanvasRef.current && !offcanvasRef.current.contains(e.target)) {
        setShowCanvas(false);
      }
    };

    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, []);

  return (
    <>
      <nav className={`navbar-container ${scroll ? "scrolled" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="block lg:hidden">
            <div className="flex items-center gap-4">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowCanvas(true);
                }}
              >
                <HiMenuAlt3 className={`text-3xl ${scroll ? "" : "invert"}`} />
              </div>

              <div className="">
                <Image
                  src={"/assets/images/logo/logo2.svg"}
                  width={30}
                  className={`block mx-auto ${scroll ? "" : "invert"
                    } duration-200 transition-all ease`}
                  height={30}
                  sizes="100"
                  alt="logo"
                />
              </div>
            </div>
          </div>

          <div className="nav-content hidden lg:block">
            <div className="flex items-center gap-6">
              <div className="nav-links flex items-center gap-4">
                <Link className="nav-link" href={""}>
                  Creators
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link" href={""}>
                  Features
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link" href={""}>
                  Pricing
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link" href={""}>
                  Resources
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link nav-border" href={""}>
                  Updates
                </Link>
              </div>
            </div>
          </div>

          <div className="nav-logo hidden lg:block">
            <div className="scroll">
              <Link href={"/"}>
                <Image
                  src={"/assets/images/logo/logo.svg"}
                  width={150}
                  className="block mx-auto cursor-pointer"
                  height={150}
                  alt="logo"
                />
              </Link>
            </div>

            <div className="scrolled">
              <Link href={"/"}>
                <Image
                  src={"/assets/images/logo/logo2.svg"}
                  width={30}
                  className="block mx-auto cursor-pointer"
                  height={30}
                  alt="logo"
                />
              </Link>
            </div>
          </div>

          <div className="nav-content">
            <div className="flex items-center gap-4 xl:gap-6">
              <div className="nav-links hidden sm:block">
                <Link
                  className="nav-link flex items-center gap-2 nav-border"
                  href={""}
                >
                  <div className="">
                    <Image
                      src={"/assets/images/icons/search.svg"}
                      width={15}
                      className={`${scroll ? "" : "invert"}`}
                      height={15}
                      alt="icons"
                    />
                  </div>
                  <div className="">Find a Creator</div>
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link nav-border" href={"/login"}>
                  Log In
                </Link>
              </div>

              <div className="nav-links hidden lg:block">
                <Link className="nav-link nav-light" href={""}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* custom-offcanvas */}

      <div
        className={`offcanvas-container ${showCanvas ? "show" : ""}`}
        ref={offcanvasRef}
      >
        <div className="offcanvas-content px-3">
          <div className="offcanvas-header flex justify-between items-center pt-4">
            <div className="offcanvas-logo">
              <Link href={"/"}>
                <Image
                  src={"/assets/images/logo/logo.svg"}
                  width={110}
                  className="block mx-auto cursor-pointer"
                  height={110}
                  alt="logo"
                />
              </Link>
            </div>

            <div
              className="offcanvas-close cursor-pointer"
              onClick={() => {
                setShowCanvas(!true);
              }}
            >
              <RiCloseLargeLine className="text-xl invert" />
            </div>
          </div>

          <div className="offcanvas-links">
            <div className="offcanvas-links-content">
              <div className="offcanvas-link">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                >
                  Creators
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                >
                  Features
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                >
                  Pricing
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                >
                  Resources
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                >
                  Updates
                </Link>
              </div>

              <div className="offcanvas-link block sm:hidden">
                <Link
                  href={""}
                  className=""
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Image
                        src={"/assets/images/icons/search.svg"}
                        width={15}
                        className={"invert"}
                        height={15}
                        alt="icons"
                      />
                    </div>
                    <div className="">Find a Creator</div>
                  </div>
                </Link>
              </div>

              <div className="offcanvas-link ">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(!true);
                  }}
                  className="btn-start"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* custom-offcanvas */}
    </>
  );
};

export default Navbar;
