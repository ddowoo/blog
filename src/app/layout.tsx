import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
// const inter = Inter({ subsets: ["latin"] });
import "@/styles/global.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "DDOWWO TECH",
  description: "프론트엔드 개발자 또우 기술 블로그",
};

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

const blockingSetUserColorMode = `(function() {
    ${setUserColorMode.toString()}
    setUserColorMode();
})()
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: blockingSetUserColorMode,
          }}
        ></script>
        <div className={`bg-white dark:bg-slate-800 dark:text-white min-h-dvh pb-5 px-5`}>
          <Header />
          <div className="max-w-screen-lg m-auto relative">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
