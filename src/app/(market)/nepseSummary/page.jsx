import dynamic from "next/dynamic";
import React from "react";
const NepseSummaryComponent = dynamic(
  () => import("./_component/NepseSummary"),
  {
    ssr: false,
  }
);

export default function NepseSummaryPage() {
  return (
    <div>
      <NepseSummaryComponent />
    </div>
  );
}
