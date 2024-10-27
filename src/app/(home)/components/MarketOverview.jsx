/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, AutoComplete, Input, Button, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OverView from "./OverView";
import Gainer from "./GainerAndLoser";
import StockChart from "@/app/company/[id]/component/StockChart";
import api from "@/api/axios";
import actions from "../redux/actions";
import Card from "@/components/Card";
import { formatMoney, formatValue } from "@/utils/formatMoney";
import { BiUpArrowAlt } from "react-icons/bi";
import { BiDownArrowAlt } from "react-icons/bi";
import SubIndices from "./SubIndices";

const MarketOverview = ({ isBullMarket }) => {
  const {
    companyChartData,
    loading,
    marketLiveHomeData,
    isMarketLiveHomeDataLoading,
  } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState("NEPSE");
  const [searchActive, setSearchActive] = useState(false);
  const [isNepse, setIsNepse] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [dailyChartData, setDailyChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("1Y");
  const intervals = ["1D", "3M", "6M", "1Y"];
  const inputRef = useRef(null);
  const [pageLoading, setPageLoading] = useState(false);

  // fetch company chart data
  const getChartData = () => {
    let time;
    const currentDate = new Date();
    switch (selectedInterval) {
      case "1Y":
        // to get the 1 year ago's timestamp from todays date
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        time = currentDate.getTime() / 1000;
        break;
      case "6M":
        // to get the 6 months ago's timestamp from todays date
        currentDate.setMonth(currentDate.getMonth() - 6);
        time = currentDate.getTime() / 1000;
        break;
      case "3M":
        // to get the 3 months ago's timestamp from todays date
        currentDate.setMonth(currentDate.getMonth() - 3);
        time = currentDate.getTime() / 1000;
        break;
    }

    let id;
    if (selectedCompany === "NEPSE") {
      id = 1;
      setIsNepse(true);
    } else {
      id = selectedCompany;
      setIsNepse(false);
    }
    dispatch(
      actions.getCompanyChartData({
        id: id,
        timeStamp: time,
      })
    );
  };

  const getDailyChartData = async () => {
    try {
      setPageLoading(true);
      const response = await api.get(
        `/company/chart_data_resolution_one_day/${selectedCompany}`
      );
      if (response.data.status === 200) {
        setDailyChartData(response.data.data);
        setPageLoading(false);
      } else {
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err);
      setPageLoading(false);
    }
  };

  const getNepseDailyChartData = async () => {
    try {
      setPageLoading(true);
      const response = await api.get(
        `/sector/market_chart_data_minute_one_day/1`
      );
      if (response.data.status === 200) {
        setDailyChartData(response.data.data);
        setPageLoading(false);
      } else {
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (selectedInterval !== "1D") {
      getChartData();
    } else {
      if (selectedCompany === "NEPSE") {
        getNepseDailyChartData();
      } else {
        getDailyChartData();
      }
    }
  }, [selectedCompany, selectedInterval]);

  // fetch company data
  const getCompanyData = async () => {
    try {
      setPageLoading(true);
      const response = await api.get(`/live_data/live/${selectedCompany}`);
      if (response.data.status === 200) {
        setCompanyData(response.data.data[0]);
        setPageLoading(false);
      } else {
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCompany !== "NEPSE") {
      getCompanyData();
    }
  }, [selectedCompany]);

  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (marketLiveHomeData && marketLiveHomeData.liveData) {
      const initialData = marketLiveHomeData.liveData.map((item) => ({
        ...item,
      }));
      initialData.push({
        symbol: "NEPSE",
        companyName: "Nepal Stock Exchange",
      });
      setMarketData(initialData);
      setFilteredData(initialData);
    }
  }, [marketLiveHomeData]);

  const handleSearch = (value) => {
    setFilteredData(
      marketData.filter(
        (item) =>
          item.symbol.toLowerCase().includes(value.toLowerCase()) ||
          item.companyName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const option = filteredData.map((item) => ({
    label: item.symbol,
  }));

  const handleSelectCompany = (event) => {
    if (event.target.innerText !== "") {
      setSelectedCompany(event.target.innerText);
      setSelectedInterval("1Y");
      if (inputRef.current) {
        setFilteredData(marketData);
        inputRef.current.blur();
      }
    }
  };

  const [subIndicesClass, setSubIndicesClass] = useState("");
  const [gainerClass, setGainerClass] = useState("");
  const [chartClass, setChartClass] = useState("");

  const handleResize = () => {
    if (window.screen.width >= 650) {
      setSubIndicesClass("w-[27%]");
      setGainerClass("w-[30%]");
      setChartClass("w-[43%]");
    } else if (window.screen.width >= 476 && window.screen.width < 650) {
      setSubIndicesClass("w-1/2");
      setGainerClass("w-1/2");
      setChartClass("w-full mt-5");
    } else {
      setSubIndicesClass("w-full");
      setGainerClass("w-full py-5");
      setChartClass("w-full");
    }
  };

  useEffect(() => {
    // Set initial classes
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:container lg:px-0 lg:mx-auto  lg:mt-0 mt-8 gap-10 px-4 mx-auto">
      <div className="py-3 flex flex-col items-center gap-[2px]">
        <h3 className=" text-center font-[500] text-[42px] lg:text-[24px]">
          Market
          <span
            className={`${
              isBullMarket ? "text-[#23B123]" : "text-[#b12323]"
            } font-semibold`}
          >
            {" "}
            &nbsp;Overview
          </span>
        </h3>
        <Tag
          color="cyan"
          className="mx-auto my-1 lg:text-[14px] text-[22px] lg:py-0 py-1"
        >
          <span className="text-primary   font-semibold"> As of : &nbsp; </span>
          <span className="text-success">
            {marketLiveHomeData?.subIndices?.[0]?.entry_date?.split("T")[0]}
          </span>
        </Tag>
      </div>

      <div className="flex flex-wrap justify-between w-[100%] lg:mx-0 px-4 lg:px-6 pb-5">
        <div className={`${subIndicesClass}`}>
          <SubIndices />
        </div>
        <div className={`${gainerClass} lg:px-3 px-0 lg:h-[450px]`}>
          <div
            className="bg-white order-2 lg:order-none
                     shadow-md rounded-3xl overflow-x-auto w-full h-full"
          >
            <Gainer />
          </div>
        </div>
        <div
          className={`${chartClass} bg-white lg:h-[450px] order-1 lg:order-none p-3 shadow-lg ring-1 ring-gray-300 rounded-2xl`}
        >
          <div>
            <div className="flex justify-between gap-2 items-center w-full">
              <AutoComplete
                popupMatchSelectWidth={250}
                style={{ width: 250 }}
                options={option}
                size="large"
                onClick={handleSelectCompany}
                {...(!searchActive && { value: selectedCompany })}
                onSearch={handleSearch}
                onFocus={() => {
                  setSearchActive(true);
                }}
                onBlur={() => {
                  setSearchActive(false);
                }}
                className="font-semibold"
              >
                <Input
                  ref={inputRef}
                  size="large"
                  placeholder="Search company"
                  className="lg:text-sm text-lg"
                  suffix={
                    <Button
                      icon={<DownOutlined />}
                      disabled={true}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "8px",
                        height: "14px",
                      }}
                    />
                  }
                />
              </AutoComplete>
              <div className="mr-4 flex items-center gap-1 text-sm">
                {intervals.map((item, id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedInterval(item)}
                    className={`${
                      selectedInterval === item
                        ? "bg-gray-900 text-white"
                        : "bg-white text-black"
                    } lg:size-7 size-12 lg:text-[14px] text-[20px] rounded-full border transition-all duration-100 ease-linear`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {loading || isMarketLiveHomeDataLoading || pageLoading ? (
              <>
                <Skeleton paragraph={{ rows: 8 }} style={{ width: "100%" }} />
              </>
            ) : (
              <div className="relative w-full">
                <div className="w-full">
                  {companyChartData?.length > 0 &&
                    (selectedCompany === "NEPSE" ? (
                      marketLiveHomeData?.nepseIndex?.map((item, id) => {
                        if (item.sindex === "NEPSE Index") {
                          return (
                            <div
                              className="w-full absolute z-10 mb-6"
                              key={item.sindex + id}
                            >
                              <div className="flex w-full items-start justify-between">
                                <div className="flex items-start lg:text-sm text-xl gap-2 ml-5">
                                  <span className="flex items-center">
                                    {item?.currentValue}
                                    {item?.perChange >= 0 ? (
                                      <BiUpArrowAlt className="text-green-500" />
                                    ) : (
                                      <BiDownArrowAlt className="text-red-500" />
                                    )}
                                  </span>
                                  <span>{formatMoney(item?.schange)}</span>
                                  <span
                                    className={`${
                                      item.perChange >= 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {item?.perChange}%
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1 lg:text-sm text-xl mr-20">
                                  {marketLiveHomeData?.marketSummary
                                    ?.slice(0, 2)
                                    .map((dataItem, id) => {
                                      return (
                                        <li
                                          key={id}
                                          className="flex items-center gap-1"
                                        >
                                          <p>{dataItem.ms_key}</p>
                                          <p
                                            className={`${
                                              item.perChange >= 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                            }`}
                                          >
                                            {formatValue(dataItem?.ms_value)}
                                          </p>
                                        </li>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    ) : (
                      <div className="w-full absolute z-10 mb-6">
                        <div className="flex w-full items-start justify-between">
                          <div className="flex items-start lg:text-sm text-xl gap-2 ml-5">
                            <span className="flex items-center">
                              {companyData?.lastTradedPrice}
                              {companyData?.perChange >= 0 ? (
                                <BiUpArrowAlt className="text-green-500" />
                              ) : (
                                <BiDownArrowAlt className="text-red-500" />
                              )}
                            </span>
                            <span>{formatMoney(companyData?.schange)}</span>
                            <span
                              className={`${
                                companyData.perChange >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {companyData?.perChange?.toFixed(2)}%
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 lg:text-sm text-xl mr-20">
                            <li className="flex items-center gap-1">
                              <p>Total Turnover Rs:</p>
                              <p
                                className={`${
                                  companyData?.perChange >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {formatValue(companyData?.totalTradeValue)}
                              </p>
                            </li>
                            <li className="flex items-center gap-1">
                              <p>Total Traded Shares</p>
                              <p
                                className={`${
                                  companyData?.perChange >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {formatValue(companyData?.totalTradeQuantity)}
                              </p>
                            </li>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {companyChartData?.length > 0 || dailyChartData.length > 0 ? (
                  <StockChart
                    selectedInterval={selectedInterval}
                    data={
                      selectedInterval === "1D"
                        ? dailyChartData
                        : companyChartData
                    }
                    isNepse={isNepse}
                  />
                ) : (
                  <div className="h-full w-full flex justify-center items-center mt-16">
                    No data found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
