import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/global.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "DDOWWO TECH",
  description: "프론트엔드 개발자 또우 기술 블로그",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className={`bg-white dark:bg-slate-800 dark:text-white min-h-dvh relative`}>
          <Header />
          <div className="max-w-screen-md m-auto ">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
