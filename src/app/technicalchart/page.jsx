import React from "react";
import dynamic from "next/dynamic";
const TechnicalChart = dynamic(() => import("./_components/Technicalchart"), {
  ssr: false,
});

export const metadata = {
  title: "Analyze The Company With Technical Chart",
  description:
    "Want to Analyze the Company listed in NEPSE Technically? Use The Technical Chart and Use Indicators to Watch Their Next Move",
  keywords: [
    "Technical chart",
    "Technical Analysis",
    "NEPSE",
    "Analyze company",
  ],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const page = () => {
  return (
    <div>
      <TechnicalChart />
    </div>
  );
};

export default page;
