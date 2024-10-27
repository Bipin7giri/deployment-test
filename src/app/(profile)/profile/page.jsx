"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
// import usePageViewTracking from "../../services/usePageViewTracking";
import Profile from "./Profile";
import { useRouter } from "next/navigation";

const Index = () => {
  // usePageViewTracking();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Payment | Saral Lagani</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta property="og:title" content="Payment With SaralLagani" />
        <meta property="og:description" content="Payment With SaralLagani" />
        <meta
          name="keywords"
          content="Portfolio Manager, NEPSE, portfolio, Portfolio Tracker, collaboration, Stock payment"
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>
      <div className="lg:bg-[#F4F6F9]">
        <Profile />
      </div>
    </div>
  );
};

export default Index;
//
