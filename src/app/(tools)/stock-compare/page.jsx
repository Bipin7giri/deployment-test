import React from "react";
import dynamic from "next/dynamic";
const StockCompare = dynamic(() => import("./_components/StockCompare"), {
  ssr: false,
});

const StockComparePage = () => {
  return (
    <>
      <StockCompare />
    </>
  );
};

export default StockComparePage;
