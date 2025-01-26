"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { motion, inView, useInView, stagger } from "framer-motion";

const Navbar = () => {

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 60);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showCanvas, setShowCanvas] = useState(false);
  const [creatorCanvas, setCreatorCanvas] = useState(false);
  const [featureCanvas, setFeatureCanvas] = useState(false);
  const [resoucesCanvas, setResoucesCanvas] = useState(false);
  const offcanvasRef = useRef(null);
  const [hoveredText, setHoveredText] = useState(false);
  const [isHovered, setisHovered] = useState(false);


  const ref = useRef(null)
  const isInView = useInView(ref);


  useEffect(() => {
    //console.log("Element is in view: ", isInView)
  }, [isInView])


  const renderDropdown = () => {
    const content = navbarData[hoveredText];
    //console.log(navbarData);

    if (!content) return null;

    return (
      <div className="grid grid-cols-5 gap-8">
        {content.map((item, index) => (
          <div key={index} className="drop-content">
            <div className="drop-content-head">
              <div className="drop-content-title">
                {item.title}
              </div>
              <div className="drop-content-icon"><GrFormNextLink /></div>
            </div>
            <div className="drop-content-links">
              {item.links.map((link, i) =>
                <Link key={i} href={link.href}>{link.text}</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const navbarData = {
    creators: [
      {
        title: "Podcasters",
        links: [
          { text: "Get to know your listeners", href: "/" },
          { text: "Cut through the noise", href: "/" },
          { text: "More ways to get paid", href: "/" },
          { text: "Other podcasters on Patreon", href: "/" }
        ]
      },
      {
        title: "Video creators",
        links: [
          { text: "Turn your viewers into your people", href: "/" },
          { text: "Reach every fan, every time", href: "/" },
          { text: "More ways to get paid", href: "/" },
          { text: "Other video creators on Patreon", href: "/" }
        ]
      },
      {
        title: "Musicians",
        links: [
          { text: "From your mind to their ears", href: "/" },
          { text: "Share more than music", href: "/" },
          { text: "More ways to get paid", href: "/" },
          { text: "Other musicians on Patreon", href: "/" }
        ]
      },
      {
        title: "Artists",
        links: [
          { text: "Earning made easy", href: "/" },
          { text: "Create what inspires you", href: "/" },
          { text: "Build community around your art", href: "/" },
          { text: "Other artists on Patreon", href: "/" }
        ]
      },
      {
        title: "Game devs",
        links: [
          { text: "A safe way to get paid", href: "/" },
          { text: "Selling made simple", href: "/" },
          { text: "Where real community thrives", href: "/" },
          { text: "Other game devs on Patreon", href: "/" }
        ]
      }
    ],
    features: [
      {
        title: "Create on your terms",
        links: [
          { text: "Getting started on Patreon", href: "/" },
          { text: "Make it your own", href: "/" },
          { text: "Reach every fan, every time", href: "/" },
          { text: "Showcase your work", href: "/" }
        ]
      },
      {
        title: "Build real community",
        links: [
          { text: "Every post, every time", href: "/" },
          { text: "Cut through the noise", href: "/" },
          { text: "More ways to stay close", href: "/" },
          { text: "Get to know your fans", href: "/" }
        ]
      },
      {
        title: "Expand your reach",
        links: [
          { text: "Bring in new fans", href: "/" },
          { text: "Unlock growth", href: "/" },
          { text: "App integrations", href: "/" },
        ]
      },
      {
        title: "Get business support",
        links: [
          { text: "Help when you need it", href: "/" },
          { text: "Policies to protect you", href: "/" },
          { text: "Payments powered by Patreon", href: "/" },
        ]
      },
      {
        title: "Earning made easy",
        links: [
          { text: "Run a membership", href: "/" },
          { text: "Sell digital products", href: "/" },
        ]
      }
    ],
    pricing: [
      {
        title: "Starting a Patreon is free",
        links: [
          { text: "Powerful core features", href: "/" },
          { text: "Earning made easy", href: "/" },
          { text: "Paid membership", href: "/" },
          { text: "Commerce", href: "/" },
          { text: "Payments powered by Patreon", href: "/" }
        ]
      },
    ], resources: [
      {
        title: "Creator Hub",
        links: [
          { text: "Resources to get started", href: "/" },
          { text: "Grow your membership", href: "/" },
          { text: "Connect with creators", href: "/" },
        ]
      }, {
        title: "Newsroom",
        links: [
          { text: "Patreon HQ", href: "/" },
          { text: "Read latest policy updates", href: "/" },
          { text: "Explore product updates", href: "/" },
          { text: "Commerce", href: "/" },
          { text: "Payments powered by Patreon", href: "/" }
        ]
      }, {
        title: "Help Centre",
        links: [
          { text: "Getting started", href: "/" },
          { text: "Patreon payments", href: "/" },
          { text: "Member management", href: "/" },
          { text: "Content & engagement", href: "/" },
        ]
      }, {
        title: "Partners & integrations",
        links: [
          { text: "Featured integrations", href: "/" },
          { text: "Full app directory", href: "/" },
        ]
      }, {
        title: "Mobile",
        links: [
          { text: "Download the app", href: "/" },
        ]
      },
    ],
  }

  const handleMouseEnter = (event) => {
    const innerValue = event.target.innerText.toLowerCase().trim();
    setHoveredText(innerValue);
    setisHovered(true)
  }

  const handleMouseLeave = () => {
    setHoveredText(null);
    setisHovered(false)
  }

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
      <nav className={`navbar-container ${scroll ? "scrolled" : ""} ${isHovered ? "hovered" : ""}`} onMouseLeave={handleMouseLeave}>
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
                  width={30} priority
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
            <div className="flex items-center gap-4">
              <div className="nav-links flex items-center gap-4">
                <Link className="nav-link" href={""} onMouseEnter={handleMouseEnter}>
                  Creators
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link" href={""} onMouseEnter={handleMouseEnter}>
                  Features
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link" href={""} onMouseEnter={handleMouseEnter}>
                  Pricing
                </Link>
              </div>

              <div className="nav-links">
                <Link className="nav-link" href={""} onMouseEnter={handleMouseEnter}>
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
            <div className="flex items-center gap-4">
              <div className="nav-links hidden sm:block">
                <Link
                  className="nav-link flex items-center gap-2 nav-border"
                  href={""}
                >
                  <div className="">
                    <Image
                      src={"/assets/images/icons/search.svg"}
                      width={15}
                      className={`${scroll ? "" : "invert"} ${isHovered ? "invert" : ""}`}
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

        {/* navbar dropdown */}
        <div className="navbar-dropdown-container">
          <div className="navbar-dropdown-content">
            <div>
              {renderDropdown()}
            </div>
          </div>
        </div>
      </nav >


      {/* mobile navbar offcanvas */}

      <div
        className={`offcanvas-container ${showCanvas ? "show" : ""}`
        }
        ref={offcanvasRef}
      >
        <div className="offcanvas-content px-3">
          <div className="offcanvas-header flex justify-between items-center pt-4">
            <div className="offcanvas-logo">
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

            <div
              className="offcanvas-close cursor-pointer"
              onClick={() => {
                setShowCanvas(false);
              }}
            >
              <RiCloseLargeLine className="text-xl invert" />
            </div>
          </div>

          <div className="offcanvas-links">
            <div className="offcanvas-links-content">
              <div className="offcanvas-link">
                <Link
                  href={""} className="flex items-baseline gap-1 text-xl"
                  onClick={() => {
                    setShowCanvas(true);
                    setCreatorCanvas(true);
                  }}
                >
                  Creators <span><PiArrowBendUpRightBold className="text-base" /></span>
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  className="flex items-baseline gap-1 text-xl"
                  href={""}
                  onClick={() => {
                    setShowCanvas(true);
                    setFeatureCanvas(true)
                  }}
                >
                  Features <span><PiArrowBendUpRightBold className="text-base" /></span>
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  className="flex items-baseline gap-1 text-xl"
                  href={""}
                  onClick={() => {
                    setShowCanvas(false);
                  }}
                >
                  Pricing
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  className="flex items-baseline gap-1 text-xl"
                  href={""}
                  onClick={() => {
                    setResoucesCanvas(true)
                    setShowCanvas(true);
                  }}
                >
                  Resources<span><PiArrowBendUpRightBold className="text-base" /></span>
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  className="flex items-baseline gap-1 text-xl"
                  href={""}
                  onClick={() => {
                    setShowCanvas(false);
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
                    setShowCanvas(false);
                  }}
                >
                  <div className="flex items-center gap-2 text-xl">
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

              <div className="offcanvas-link">
                <Link
                  href={""}
                  onClick={() => {
                    setShowCanvas(false);
                  }}
                  className="btn-start text-xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* /* mobile navbar offcanvas */}




      {/* creater navbar offcanvas */}

      <div
        className={`offcanvas-container  ${creatorCanvas ? "show" : ""}`}
        ref={offcanvasRef}
      >
        <div className="offcanvas-content px-3">
          <div className="offcanvas-header flex justify-between items-center pt-4">

            <div className="offcanvas-back">
              <Link href={"/"} onClick={() => { setCreatorCanvas(false), setShowCanvas(true) }}>
                <TbArrowBackUpDouble className="invert text-3xl" />
              </Link>
            </div>

            <div className="offcanvas-logo">
              <h4 className="text-white text-xl">Creators</h4>
            </div>

            <div
              className="offcanvas-close cursor-pointer"
              onClick={() => {
                setCreatorCanvas(false);
                setShowCanvas(false);
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
                  className="text-xl"
                  onClick={() => {
                    setCreatorCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Podcasters
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setCreatorCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Video creators
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setCreatorCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Musicians
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setCreatorCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Artists
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setCreatorCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Game devs
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div >
      {/* creator navbar offcanvas */}




      {/* feature navbar offcanvas */}

      <div
        className={`offcanvas-container  ${featureCanvas ? "show" : ""}`}
        ref={offcanvasRef}
      >
        <div className="offcanvas-content px-3">
          <div className="offcanvas-header flex justify-between items-center pt-4">

            <div className="offcanvas-back">
              <Link href={"/"} onClick={() => { setFeatureCanvas(false), setShowCanvas(true) }}>
                <TbArrowBackUpDouble className="invert text-3xl" />
              </Link>
            </div>

            <div className="offcanvas-logo">
              <h4 className="text-white text-xl">Features</h4>
            </div>

            <div
              className="offcanvas-close cursor-pointer"
              onClick={() => {
                setFeatureCanvas(false);
                setShowCanvas(false);
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
                  className="text-xl"
                  onClick={() => {
                    setFeatureCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Create on your terms
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setFeatureCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Build real community
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setFeatureCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Earning made easy
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setFeatureCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Expand your reach
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setFeatureCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Get business support
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div >
      {/* feature navbar offcanvas */}


      {/* resource navbar offcanvas */}

      <div
        className={`offcanvas-container  ${resoucesCanvas ? "show" : ""}`}
        ref={offcanvasRef}
      >
        <div className="offcanvas-content px-3">
          <div className="offcanvas-header flex justify-between items-center pt-4">

            <div className="offcanvas-back">
              <Link href={"/"} onClick={() => { setResoucesCanvas(false), setShowCanvas(true) }}>
                <TbArrowBackUpDouble className="invert text-3xl" />
              </Link>
            </div>

            <div className="offcanvas-logo">
              <h4 className="text-white text-xl">Resources</h4>
            </div>

            <div
              className="offcanvas-close cursor-pointer"
              onClick={() => {
                setResoucesCanvas(false);
                setShowCanvas(false);
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
                  className="text-xl"
                  onClick={() => {
                    setResoucesCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Resources to get started
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setResoucesCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Grow your membership
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setResoucesCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Connect with creators
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setResoucesCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Patreon HQ
                </Link>
              </div>

              <div className="offcanvas-link">
                <Link
                  href={""}
                  className="text-xl"
                  onClick={() => {
                    setResoucesCanvas(false);
                    setShowCanvas(false);
                  }}
                >
                  Getting started
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div >
      {/* resource navbar offcanvas */}





    </>
  );
};

export default Navbar;
