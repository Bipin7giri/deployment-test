"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./_components/portfilo.css";
import portfolioActions from "./_redux/action";
import { Helmet } from "react-helmet";
// import usePageViewTracking from "@/services/usePageViewTracking";
import BreakDownPortfolio from "./_components/breakDownPortfolio";
import OverAllPortfolio from "./_components/overAllPortfolio";
import Login from "@/app/(auth)/login/_component/login";

const Portfolio = () => {
  // usePageViewTracking();
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(portfolioActions.getShareHolderByUserID({ user_id: currentUser }));
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  if (!isLoggedIn) {
    if (isModalOpen) {
      return (
        <>
          <div className="fixed backdrop-filter backdrop-blur-sm bg-opacity-75 top-0 left-0 w-screen h-screen flex items-center justify-center z-40">
            <div className="bg-secondary    rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Login Required...</h2>
              <p className="text-gray-600 mb-6">
                You need to login to access this page. Please login or create an
                account to continue.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="bg-black hover:bg-gray-800 text-secondary  py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="lg:bg-[#F4F6F9]">
            <OverAllPortfolio />
            <BreakDownPortfolio />
          </div>
        </>
      );
    } else {
      return currentUser ? (
        <Login path="/portfolio" />
      ) : (
        <Login path="/pre-portfolio" />
      );
    }
  }

  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Portfolio | Saral Lagani</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta
          property="og:title"
          content="Track Your Portfolio With Breakdown"
        />
        <meta
          property="og:description"
          content="The portfolio manager to check and manage your portfolio with. It provide the insight and breakdown on your portfolio. "
        />
        <meta
          name="description"
          content="he portfolio manager to check and manage your portfolio with. It provide the insight and breakdown on your portfolio. "
        />
        <meta
          name="keywords"
          content="Portfolio Manager, NEPSE portfolio,Portfolio Tracker, "
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>
      <div className="lg:bg-[#F4F6F9]">
        <OverAllPortfolio />
        <BreakDownPortfolio />
      </div>
    </div>
  );
};

export default Portfolio;
