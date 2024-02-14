import type { Metadata } from "next";
import Header from "../components/header";
import "@/styles/global.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "DDOWWO TECH",
  description: "프론트엔드 개발자 또우 기술",
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="dark bg-gray-900">
        <div className={`pb-10 bg-gray-900 dark:text-white min-h-dvh relative`}>
          <Header />
          <main className="max-w-screen-lg px-5 m-auto relative pt-5 pb-5">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
