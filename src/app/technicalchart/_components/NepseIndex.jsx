"use client";
import React from "react";
import { useSelector } from "react-redux";

const NepseIndex = () => {
  const { marketLiveHomeData } = useSelector((state) => state.home);
  return (
    <div className="mx-5 mt-5">
      <h2 className="text-center mb-10 font-semibold text-2xl">INDICES</h2>
      <div className="space-y-4 font-semibold">
        {marketLiveHomeData?.nepseIndex?.map((item, id) => (
          <div key={id} className="flex items-center justify-between gap-5">
            <p>{item.sindex}</p>
            <span className="flex items-center gap-2">
              <p>{item.currentValue}</p>
              <p
                className={`${
                  item.perChange > 0
                    ? "text-success"
                    : item.perChange === 0
                    ? "text-info-2"
                    : "text-danger"
                } text-sm`}
              >
                ({item.perChange} %)
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NepseIndex;
