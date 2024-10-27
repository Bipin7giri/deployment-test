"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { Input, Skeleton } from "antd";
import TechnicalTable from "./TechnicalTable";

const { Search } = Input;

const TechnicalScreener = () => {
  const { fearGreedData, loading } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(actions.getFearGreedData());
  }, []);

  useEffect(() => {
    if (!searchText.length > 0) {
      setFilteredData(
        fearGreedData?.map((item) => ({
          ...item,
          bband:
            item.lastTradedPrice > item.bband_upper
              ? "Bullish"
              : item.lastTradedPrice < item.bband_lower
              ? "Bearish"
              : "Neutral",
        }))
      );
    } else {
      setFilteredData(
        fearGreedData
          ?.filter(
            (item) =>
              item.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
              item.securityName.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((item) => ({
            ...item,
            bband:
              item.lastTradedPrice > item.bband_upper
                ? "Bullish"
                : item.lastTradedPrice < item.bband_lower
                ? "Bearish"
                : "Neutral",
          }))
      );
    }
  }, [fearGreedData, searchText]);


  return (
    <div className="lg:container lg:px-0 lg:mx-auto my-14 px-4">
      <div className="bg-white px-4 py-6 w-full rounded-2xl">
        <div className="mb-6 flex lg:flex-row flex-col lg:items-center items-start justify-between lg:gap-6 gap-4 w-full">
          <h2 className="lg:text-xl text-[32px] font-semibold">
            Technical Screener
          </h2>
          <Search
            placeholder="Search Your Stock"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              // height: '60px',
              width: "400px",
              // fontWeight: 'bold',
              // fontSize: '1.6rem',
              "@media (min-width: 768px)": {
                height: "20px",
                width: "300px",
              },
              "@media (min-width: 1024px)": {
                height: "24px",
                width: "400px",
              },
            }}
            // classNames=""
          />
        </div>
        <div>
          {!loading ? (
            <TechnicalTable data={filteredData} />
          ) : (
            <Skeleton paragraph={{ rows: 6 }} style={{ width: "100%" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalScreener;
