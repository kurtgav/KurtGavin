"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (open)
      document.querySelector<HTMLAnchorElement>("#main-navigation a")?.focus();
  }, [open]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }
  return (
    <header className="header wrap">
      <Link className="wordmark" href="/" aria-label="Kurt Gavin home">
        kurt gavin
        <span className="wordmark-dot" aria-hidden="true">
          ✳
        </span>
      </Link>
      <nav
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            document.getElementById("menu-toggle")?.focus();
          }
        }}
      >
        {[
          ["/work", "Work"],
          ["/about", "About"],
          ["/#journal", "Field notes"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            aria-current={
              pathname.replace(/\/$/, "") === href ? "page" : undefined
            }
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="nav-contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </nav>
      <div className="header-controls">
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          id="menu-toggle"
          className="icon-button menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
