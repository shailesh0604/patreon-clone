import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import "@/css/style.css";

const Footer = () => {
  return (
    <footer className='bg-black'>
      <div className="footer-container">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          <div className="">
            <div className="footer-content flex flex-col gap-5">
              <div className="footer-content-title">
                Creators
              </div>
              <div className="footer-content-link">

                <div className="content-link">
                  <Link href={"/"}>Podcasters</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Video creators</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Musicians</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Artists</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Game devs</Link>
                </div>

              </div>
            </div>

          </div>
          <div className="">
            <div className="footer-content flex flex-col gap-5">
              <div className="footer-content-title">
                Features
              </div>
              <div className="footer-content-link">

                <div className="content-link">
                  <Link href={"/"}>Create on your terms</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Where real community thrives</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Grow your community</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Support for your business</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Earning made easy</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Start a membership</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Set up a shop</Link>
                </div>

              </div>
            </div>
          </div>

          <div className="">
            <div className="footer-content flex flex-col gap-5">
              <div className="footer-content-title">
                Pricing
              </div>
              <div className="footer-content-link">

                <div className="content-link">
                  <Link href={"/"}>Starting a Patreon is free</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="footer-content flex flex-col gap-5">
              <div className="footer-content-title">
                Resources
              </div>
              <div className="footer-content-link">

                <div className="content-link">
                  <Link href={"/"}>Creator Hub</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Newsroom</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Help Centre & FAQs</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Partners & integrations</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Mobile</Link>
                </div>

              </div>
            </div>
          </div>

          <div className="">
            <div className="footer-content flex flex-col gap-5">
              <div className="footer-content-title">
                Company
              </div>
              <div className="footer-content-link">

                <div className="content-link">
                  <Link href={"/"}>About</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Press</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Careers</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Terms of Use & policies</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Privacy policy</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Cookie policy</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Accessibility</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Impressum</Link>
                </div>

                <div className="content-link">
                  <Link href={"/"}>Brand assets & guidelines</Link>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex gap-4 items-center my-8">
          <div className="">
            <Image src={"/assets/images/icons/playstore.png"} width={150} height={150} alt='playstore' />
          </div>

          <div className="">
            <Image src={"/assets/images/icons/appstore.png"} width={150} height={150} alt='playstore' />
          </div>
        </div>

        <div className="footer-copyright text-center text-white">
          600 Townsend Street, Suite 500 | San Francisco, CA 94103, USA | ©️ Patreon
        </div>

      </div>
    </footer>
  )
}

export default Footer