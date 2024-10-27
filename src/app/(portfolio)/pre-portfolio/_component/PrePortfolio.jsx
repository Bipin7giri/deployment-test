"use client";
import React from "react";
import { useSelector } from "react-redux";
import "../../portfolio/_components/portfilo.css";
import Login from "@/app/(auth)/login/_component/login";
import PortfolioSetUpStep from "./portfolioSetUpStep";

const PrePortfolio = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Login path="/pre-portfolio" />;
  }
  return (
    <div>
      <div className="lg:bg-[#F4F6F9]">
        <PortfolioSetUpStep />
      </div>
    </div>
  );
};

export default PrePortfolio;
