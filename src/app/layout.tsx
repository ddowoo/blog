import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/global.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "DDOWWO TECH",
  description: "프론트엔드 개발자 또우 기술",
  verification: {
    google: "uOZl2hjFaHhmktVdunAnyXlgZLdeK0YEXt1NxRTmggw",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const blockingSetUserColorMode = `(function() {
        ${setUserColorMode.toString()}
        setUserColorMode();
    })()
`;

  function setUserColorMode() {
    function getUserColorMode() {
      const userPreference = window.localStorage.getItem("theme");

      if (typeof userPreference === "string") {
        return userPreference;
      }

      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDarkMode ? "dark" : "light";
    }

    const colorMode = getUserColorMode();
    document.body.className = colorMode;
  }

  return (
    <html lang="en" className={`${inter.className}`}>
      <body suppressHydrationWarning={true} className="dark bg-slate-800 text-white">
        {/* <script dangerouslySetInnerHTML={{ __html: blockingSetUserColorMode }}></script> */}
        {/* <div className={`bg-white dark:bg-slate-800 dark:text-white min-h-dvh pb-5 pt-20`}> */}
        <Header />
        <main className="max-w-screen-lg px-5 m-auto relative pt-5">{children}</main>
        <Footer />
        {/* </div> */}
      </body>
    </html>
  );
}
