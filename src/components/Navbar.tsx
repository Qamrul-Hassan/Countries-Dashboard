"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--surface-deep)]/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6" aria-label="Primary">
        <Link
          href="/"
          className="group inline-flex min-w-0 flex-1 items-center gap-2.5 text-[color:var(--text-strong)]"
          aria-label="Countries Dashboard home"
        >
          <Image
            src="/logo-mark.svg"
            alt="Countries Dashboard logo"
            width={48}
            height={48}
            className="h-11 w-11 object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <span className="min-w-0 leading-none">
            <span className="block truncate text-sm font-extrabold uppercase tracking-[0.08em] sm:text-base">
              Countries
            </span>
            <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-text)] sm:text-[11px]">
              Dashboard
            </span>
          </span>
        </Link>

        <button
          onClick={() => setDark(!dark)}
          className="shrink-0 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-deep)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--foreground)] shadow-[0_8px_18px_rgba(39,37,42,0.2)] hover:-translate-y-0.5"
          aria-label="Toggle color mode"
          type="button"
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </nav>
    </header>
  );
}
