import dynamic from "next/dynamic";
import React from "react";
const SaralPick = dynamic(() => import("./_component/SaralPick"), {
  ssr: false,
});

export const metadata = {
  title: "Saral Lagani | Screener | Saral Pick",
  description:
    "Saral Lagani handpicks the top-performing stocks for you, offering curated selections displayed directly on our intuitive frontend interface. Simplify your investment decisions with expertly chosen stocks.",
  keywords: ["Screener", "Saral Pick", "NEPSE", "Analyze company", "Analysis"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const PriceVolumePage = () => {
  return (
    <>
      <SaralPick />
    </>
  );
};

export default PriceVolumePage;
