"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const NewsRoute = () => {
  const [navfixed, setNavFixed] = useState("");
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
    const handleHashChange = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 380) {
          setNavFixed("lg:fixed bg-[#F4F6F9] top-[73px] z-40 lg:shadow-xl");
        } else {
          setNavFixed("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${navfixed} mt-5`}>
      <div className="flex justify-between items-center mx-5">
        <div>
          <ul className="flex items-center gap-10 text-sm lg:text-sm">
            {[
              { href: "/allnews", label: "All" },
              { href: "/news", label: "NEPSE" },
              { href: "/economynews", label: "Economy" },
              { href: "/iponews", label: "IPO" },
            ].map(({ href, label }) => (
              <li
                key={href}
                className={`py-[2px] px-6  cursor-pointer transition-transform duration-300 border-[0.5px] ${
                  pathname === href
                    ? "bg-[#0065c3] text-white border-transparent transform scale-105"
                    : "text-primary border-black hover:bg-[#e0e0e0]"
                }`}
              >
                <Link
                  href={href}
                  className={`block ${
                    pathname === href ? "font-medium" : "font-thin"
                  }`}
                >
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NewsRoute;
