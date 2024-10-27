/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import companyActions from "@/app/company/[id]/redux/actions";
import api from "@/api/axios";
import { Skeleton, Tag, Tooltip } from "antd";

import {
  AiFillInfoCircle,
  AiFillLock,
  AiOutlineCheck,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import actions from "@/app/company/[id]/redux/actions";
import {
  setChoosedTechinicalSymbol,
  setPreviousTechnicalSymbol,
} from "@/app/(market)/_redux/marketSlice";
import comingSoon from "@/assets/img/comingSoon.png";
import WatchListButton from "@/app/company/[id]/component/WatchListButton";
import { disabledCompanies } from "@/utils/disableCompanies";
import Link from "next/link";
import BarChart from "@/app/company/[id]/component/BarChart";
import IncomeBreakdownBarChart from "@/app/company/[id]/component/IncomeBreakdownBarChart";
import { formatMoney } from "@/utils/formatMoney";
import { useSearchParams } from "next/navigation";

export const StockBasicInfo = () => {
  const dispatch = useDispatch();
  const [companyListLoading, setcompanyListLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState([]);
  const searchParams = useSearchParams();

  const symbol = searchParams.get("symbol");
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const {
    loading,
    isCompanyloading,
    company,
    quickSypnosisList,
    allRatios,
    marketSharesLoan,
    marketSharesDepost,
  } = useSelector((state) => state.company);
  const { previousTechnicalSymbol, choosedTechnicalSector } = useSelector(
    (state) => state.market
  );

  console.log("here", { previousTechnicalSymbol });
  const [isWatchListAdded, setWatchListAdded] = useState();

  const getStockBasicInfo = async () => {
    try {
      setcompanyListLoading(true);
      const res = await api.post("/company/industry_average", {
        symbol: symbol,
        sector: company?.[0]?.sectorName,
      });
      if (res) {
        setcompanyListLoading(false);
        setBasicInfo(res?.data?.data);
      }
    } catch (err) {
      setcompanyListLoading(false);
    }
  };

  const fetchIsAddedWatchList = async (id) => {
    if (isLoggedIn) {
      const res = await api.get(`/watchlist/checkifexist/${id}`);
      if (res) {
        setWatchListAdded(res.data.data);
      }
    }
  };

  useEffect(() => {
    if (symbol !== null && symbol != 1) {
      if (previousTechnicalSymbol !== symbol) {
        dispatch(actions.companyDetail(symbol));
        fetchIsAddedWatchList(symbol);
      }
    }
  }, [symbol]);

  useEffect(() => {
    getStockBasicInfo();
    dispatch(setPreviousTechnicalSymbol(company?.[0]?.symbol));
  }, [company]);

  const [isDivClicked, setIsDivClicked] = useState(false);

  const handleDivClick = () => {
    setIsDivClicked(true);
  };
  const buttonClassName =
    "border-[1px] border-primary flex gap-1 h-[33px] rounded lg:px-2 lg:py-2 px-2 py-3 text-primary hover:bg-text-primary";

  const boldPercentage = (text) => {
    const depositText = text;
    const boldPercentage = (text) => {
      const regex = /(\d+(\.\d+)?%)/g;
      return text?.replace(regex, "<strong>$&</strong>");
    };
    const formattedText = boldPercentage(depositText);
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  // sorting data for financial for life-insurance
  let sortedData = {};
  const data = allRatios?.companyBarChart;
  let allYears = new Set();
  for (let key in data) {
    data[key]?.forEach((item) => {
      let year = Object.keys(item)[0];
      allYears?.add(year);
    });
  }
  allYears = Array?.from(allYears)
    ?.map(Number)
    ?.sort((a, b) => a - b);

  for (let key in data) {
    sortedData[key] = allYears?.map((year) => {
      let item = data[key]?.find((item) => item[year]);
      return item ? { [year]: item[year]?.toFixed(2) } : {};
    });
  }

  let formattedDate;
  if (company?.length > 0) {
    const dateString = company[0]?.lastUpdatedDateTime;
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    formattedDate = date.toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div className="bg-white px-[10px]">
        {disabledCompanies.includes(symbol) ? (
          <>
            <div className="mt-[100px] text-center">
              <img src={comingSoon} alt="coming soon" />
              <h1 className="text-[20px] font-[500]">Coming Soon..!</h1>
            </div>
          </>
        ) : (
          <div>
            {isCompanyloading ? (
              <div className="flex flex-col  items-center justify-center h-screen">
                <div className="animate-spin mt-[-100px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
                <span className="ml-2 font-semibold text-primary   animate-pulse">
                  Loading...
                </span>
              </div>
            ) : (
              <>
                <div className="p-5">
                  <div className="flex  items-end">
                    <div className="lg:w-[50px] w-[60px] lg:h-[46px] h-[140px] rounded-[50%] border-2px p-[2px] border-pink-300">
                      {company && (
                        <img
                          src={`${
                            company[0]?.symbol
                              ? `https://peridotnepal.xyz/company_logo/${company[0]?.symbol}.webp`
                              : "https://peridotnepal.xyz/company_logo/sarallagani.webp"
                          }`}
                          onError={(e) => {
                            e.target.src =
                              "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                          }}
                          className="rounded-full w-full h-full"
                          style={{ aspectRatio: "1/1" }}
                          alt={company[0]?.symbol}
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-3xl lg:text-[1.25rem] font-[700] mt-8 block lg:inline sm:inline lg:mt-5 text-primary">
                        &nbsp;
                        {company && company[0]?.symbol}
                      </span>
                    </div>
                    <div onClick={handleDivClick} className="ml-[20px]">
                      <WatchListButton
                        id={symbol}
                        isDivClicked={isDivClicked}
                        company={company}
                        currentUser={currentUser}
                        isLoggedIn={isLoggedIn}
                        buttonClassName={buttonClassName}
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="flex gap-4 text-3xl lg:text-sm font-normal my-[10px] lg:py-[2px] border-black ">
                        <span>
                          <Tag color="blue" className="px-2 py-1">
                            {company &&
                              (company[0]?.instrumentType === "Mutual Funds"
                                ? company[0]?.instrumentType
                                : company[0]?.sectorName)}
                          </Tag>
                        </span>
                        <span>
                          {company && company[0]?.cap_type ? (
                            <>
                              <Tag color="blue" className="px-2 py-1">
                                {company[0]?.cap_type}
                              </Tag>
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="font-[700] text-3xl lg:text-[1.55rem]">
                          {company &&
                            `Rs. ${formatMoney(company[0]?.lastTradedPrice)}`}
                        </span>
                        <span>
                          {company && company[0]?.length > 0 ? (
                            <span
                              className={
                                (company[0]?.schange > 0
                                  ? "text-success"
                                  : company[0]?.schange < 0
                                  ? "text-danger"
                                  : "text-info") + " lg:text-sm text-4xl ml-2"
                              }
                            >
                              {formatMoney(company[0]?.schange)}(
                              {company[0]?.perChange?.toFixed(2)} %)
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                        <span className="block text-gray-600 text-xs pt-[3px]">
                          {formattedDate ? `as of ${formattedDate}` : " "}
                          {company &&
                            company[0]?.lastUpdatedDateTime
                              ?.split("T")[1]
                              ?.split(".")[0]}
                        </span>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                          {company?.length > 0 && (
                            <>
                              <div className="px-4 text-center mb-[10px] py-[10px] bg-[#70ccbd33] text-[#22ab94] rounded-[8px]">
                                <div>
                                  <p className="text-[#3a3a3a] font-[500] lg:text-xs text-2xl">
                                    OPEN
                                  </p>
                                  <p className="font-[600] lg:text-lg text-xl">
                                    {company[0]?.openPrice}
                                  </p>
                                </div>
                              </div>
                              <div className="px-4 text-center mb-[10px] py-[10px] bg-[#70ccbd33] text-[#22ab94] rounded-[8px]">
                                <div>
                                  <p className="text-[#3a3a3a] font-[500] lg:text-xs text-2xl">
                                    LOW
                                  </p>
                                  <p className="font-[600] lg:text-lg text-xl">
                                    {company[0]?.lowPrice}
                                  </p>
                                </div>
                              </div>
                              <div className="px-4 text-center mb-[10px] py-[10px] bg-[#70ccbd33] text-[#22ab94] rounded-[8px]">
                                <div>
                                  <p className="text-[#3a3a3a] font-[500] lg:text-xs text-2xl">
                                    HIGH
                                  </p>
                                  <p className="font-[600] lg:text-lg text-xl">
                                    {company[0]?.highPrice}
                                  </p>
                                </div>
                              </div>
                              <div className="px-4 text-center mb-[10px] py-[10px] bg-[#70ccbd33] text-[#22ab94] rounded-[8px]">
                                <div>
                                  <p className="text-[#3a3a3a] font-[500] lg:text-xs text-2xl">
                                    Previous close
                                  </p>
                                  <p className="font-[600] lg:text-lg text-xl">
                                    {company[0]?.previousClose}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[30px] pl-3">
                  <div className="flex">
                    <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                      {" "}
                      Performance
                    </h2>
                    <Tooltip
                      title="Compare with industry avg"
                      trigger="hover"
                      className="ml-[6px] mt-[8px]"
                    >
                      <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                    </Tooltip>
                  </div>
                  {companyListLoading ? (
                    <Skeleton className="w-full" />
                  ) : (
                    <div className="grid grid-cols-2 gap-4 ">
                      {basicInfo?.length > 0 &&
                        basicInfo?.map((item, index) => {
                          return (
                            <>
                              <div className="px-4 text-center mb-[10px] py-[10px] bg-[#70ccbd33] text-[#22ab94] rounded-[8px]">
                                <div>
                                  <p className="text-[#3a3a3a] font-[500] lg:text-xs text-2xl">
                                    {item?.name}
                                  </p>
                                  <p className="font-[600] lg:text-lg text-xl">
                                    {item?.ratio_value?.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  )}
                </div>

                <div className="bg-secondary pl-3 py-5 mb-[40px]">
                  <div className="flex justify-between items-center pb-[30px] ">
                    <h1 className="text-2xl font-bold lg:text-lg uppercase">
                      Quick Synopsis
                    </h1>
                    <p>
                      <Tag color="cyan">
                        {" "}
                        as of {quickSypnosisList?.quarter},{" "}
                        {quickSypnosisList?.year}{" "}
                      </Tag>
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 max-h-[300px] overflow-y-scroll">
                    <div className="">
                      {isLoggedIn ? (
                        <>
                          {quickSypnosisList?.dataList?.map((syp, id) => {
                            if (syp) {
                              return (
                                <>
                                  <div key={id} className="flex gap-5">
                                    <div>
                                      {syp && syp.is_good ? (
                                        <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                      ) : (
                                        <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex items-start gap-2">
                                        <h1 className="lg:text-sm text-2xl font-semibold">
                                          {syp?.title}
                                        </h1>
                                        <Tooltip
                                          className="cursor-pointer"
                                          title={
                                            syp?.qs_description +
                                            ` (${syp?.performance})`
                                          }
                                        >
                                          <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                        </Tooltip>
                                      </div>
                                      <div>
                                        <span className="lg:text-sm text-2xl font-extralight">
                                          {boldPercentage(syp?.description)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          })}
                        </>
                      ) : (
                        <>
                          {quickSypnosisList?.dataList
                            ?.slice(0, 3)
                            ?.map((syp, id) => {
                              if (syp) {
                                return (
                                  <>
                                    <div key={id} className="flex gap-5">
                                      <div>
                                        {syp && syp.is_good ? (
                                          <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                        ) : (
                                          <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                        )}
                                      </div>
                                      <div>
                                        <div className="flex items-start gap-2">
                                          <h1 className="lg:text-sm text-2xl font-semibold">
                                            {syp?.title}
                                          </h1>
                                          <Tooltip
                                            className="cursor-pointer"
                                            title={
                                              syp?.qs_description +
                                              ` (${syp?.performance})`
                                            }
                                          >
                                            <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                          </Tooltip>
                                        </div>
                                        <div>
                                          <span className="lg:text-sm text-2xl font-extralight">
                                            {boldPercentage(syp?.description)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            })}
                          <div className="relative mb-24 flex  flex-col">
                            <div className="flex justify-center  w-full ">
                              <Link className="z-20" href="/login">
                                <button className="bg-primary hover:bg-primary-2 font-serif mt-24 lg:mt-32 w-28 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center">
                                  Log in
                                  <span className="text-red-600 text-3xl lg:text-xl ml-2">
                                    <AiFillLock />
                                  </span>
                                </button>
                              </Link>
                            </div>
                            <div
                              className="absolute grid w-auto py-5 gap-6 inset-0 border-[2px] bg-[#ffffff] opacity-40"
                              style={{ filter: "blur(3px)" }}
                            >
                              {quickSypnosisList?.dataList
                                ?.slice(0, 3)
                                ?.map((syp, id) => {
                                  if (syp) {
                                    return (
                                      <>
                                        <div key={id} className="flex gap-5">
                                          <div>
                                            {syp && syp.is_good ? (
                                              <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                            ) : (
                                              <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                            )}
                                          </div>
                                          <div>
                                            <div className="flex items-start gap-2">
                                              <h1 className="lg:text-sm text-2xl font-semibold">
                                                {syp?.title}
                                              </h1>
                                              <Tooltip
                                                className="cursor-pointer"
                                                title={
                                                  syp?.qs_description +
                                                  ` (${syp?.performance})`
                                                }
                                              >
                                                <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                              </Tooltip>
                                            </div>
                                            <div>
                                              <span className="lg:text-sm text-2xl font-extralight">
                                                {boldPercentage(
                                                  syp?.description
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {allRatios[0] !== "no data" && (
                  <>
                    {company && company[0]?.sectorName != "Others" && (
                      <>
                        <div className="bg-secondary pl-3 py-5">
                          <div className="flex justify-between">
                            <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                              Financials
                            </h2>
                            <p>
                              <Tag color="cyan">
                                {" "}
                                as of {quickSypnosisList?.year}{" "}
                              </Tag>
                            </p>
                          </div>

                          <div className="pl-[-12px]">
                            {company[0]?.sectorName === "Development Banks" ||
                            company[0]?.sectorName === "Micro Finance" ||
                            company[0]?.sectorName === "Finance" ||
                            company[0]?.sectorName === "Finance" ||
                            company[0]?.sectorName === "Commercial Banks" ? (
                              <>
                                <div className="mb-[30px]">
                                  <BarChart
                                    deposit={marketSharesDepost?.depositData}
                                    loan={marketSharesLoan?.loanData}
                                    legend={["Deposit", "Loan"]}
                                  />
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            <div className="pl-[-12px]">
                              <IncomeBreakdownBarChart
                                companyBarChart={sortedData}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
