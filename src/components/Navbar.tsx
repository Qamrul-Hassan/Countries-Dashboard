"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-900/70 border-b">
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-semibold">
          🌍 Countries Dashboard
        </span>

        <button
          onClick={() => setDark(!dark)}
          className="text-sm border rounded-md px-3 py-1"
          aria-label="Toggle dark mode"
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </nav>
    </header>
  );
}
