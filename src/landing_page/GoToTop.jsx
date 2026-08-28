import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const listenToScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      setIsVisible(winScroll > 100);
    };
    window.addEventListener("scroll", listenToScroll, { passive: true });
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={goToBtn}
      aria-label="Back to top"
      className="fab-safe fixed left-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#c62828] text-white shadow-md active:scale-95 sm:left-4"
    >
      <FaArrowUp className="text-base" />
    </button>
  );
}

export default GoToTop;
