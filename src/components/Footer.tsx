import { Github, Globe, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="w-full px-0">
        <div className="w-full rounded-none border-y border-[color:var(--border)] bg-[color:var(--card)]/82 px-6 py-6 shadow-[0_16px_30px_#27252a1f] backdrop-blur-sm sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-3xl font-black tracking-[0.08em] text-[color:var(--text-strong)]">
                QAMRUL HASSAN
              </p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[color:var(--muted-text)] sm:text-sm">
                Product Designer and Frontend Developer
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xl font-black text-[color:var(--text-strong)]">
                Countries Dashboard
              </p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[color:var(--muted-text)] sm:text-sm">
                Modern country discovery with global insights
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://github.com/Qamrul-Hassan"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--background)]/70 text-[color:var(--text-strong)] shadow-[0_8px_18px_#27252a1f] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:border-[color:var(--color-6)] hover:bg-[color:var(--color-6)] hover:text-white"
            >
              <Github className="h-5 w-5 transition-transform duration-200 group-hover:rotate-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--background)]/70 text-[color:var(--text-strong)] shadow-[0_8px_18px_#27252a1f] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
            >
              <Linkedin className="h-5 w-5 transition-transform duration-200 group-hover:rotate-6" />
            </a>
            <a
              href="https://portfolio-next16.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Portfolio website"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--background)]/70 text-[color:var(--text-strong)] shadow-[0_8px_18px_#27252a1f] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:border-[color:var(--color-7)] hover:bg-[color:var(--color-7)] hover:text-white"
            >
              <Globe className="h-5 w-5 transition-transform duration-200 group-hover:rotate-6" />
            </a>
          </div>

          <div className="mt-5 border-t border-[color:var(--border)] pt-4 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[color:var(--muted-text)] sm:text-sm">
              Copyright 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
