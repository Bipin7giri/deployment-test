"use client";
import React from "react";
import NepseCharts from "../../../(home)/components/NepseCharts";
import { Helmet } from "react-helmet";
import News from "@/app/(home)/components/News";
import Analysis from "@/app/(allnews)/analysis/_component/Analysis";
// import usePageViewTracking from "@/services/usePageViewTracking";

const NepseSummaryComponent = () => {
  // usePageViewTracking();
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Saral Lagani | Simplify Your Investment</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta
          property="og:title"
          content="Analyze The Company Listed In NEPSE fundamentally."
        />
        <meta
          property="og:description"
          content="Get various insight about the company in NEPSE and check the company fundamentally. Also check the news and analysis about various company in NEPSE."
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>
      <NepseCharts />
      <News />
      <Analysis />
    </div>
  );
};

export default NepseSummaryComponent;
