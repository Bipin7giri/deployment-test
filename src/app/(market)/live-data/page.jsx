import React from "react";
import Market from "./live-data";

export const metadata = {
  title: "NEPSE LIVE PRICE | SARAL LAGANI",
  description:
    "Get the live price for the company trading in NEPSE. Get last traded price, close price, open price, volume, turnover and more",
  keywords: ["live nepse", "nepse live", "nepse", "ltp nepse", "volume"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const page = () => {
  return (
    <>
      <Market />
    </>
  );
};

export default page;
