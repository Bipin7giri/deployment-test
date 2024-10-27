import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`back-to-top ${
        isVisible ? "visible" : "hidden"
      } cursor-pointer hover:bg-green-700  fixed rounded-full bg-success-2 text-secondary  p-2 z-10 text-[54px] lg:text-[18px] `}
      onClick={handleBackToTop}
    >
      <AiOutlineArrowUp />
    </button>
  );
}

export default BackToTop;
