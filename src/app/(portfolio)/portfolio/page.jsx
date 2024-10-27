import dynamic from "next/dynamic";
import React from "react";

const PortFolio = dynamic(() => import("./portfolio"), {
  ssr: false,
});
export default function PortfolioPage() {
  return (
    <div>
      <PortFolio />
    </div>
  );
}
