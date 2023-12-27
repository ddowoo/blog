"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Theme = "dark" | "light" | null;

export default function Header() {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const theme = (window.localStorage.getItem("theme") as Theme) ?? "light";
    document.body.className = theme;
    setTheme(theme);
  }, []);

  const onToggleTheme = (theme: Theme) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <header className="py-5">
      <div className="max-w-screen-lg m-auto flex justify-between">
        <Link href="/" type="button" title="홈화면" className="my-auto">
          <p className="dark:text-white font-bold">DDOWOO</p>
        </Link>
        <div className="flex items-center">
          <Link href="/blog" type="button" title="블로그">
            <p className="dark:text-white font-bold mr-3 m-auto">BLOG</p>
          </Link>
          <button onClick={() => onToggleTheme(theme as Theme)} type="button">
            <img src={theme === "dark" ? "images/moon.svg" : "images/sun.svg"} width={30} height={30} />
          </button>
        </div>
      </div>
    </header>
  );
}
