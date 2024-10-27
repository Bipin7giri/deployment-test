"use client";
import React, { useEffect, useState } from "react";
import TrendingStocksTable from "./TrendingStocksTable";
import { Skeleton, Tooltip } from "antd";
import axios from "axios";

const TrendingStocks = () => {
  const [selectedTab, setSelectedTab] = useState("Uptrending");
  const tabs = ["Uptrending", "Downtrending"];
  const [uptrendingStocks, setUptrendingStocks] = useState([]);
  const [downtrendingStocks, setDowntrendingStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, setData) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
        {
          headers: {
            Permission: "2021D@T@f@RSt6&%2-D@T@",
          },
        }
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === "Uptrending") {
      fetchData("trending-stocks/uptrending", setUptrendingStocks);
    } else {
      fetchData("trending-stocks/downtrending", setDowntrendingStocks);
    }
  }, [selectedTab]);

  const getDataForSelectedTab = () => {
    return selectedTab === "Uptrending" ? uptrendingStocks : downtrendingStocks;
  };

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
        <Tooltip title="This is our in-house algorithm for calculating uptrending and downtrending stocks.">
          <button className="size-5 flex items-center justify-center border border-black rounded-full">
            i
          </button>
        </Tooltip>
      </div>
      {!loading ? (
        <TrendingStocksTable
          selectedTab={selectedTab}
          data={getDataForSelectedTab()}
        />
      ) : (
        <Skeleton paragraph={{ rows: 20 }} style={{ width: "100%" }} />
      )}
    </div>
  );
};

export default TrendingStocks;
