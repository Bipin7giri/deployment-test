import dynamic from "next/dynamic";
import React from "react";
const PriceVolume = dynamic(() => import("./_component/PriceVolume"), {
  ssr: false,
});

export const metadata = {
  title: "Saral Lagani | Screener | Price & Volume",
  description:
    "Analyze company performance with insights on price up volume up and price down volume up trends.",
  keywords: ["Screener", "Price & Volume", "NEPSE", "Analyze company"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const PriceVolumePage = () => {
  return (
    <>
      <PriceVolume />
    </>
  );
};

export default PriceVolumePage;
