"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 280;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleGoToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoToTop}
      aria-label="Go to top"
      title="Go to top"
      className={`go-top-button fixed right-4 bottom-5 z-50 inline-flex size-13 items-center justify-center rounded-full border-2 text-[#fff8f1] shadow-lg sm:right-6 sm:bottom-7 sm:size-14 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{
        borderColor: "#ce6728",
        background: "linear-gradient(150deg, #ee8b37 0%, #ce6728 48%, #8f3e24 100%)",
        boxShadow: "0 16px 28px #66241659",
      }}
    >
      <ChevronUp className="size-6 sm:size-7" strokeWidth={3} aria-hidden="true" />
    </button>
  );
}
