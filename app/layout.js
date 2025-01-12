import localFont from "next/font/local";
import "./globals.css";
import ScrollProvider from "@/Components/ScrollProvider";


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
      <body
      >
        {/* <ScrollProvider> */}

          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        {/* </ScrollProvider> */}
      </body>
    </html>
  );
}
