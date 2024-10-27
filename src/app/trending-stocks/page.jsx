import React from "react";
import dynamic from "next/dynamic";
const TrendingStocks = dynamic(() => import("./component/TrendingStocks"), {
  ssr: false,
});

export const metadata = {
  title: "Analyze The Company With Uptrending/Downtrending Data",
  description:
    "Want to Analyze the Top Uptrending and Top Downtrending company",
  keywords: ["Top Downtrending", "Top Uptrending", "NEPSE", "Analyze company"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const TrendingStocksPage = () => {
  return (
    <>
      <TrendingStocks />
    </>
  );
};

export default TrendingStocksPage;
