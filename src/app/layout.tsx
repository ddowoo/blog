import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "../components/header";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/global.css";
import Footer from "@/components/footer";
import { useSyncExternalStore } from "react";
import ScriptTag from "@/components/script";
import Head from "next/head";

export const metadata: Metadata = {
  title: "DDOWWO TECH",
  description: "프론트엔드 개발자 또우 기술",
  verification: {
    google: "uOZl2hjFaHhmktVdunAnyXlgZLdeK0YEXt1NxRTmggw",
  },
};

const setThemeMode = `
        console.log('실행')
        if (typeof window !== "undefined"){
            console.log('실행')
            if(!window.localStorage.getItem('theme')){
                localStorage.theme = 'dark'
            }
            document.body.className = window.localStorage.getItem('theme')
        }
      `;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="dark bg-slate-800">
        <div className={`pb-10 bg-slate-800 dark:text-white min-h-dvh`}>
          <Header />
          <main className="max-w-screen-lg px-5 m-auto relative pt-5">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
