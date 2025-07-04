import React from "react";
import Image from "next/image";
import Link from "next/link";

const HomeLogin = () => {
  return (
    <>
      <section className="section-login flex justify-center items-center h-dvh relative">
        <div className="overlay-user">
          <Image
            src={"/assets/images/banner/overlay-2.jpg"}
            width={0}
            height={0}
            sizes="100"
            alt="user"
          />
        </div>
        <div className="container-login bg-white max-w-[95%] px-8 py-14 rounded-2xl">
          <div className="login-img">
            <Image
              src={"/assets/images/icons/logomark-animated.webp"}
              className="mx-auto"
              width={90}
              height={90}
              alt="logo"
              unoptimized
            />
          </div>

          <div className="login-txt text-center">Your world to create</div>

          <div className="login-btn text-center w-full">
            <Link href={"/"} className="btn-primary w-full block">
              Get started
            </Link>
          </div>

          <div className="login-link text-center">
            <span className="opacity-60">Already have an account?</span>{" "}
            <Link className="underline font-medium" href={"/login"}>
              Log in
            </Link>
          </div>

          <div className="login-apps">
            <Link href={"/"}>
              <Image
                src={"/assets/images/icons/playstore.png"}
                sizes="100"
                width={0}
                height={0}
                alt="play store"
              ></Image>
            </Link>

            <Link href={"/"}>
              <Image
                src={"/assets/images/icons/appstore.png"}
                width={0}
                sizes="100"
                height={0}
                alt="play store"
              ></Image>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeLogin;
