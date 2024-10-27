import React from "react";
import dynamic from "next/dynamic";
const FearGreed = dynamic(() => import("./component/FearGreed"), {
  ssr: false,
});

export const metadata = {
  title: "Analyze The Company With Fear/Greed Data",
  description: "Want to Analyze the Top Greed and Top Fear company",
  keywords: ["Top Greed", "Top Fear", "NEPSE", "Analyze company"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const FearGreedPage = () => {
  return (
    <>
      <FearGreed />
    </>
  );
};

export default FearGreedPage;
