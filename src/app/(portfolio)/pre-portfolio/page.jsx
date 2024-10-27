import dynamic from "next/dynamic";
import React from "react";
const PrePortfolio = dynamic(() => import("./_component/PrePortfolio"), {
  ssr: false,
});
export default function page() {
  return (
    <div>
      <PrePortfolio />
    </div>
  );
}
