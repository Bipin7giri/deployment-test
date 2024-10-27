"use client";
import React, { useEffect } from "react";
import logo from "../../../assets/img/tradingview.png";
import Image from "next/image";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={` lg:container mt-44 lg:mt-0 lg:px-10 py-16 lg:mx-auto lg:min-h-[100vh]  px-4 mx-auto`}
    >
      <h1 className="lg:text-xl text-gray-700 font-bold text-6xl">
        Our Partners
      </h1>
      <div className="grid lg:grid-cols-3 grid-cols-1 py-5">
        <div className="bg-secondary    p-4 rounded-md">
          <div className="w-6/12 ">
            <Image src={logo} />
          </div>
          <div className="py-3 text-sm">
            <p className="text-4xl lg:text-sm leading-[1.4] lg:leading-6">
              <a
                target="_blank"
                className="hover:text-blue-800  font-bold  text-info"
                href="https://www.tradingview.com/"
              >
                {" "}
                TradingView
              </a>{" "}
              is a powerful and widely used online platform that provides
              traders and investors with an extensive range of tools and
              features to analyze and monitor financial markets. It serves as a
              one-stop solution for technical analysis, charting, and market
              visualization across various asset classes, including stocks,
              cryptocurrencies, forex, commodities, and more. Among other
              things, it provides the essence of market research — data — and
              presents it in various forms: you can track important upcoming
              events in the
              <a
                target="_blank"
                className="hover:text-blue-800  font-bold  text-info"
                href="https://www.tradingview.com/economic-calendar/"
              >
                Economic calendar
              </a>{" "}
              or browse stocks in the{" "}
              <a
                target="_blank"
                className="hover:text-blue-800  font-bold  text-info"
                href="https://www.tradingview.com/screener/"
              >
                Screener
              </a>{" "}
              to find the best opportunities for your portfolio. Whatever your
              trading strategy needs, just visit TradingView.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
