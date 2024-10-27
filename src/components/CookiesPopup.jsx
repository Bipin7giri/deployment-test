"use client";
import React, { useEffect, useState } from "react";

const CookiesPopup = ({ setOpenPopup, setCookieAccepted }) => {
  const [showCookie, setShowCookie] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookie(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCookie = (boolean) => {
    localStorage.setItem("cookieAccepted", JSON.stringify(boolean));
    setCookieAccepted(boolean);
    setOpenPopup(false);
  };

  return (
    <div
      className={`${
        showCookie ? "bottom-0 opacity-100" : "-bottom-16 opacity-0"
      } fixed w-full left-0 px-20 transition-all duration-200 ease-linear items-center bg-white z-[999] py-4 border-t border-gray-300`}
    >
      <div className="flex gap-4 items-center justify-between">
        <p className="font-medium w-1/2">
          We use cookies and similar technologies to help personalize content,
          tailor and measure ads, and provide a better experience. By clicking
          accept, you agree to this, as outlined to our Cookie policy.
        </p>
        <div className="flex items-center gap-3 font-semibold">
          <button
            onClick={() => handleCookie(true)}
            className="py-2 px-4 rounded-md bg-gray-950 text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesPopup;
