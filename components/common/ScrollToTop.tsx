"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-brand-700 active:scale-95
        ${
          showButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }
      `}
    >
      <ChevronUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 " />
    </button>
  );
};

export default ScrollToTop;