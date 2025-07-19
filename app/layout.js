import localFont from "next/font/local";
import "../app/globals.css";
import SessionWrapper from "@/Components/SessionWrapper";
import LenisProvider from "@/Components/LenisProvider";
import Loader from "@/Components/Loader";

export const metadata = {
  title: "Home | Patreon",
  description: "Patreon clone in next js",
  icons: {
    icon: '/assets/images/icons/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Loader />
          {/* <LenisProvider> */}
          {children}
          {/* </LenisProvider> */}
        </SessionWrapper>
      </body>
    </html >
  )
}
