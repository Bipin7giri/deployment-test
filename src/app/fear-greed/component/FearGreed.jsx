"use client";
import React, { useEffect, useState } from "react";
import FearGreedTable from "./FearGreedTable";
import { Skeleton, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/app/(home)/redux/actions";

const FearGreed = () => {
  const dispatch = useDispatch();
  const { fearGreedData, loading } = useSelector((state) => state.home);
  const [selectedTab, setSelectedTab] = useState("Top Greed");
  const tabs = ["Top Greed", "Top Fear", "Neutral"];
  const [greedData, setGreedData] = useState([]);

  useEffect(() => {
    dispatch(actions.getFearGreedData());
  }, []);

  useEffect(() => {
    if (selectedTab === "Top Greed") {
      setGreedData(
        fearGreedData.filter((item) => item.technical_summary === "Greed")
      );
    } else if (selectedTab === "Top Fear") {
      setGreedData(
        fearGreedData
          .filter((item) => item.technical_summary === "Fear")
          .reverse()
      );
    } else {
      setGreedData(
        fearGreedData
          .filter((item) => item.technical_summary === "Neutral")
          .reverse()
      );
    }
  }, [selectedTab, fearGreedData]);

  return (
    <div className="p-8 lg:mt-0 mt-44">
      <div className="flex items-center justify-between w-full px-8 mb-6">
        <div className="flex items-center gap-4">
          {tabs.map((item, id) => (
            <button
              className={`${
                selectedTab === item
                  ? "border-gray-700 text-black"
                  : "text-gray-600 border-gray-200"
              } text-lg border-b-2 font-semibold`}
              key={id}
              onClick={() => setSelectedTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <Tooltip title="This is our in-house algorithm for calculating bullish and bearish stock">
          <button className="size-5 flex items-center justify-center border border-black rounded-full">
            i
          </button>
        </Tooltip>
      </div>
      {!loading ? (
        <FearGreedTable selectedTab={selectedTab} data={greedData} />
      ) : (
        <Skeleton paragraph={{ rows: 20 }} style={{ width: "100%" }} />
      )}
    </div>
  );
};

export default FearGreed;
