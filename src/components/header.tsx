"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Theme = "dark" | "light" | null;

export default function Header() {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem("theme") as Theme) ?? "dark");

  useEffect(() => {
    console.log("theme");
    document.body.className = theme ?? "light";
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
        <Link href="/" type="button" title="홈화면">
          <p className="dark:text-white fw-bold">DDOWOO</p>
        </Link>
        <div>
          <button onClick={() => onToggleTheme(theme)} type="button">
            <img src={theme === "dark" ? "images/moon.svg" : "images/sun.svg"} width={30} height={30} />
          </button>
        </div>
      </div>
    </header>
  );
}
