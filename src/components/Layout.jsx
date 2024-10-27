/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
// import { FeedbackWidget } from "../components/Feedback";
// import { NoteWidget } from "./Note";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import CarouselBanner from "@/components/CarouselBanner";
import Navbar from "./Navbar";
// import DummyNews from "@/app/(allnews)/news/components/DummyNews";
import actions from "@/app/(home)/redux/actions";
import { IoTrendingUp } from "react-icons/io5";
import TrendingNews from "@/app/(allnews)/_components/TrendingNews";
function Layout({ children }) {
  const { isLoggedIn, name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchToggle, setToggleSearch] = useState(false);
  const pathname = usePathname();
  const isBrokerRoute = /^\/broker\/\d+/.test(pathname);
  const isBreakdownTopFiveSymbolRoute = /^\/breakdownTopFiveSymbol\/\w+/.test(
    pathname
  );
  const isBrokerBreakdownBuyersRoute = /^\/broker\/\w+\/breakdownBuyers/.test(
    pathname
  );
  const isBrokerBreakdownTotalSellingRoute =
    /^\/broker\/\w+\/breakdownTotalSelling/.test(pathname);

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="viewport"]');
    if (metaTag) {
      metaTag.setAttribute("content", "width=900, initial-scale=0.428");
    }

    function disableRightClickHandler(event) {
      event.preventDefault();
    }
    document.addEventListener("contextmenu", disableRightClickHandler);

    return () => {
      document.removeEventListener("contextmenu", disableRightClickHandler);
    };
  });

  useEffect(() => {
    if (isLoggedIn) {
      setIsOpen(false);
      setToggleSearch(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getMarketDataHomeLive());
  }, []);

  if (pathname === "/login" || pathname === "/signup") {
    return <div>{children}</div>;
  } else if (pathname?.includes("technicalchart")) {
    return (
      <>
        <div
          className={`lg:block ${pathname === "/technicalchart" && "hidden"}`}
        >
          {/* <Navbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isLoggedIn={isLoggedIn}
            searchToggle={searchToggle}
            setToggleSearch={setToggleSearch}
            userName={name}
          /> */}
        </div>
        <div>{children}</div>
      </>
    );
  } else if (
    pathname === "/news" ||
    pathname === "/economynews" ||
    pathname === "/iponews" ||
    pathname === "/newsAlertnews" ||
    pathname === "/allnews"
  ) {
    return (
      <>
        <Navbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoggedIn={isLoggedIn}
          searchToggle={searchToggle}
          setToggleSearch={setToggleSearch}
          userName={name}
        />
        <div>
          <div className="flex mt-4 lg:mx-auto p-4 flex-col lg:flex-row  gap-6">
            <div className="w-[100%]  lg:w-[60%]">
              <CarouselBanner />
            </div>
            <div className="w-[100%] lg:w-[40%]">
              <div className="flex pb-2 flex-row justify-between items-center">
                <div>
                  <h1 className="font-bold text-blue-700 flex items-center gap-1 ">
                    <IoTrendingUp />
                    Trending News
                  </h1>
                </div>
                <div>
                  <button className="bg-blue-600 px-3 text-[10px] text-white font-medium py-1 rounded-xl">
                    View All
                  </button>
                </div>
              </div>
              <hr></hr>
              <div className="mt-8">
                <TrendingNews />
              </div>
            </div>
          </div>
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  } else if (pathname.startsWith("/news/")) {
    return (
      <>
        <Navbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoggedIn={isLoggedIn}
          searchToggle={searchToggle}
          setToggleSearch={setToggleSearch}
          userName={name}
        />
        <div>{children}</div>
        <div>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoggedIn={isLoggedIn}
          searchToggle={searchToggle}
          setToggleSearch={setToggleSearch}
          userName={name}
        />
        <div className={`bg-[#F4F6F9] !min-h-[90vh]`}>{children}</div>
        {/* <FeedbackWidget /> */}
        {/* {isLoggedIn && <NoteWidget />} */}
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Layout;
