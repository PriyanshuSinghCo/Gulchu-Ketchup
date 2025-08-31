import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToShowFrom = 100;
    const winScroll = document.documentElement.scrollTop;
    if (winScroll > heightToShowFrom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-6 left-6 bg-red-600 text-white p-3 rounded-full shadow-md cursor-pointer z-50 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={goToBtn}>
          <FaArrowUp className="text-lg" />
        </div>
      )}
    </>
  );
}

export default GoToTop;
