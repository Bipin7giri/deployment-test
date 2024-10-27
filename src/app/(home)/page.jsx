import React from "react";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("./components/Homepage"));

export const generateMetadata = async () => {
  return {
    title: "Saral Lagani | Simplify Your Investment",
    description:
      "Check insights from NEPSE, get live data, financial data broker analysis, price of company listed in NEPSE.",
    keywords: [
      "Saral Lagani",
      "Sarallagani",
      "SaralLagani",
      "NEPSE",
      "stock analysis",
      "financial data",
      "stocks",
      "today NEPSE",
    ],
    openGraph: {
      images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
    },
  };
};

const page = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default page;
