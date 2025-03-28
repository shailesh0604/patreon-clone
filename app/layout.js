import localFont from "next/font/local";
import "../app/globals.css";
import SessionWrapper from "@/Components/SessionWrapper";
import LenisProvider from "@/Components/LenisProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Home | Patreon",
  description: "Patreon clone in next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {/* <LenisProvider> */}
          {children}
          {/* </LenisProvider> */}
        </SessionWrapper>
      </body>
    </html >
  )
}
