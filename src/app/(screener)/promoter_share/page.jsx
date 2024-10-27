import dynamic from "next/dynamic";
import React from "react";
const PromoterShare = dynamic(() => import("./component/PromoterShare"), {
  ssr: false,
});

export const metadata = {
  title: "Saral Lagani | Promoter Share",
  description: "Find out if a share is locked or unlocked.",
  keywords: ["Promoter Share", "Locked", "Unlocked", "NEPSE"],
  openGraph: {
    images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
  },
};

const PromoterSharePage = () => {
  return (
    <>
      <PromoterShare />
    </>
  );
};

export default PromoterSharePage;
