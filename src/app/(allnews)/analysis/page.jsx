import React from "react";
import Analysis from "./_component/Analysis";

export const metadata = {
  title: "Saral lagani | Analysis",
  description:
    "Check The Analaysis Performed On Various Stock And Various Economic Aspect of The NEPSE and NEPAL.",
  keywords: ["Analysis", "Company Analysis", "NEPSE", "Analyze company"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
  url: "https://sarallagani.com/",
};

export default function AnalysisPage() {
  return (
    <div>
      <Analysis />
    </div>
  );
}
