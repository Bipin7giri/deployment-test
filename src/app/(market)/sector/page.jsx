import dynamic from "next/dynamic";
import React from "react";

const Sector = dynamic(() => import("./_component/Sector"), {
  ssr: false,
});
export default function SectorPage() {
  return (
    <div>
      <Sector />
    </div>
  );
}
