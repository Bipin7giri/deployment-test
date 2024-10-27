/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
// import Blink from "react-blink-text";
import actions from "./redux/actions";
import BasicInfo from "./BasicInfo";
import Finacial from "./Financial";
import Dividend from "./Dividend";
import News from "./News";
import Ratio from "./Ratio";
import camelAltmanConfig from "../../../config/camelAltmanConfig.json";
import PeerComparision from "./PeerComparision";
import api from "../../../api/axios";
import BreakDown from "./BreakDown";
import GaugeChart from "react-gauge-chart";
import { AiOutlineInfoCircle } from "react-icons/ai";
import moment from "moment";
import "moment-timezone";
import {
  formatMoney,
  formatMoneyForLTPInCompany,
} from "../../../utils/formatMoney";
import { Helmet } from "react-helmet";
import { Skeleton, Tag, Tooltip } from "antd";
import MutualFundHoldings from "./component/MutualFunds/MutualFundHoldings";
import MutalFundBreakDown from "./component/MutualFunds/MutalFundBreakDown";
import { AiFillLock, AiFillStar, AiOutlineLineChart } from "react-icons/ai";
import WatchListButton from "./component/WatchListButton";
import { MutualFundsFinancials } from "./component/MutualFunds/MutualFundsFinancials";
import BreakdownBySymbol from "../../broker/breakdownTopFiveSymbol/[id]/BreakdownBySymbol";
import { FaBalanceScaleLeft } from "react-icons/fa";
import MutualFundPeerComparision from "./MutualFundPeerComparision";
import DebenturesPeerComparision from "./component/Debentures/DebenturesPeerComparision";
import DebenturesBasicInfo from "./component/Debentures/DebenturesBasicInfo";
import Rating from "./Rating";
import InsuranceFinancial from "./InsuranceFinancial";
import PriceHistory from "./component/PriceHistory";
import { getTechnicalMeterDescription } from "./helpers";
import Floorsheet from "./component/FloorSheet";
import AlertButton from "./component/AlertButton";
import { StockBasicInfo } from "@/app/technicalchart/_components/StockBasicInfo";

const {
  activation,
  blacklistedInstrumenType,
  blackListedSector,
  whiteListedSectorForCamel,
} = camelAltmanConfig;

const Company = ({ id }) => {
  const router = useRouter();
  let singleCompanyLiveData = [];
  const dispatch = useDispatch();
  const {
    company,
    loading,
    altMan,
    companyLiveData,
    industryAvg,
    isCompanyloading,
    altmanCamelLoading,
    mutualFundsPL,
    mutualFundsInvestmentByCompanies,
    quickSypnosisList,
    selectedCompany,
    camelRatingIndividual,
    tradingMeterPercentage,
  } = useSelector((state) => state.company);
  const { isLoggedIn, is_subscribed, currentUser } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   dispatch(setSelectedCompany(company?.[0]?.symbol))
  // }, [company?.[0]?.symbol])

  const [isWatchListAdded, setWatchListAdded] = useState();
  if (companyLiveData?.length > 0) {
    for (let i = 0; i < companyLiveData?.ength; i++) {
      if (companyLiveData[i].symbol === id) {
        singleCompanyLiveData.push(companyLiveData[i]);
      }
    }
  }
  const [routeActive, setRouteActive] = useState(0);
  const companyRoutes = [
    "Basic info",
    "Analytics",
    "Floorsheet",
    "Rating",
    "Broker",
    "Holdings",
    "Financials",
    "Peer Comparison",
    "Ratio",
    "Statistics",
    "News",
    "Price History",
  ];
  const deventureRoutes = ["Basic info", "Floorsheet", "Peer Comparison"];
  const promotersShareRoutes = ["Basic info", "Floorsheet", "News"];

  const buttonClassName =
    "border-[1px] border-primary flex gap-1 h-[33px]  rounded lg:px-2 lg:py-2 px-2 py-6 text-primary hover:bg-text-primary";
  const [navbarClass, setNavbarClass] = useState("relative");

  const [isDivClicked, setIsDivClicked] = useState(false);

  const handleDivClick = () => {
    setIsDivClicked(true);
  };

  const fetchIsAddedWatchList = async (id) => {
    if (isLoggedIn) {
      const res = await api.get(`/watchlist/checkifexist/${id}`);
      if (res) {
        setWatchListAdded(res.data.data);
      }
    }
  };

  const ogImageUrl = `https://peridotnepal.xyz/company_logo/${company?.[0]?.symbol}.webp`;

  useEffect(() => {
    dispatch(actions.companyDetail(id));
  }, [id]);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = () => {
      dispatch(actions.companyDetailForPolling(id));
      dispatch(actions.companyTradingMeter(id));
      fetchIsAddedWatchList(id);
    };

    // Fetch data initially
    fetchData();

    const fetchAndPollData = () => {
      // Calculate the start and end times for the polling schedule
      const nepaliTimezone = "Asia/Kathmandu";
      const startTime = moment("10:30 AM", "hh:mm A").tz("Asia/Kathmandu");
      const endTime = moment("3:30 PM", "hh:mm A").tz("Asia/Kathmandu");

      // Get the current day of the week
      const today = moment().tz(nepaliTimezone).day();

      // Get the current time in the Nepal timezone
      const currentTime = moment().tz(nepaliTimezone);

      // Check if the current day and time fall within the polling schedule (Sunday to Thursday)
      const isWithinSchedule =
        today >= 0 && today <= 4 && currentTime.isBetween(startTime, endTime);

      if (isWithinSchedule) {
        // Set up the interval to run fetchData every 10 seconds
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval); // Clear the interval when the component is unmounted
      }

      return undefined; // Return nothing if outside the polling schedule
    };

    const cleanupFunction = fetchAndPollData();
    return cleanupFunction;
  }, [id, isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.pageYOffset > 100) {
          setNavbarClass(
            "lg:bg-secondary left-0 lg:px-28 2lg:px-[14%] w-full z-40 pt-2 lg:shadow-xl "
          );
        } else {
          setNavbarClass("relative");
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    };
  }, []);

  const dateString = company?.[0]?.lastUpdatedDateTime;
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  // MUTUAL FUNDS
  useEffect(() => {
    if (company?.[0]?.instrumentType === "Mutual Funds") {
      dispatch(actions.getMutualFundsPL({ symbol: company[0]?.symbol }));
      dispatch(actions.getMutualFundsBalance({ symbol: company?.[0]?.symbol }));
      dispatch(
        actions.getMutualFundsInvestment({ symbol: company?.[0]?.symbol })
      );
      dispatch(
        actions.getMutualFundsTopInvestmentSector({
          symbol: company?.[0]?.symbol,
        })
      );
    }
  }, [company?.[0]]);

  function getTradingMeter(value) {
    const range = 100 / 3;

    switch (true) {
      case value >= 0 && value <= range:
        return { text: "Fear", color: "#FF5656" };
      case value > range && value <= 2 * range:
        return { text: "Neutral", color: "#0000FF" };
      case value > 2 * range && value <= 100:
        return { text: "Greed", color: "#30AD43" };
      default:
        return { text: "", color: "" };
    }
  }

  // scroll to top
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // You can use 'auto' instead of 'smooth' for instant scrolling
      });
    }
  }, [id]);

  // debentures
  useEffect(() => {
    if (
      company?.[0] !== null &&
      company?.[0] !== undefined &&
      company?.[0]?.instrumentType === "Non-Convertible Debentures"
    ) {
      dispatch(actions.getDeventuresData({ symbol: company?.[0]?.symbol }));
      dispatch(actions.getDeventuresPeerComparision());
    }
  }, [company?.[0]]);

  // mutual funds Holdings
  useEffect(() => {
    if (
      company?.[0] !== null &&
      company?.[0] !== undefined &&
      company?.[0]?.instrumentType === "Equity"
    )
      if (isLoggedIn && is_subscribed) {
        dispatch(
          actions.getMutualFundsHoldingsByStock({
            symbol: company?.[0]?.symbol,
            sector: company?.[0]?.sectorName,
          })
        );
      }
  }, [company?.[0]]);

  const averageCamelRating =
    camelRatingIndividual?.data?.length > 0 &&
    camelRatingIndividual?.data?.reduce(
      (accumulator, currentData) => accumulator + currentData.value,
      0
    ) / camelRatingIndividual?.data?.length;
  const unformattedAltmanValue =
    altMan?.data?.length > 0 && parseFloat(altMan?.data?.[0]?.value);
  const altmanRating = isNaN(unformattedAltmanValue)
    ? "N/A"
    : (unformattedAltmanValue * 1).toFixed(1);

  const navigateToRating = () => {
    if (
      company?.[0]?.instrumentType !== "Mutual Funds" &&
      company?.[0]?.instrumentType !== "Non-Convertible Debentures" &&
      company?.[0]?.sectorName !== "Promoters Share"
    ) {
      if (!quickSypnosisList?.dataList?.length > 0) {
        setRouteActive(1);
      } else {
        setRouteActive(2);
      }
    }
  };

  useEffect(() => {
    if (
      activation &&
      blacklistedInstrumenType.item.includes(
        company?.[0][blacklistedInstrumenType?.label]
      ) &&
      !blackListedSector?.item?.includes(company?.[0][blackListedSector?.label])
    ) {
      if (
        whiteListedSectorForCamel?.item?.includes(
          company?.[0][whiteListedSectorForCamel?.label]
        )
      ) {
        //for camel
        dispatch(
          actions.getCamelRatingIndividual({ symbol: company[0]?.symbol })
        );
      } else {
        //for altman
        dispatch(
          actions.getAltmanRatingIndividual({ symbol: company[0]?.symbol })
        );
      }
    }
  }, [company]);

  return (
    <div>
      {company?.[0]?.symbol && (
        <Helmet>
          <title>{`${company[0]?.symbol} (${company?.[0]?.companyName} ) | ${company?.[0]?.sectorName} | Saral Lagani`}</title>
          <meta charset="UTF-8" />
          <link
            rel="icon"
            type="image/svg+xml"
            href="../src/assets/icon/logo.png"
          />
          <meta property="og:image" content={ogImageUrl} />
          <meta
            property="og:title"
            content={`${id}(${company?.[0]?.companyName} ) | ${company?.[0]?.sectorName} | Saral Lagani`}
          />
          <meta
            property="og:description"
            content={`Get a complete financial knowledge on ${id}. Analyze all the different financial and ratio of the company`}
          />
          <meta
            name="description"
            content={`Get a complete financial knowledge on ${id}. Analyze all the different financial and ratio of the company`}
          />
          <meta
            name="keywords"
            content="Stock Screener, analyze company, NEPSE, company screener, stock compare"
          />
          <meta property="og:url" content="https://sarallagani.com/" />
        </Helmet>
      )}
      {company?.[0]?.instrumentType === "Non-Convertible Debentures" ? (
        <>
          <div className="lg:container relative  px-10  lg:px-10 mx-auto">
            <div className="lg:container relative mx-auto pt-[20px] break-down">
              <div className="flex justify-between flex-col lg:flex-row start rounded-[20px] border-[1px] px-[10px] py-[10px] bg-secondary">
                <div className="flex lg:flex-row flex-col my-5 items-start gap-5">
                  {isCompanyloading ? (
                    <>
                      <div className="flex gap-4">
                        <div className="h-14 w-14 bg-[#dfdfdf] rounded-full animate-pulse"></div>
                        <div>
                          <div className="h-4 bg-[#dbdbdb] rounded animate-pulse  w-[400px]"></div>
                          <div className="h-4 my-1 bg-gray-200 rounded animate-pulse  w-[400px]"></div>
                          <div className="h-4 bg-[#d4d3d3] rounded animate-pulse  w-[400px]"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:w-[78px] w-[200px] lg:h-[70px] h-[140px] ">
                        <img
                          src={`${
                            `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                              ? `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                              : "https://sarallagani.xyz/company_logo/sarallagani.webp"
                          }`}
                          onError={(e) => {
                            e.target.src =
                              "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                          }}
                          className="rounded-full w-full h-full"
                          style={{ aspectRatio: "1/1" }}
                          alt={`${company[0]?.symbol}`}
                        />
                      </div>
                      <div>
                        <div className="flex gap-3">
                          <h2 className="lg:text-[2.25rem] text-2xl font-[700]">
                            {company[0]?.companyName}
                            <span className="text-3xl lg:text-[1.5rem] font-[600] mt-8 block lg:inline sm:inline lg:mt-5 text-[#a3a3a3]">
                              &nbsp;
                              {company[0]?.symbol}
                            </span>
                          </h2>
                          <div onClick={handleDivClick}>
                            <WatchListButton
                              id={id}
                              isDivClicked={isDivClicked}
                              company={company}
                              currentUser={currentUser}
                              isLoggedIn={isLoggedIn}
                              buttonClassName={buttonClassName}
                            />
                          </div>
                          <Tooltip title="Technical Chart" trigger="hover">
                            <Link
                              href={`/technicalchart?symbol=${id}`}
                              target="_blank"
                              className={`${buttonClassName} hover:bg-primary text-primary font-bold hover:text-secondary`}
                            >
                              <AiOutlineLineChart />
                              <span className="font-bold text-xs">
                                Technical Chart
                              </span>
                            </Link>
                          </Tooltip>
                          {/* <div>
                            <AlertButton
                              symbol={company[0]?.symbol}
                              buttonClassName={buttonClassName}
                            />
                          </div> */}
                        </div>
                        <div>
                          <div className="flex gap-4 text-3xl lg:text-sm font-normal my-[10px] lg:py-[2px] border-black ">
                            <span className="lg:text-xs text-2xl">
                              <Tag
                                color="blue"
                                className="px-2 py-1 lg:text-xs text-xl"
                              >
                                {company?.[0]?.instrumentType ===
                                  "Mutual Funds" || "Non-Convertible Debentures"
                                  ? company?.[0]?.instrumentType
                                  : company?.[0]?.sectorName}{" "}
                              </Tag>
                            </span>
                          </div>
                          <div>
                            <span className="font-[700] text-3xl lg:text-[1.75rem">
                              Rs.{" "}
                              {company[0]?.lastTradedPrice >= 0 ||
                              company[0]?.lastTradedPrice < 0
                                ? formatMoneyForLTPInCompany(
                                    company[0]?.lastTradedPrice
                                  )
                                : "-"}
                            </span>
                            <span>
                              {company[0]?.length > 0 ? (
                                <span
                                  className={
                                    (company[0]?.schange > 0
                                      ? "text-success"
                                      : company[0]?.schange < 0
                                      ? "text-danger"
                                      : "text-info") +
                                    " lg:text-lg text-4xl ml-2"
                                  }
                                >
                                  {formatMoneyForLTPInCompany(
                                    company[0]?.schange
                                  )}
                                  ({company[0]?.perChange?.toFixed(2)} %)
                                </span>
                              ) : (
                                <span
                                  className={`${
                                    company[0]?.schange > 0
                                      ? "text-success"
                                      : company[0]?.schange < 0
                                      ? "text-danger"
                                      : "text-info"
                                  } font-medium lg:text-lg text-4xl  ml-2`}
                                >
                                  {company[0]?.schange >= 0 ||
                                  company[0]?.schange < 0
                                    ? formatMoneyForLTPInCompany(
                                        company[0]?.schange
                                      )
                                    : "-"}{" "}
                                  (
                                  {company[0]?.perChange >= 0 ||
                                  company[0]?.perChange < 0
                                    ? company[0]?.perChange?.toFixed(2)
                                    : "-"}
                                  %)
                                </span>
                              )}
                            </span>
                            <span className="block text-gray-600 text-xl lg:text-sm pt-[4px]">
                              as of {formattedDate}{" "}
                              {
                                company[0]?.lastUpdatedDateTime
                                  ?.split("T")[1]
                                  ?.split(".")[0]
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:container lg:mx-auto mx-auto ">
              {isCompanyloading ? (
                <>
                  <div>
                    <div className="w-full">
                      {" "}
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`bg-secondary relative top-[-17px] pt-[10px] rounded-b-[20px] border-r-[1px] border-l-[1px] border-b-[1px] flex items-center lg:block   shadow-none  lg:shadow-xs`}
                >
                  <span className="text-5xl animate-pulse lg:hidden px-2 pb-3 text-gray-500 font-bold ">
                    {"<"}
                  </span>
                  <ul className="mx-5 flex p-3 lg:p-0 lg:bg-none lg:w-auto snap-x-mandatory  overflow-x-auto whitespace-nowrap items-center gap-10  ">
                    {/* DeventureRoutes */}
                    {deventureRoutes?.map((route, id) => {
                      return (
                        <>
                          <li
                            style={{ fontFamily: "poppins" }}
                            className={`text-primary   lg:text-[15px] text-[30px] px-[5px] pt-3 mt-[-12px]  cursor-pointer`}
                          >
                            <button
                              onClick={() => {
                                setRouteActive(id);
                              }}
                              style={{ paddingBottom: "14px" }}
                              className={`${
                                routeActive === route
                                  ? "text-primary"
                                  : "text-primary  Primary"
                              }`}
                            >
                              {route}
                            </button>
                            {routeActive === id && (
                              <div className="border-[#000000] ml-[-5px] w-[115%]  border-b-[3px]"></div>
                            )}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                  <span className="lg:hidden  animate-pulse text-5xl text-gray-500  pl-5 pb-3 font-bold ">
                    {">"}
                  </span>
                  {/* <div className=" mx-5 border-b-[3px] mt-[-11px]  border-[#dadaee]"></div> */}
                </div>
              )}
              {/* Debenture Company Details */}
              <div className="mt-5">
                {isCompanyloading ? (
                  <>
                    <div>
                      <div className="w-full">
                        {" "}
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {routeActive === 0 && <DebenturesBasicInfo />}
                    {routeActive === 1 && <Floorsheet symbol={id} />}
                    {routeActive === 2 && <DebenturesPeerComparision />}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : company?.[0]?.sectorName === "Promoters Share" ? (
        <div className="lg:container relative  px-10  lg:px-10 mx-auto">
          <div className="lg:container relative mx-auto pt-[20px] break-down">
            <div className="flex justify-between flex-col lg:flex-row start rounded-[20px] border-[1px] px-[10px] py-[10px] bg-secondary">
              <div className="flex lg:flex-row flex-col my-5 items-start gap-5">
                {isCompanyloading ? (
                  <>
                    <div className="flex gap-4">
                      <div className="h-14 w-14 bg-[#dfdfdf] rounded-full animate-pulse"></div>
                      <div>
                        <div className="h-4 bg-[#dbdbdb] rounded animate-pulse  w-[400px]"></div>
                        <div className="h-4 my-1 bg-gray-200 rounded animate-pulse  w-[400px]"></div>
                        <div className="h-4 bg-[#d4d3d3] rounded animate-pulse  w-[400px]"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:w-[78px] w-[200px] lg:h-[70px] h-[140px] ">
                      <img
                        src={`${
                          `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                            ? `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                            : "https://sarallagani.xyz/company_logo/sarallagani.webp"
                        }`}
                        onError={(e) => {
                          e.target.src =
                            "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                        }}
                        className="rounded-full w-full h-full"
                        style={{ aspectRatio: "1/1" }}
                        alt={`${company[0]?.symbol}`}
                      />
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <h2 className="lg:text-[2.25rem] text-2xl font-[700]">
                          {company[0]?.companyName}
                          <span className="text-3xl lg:text-[1.5rem] font-[600] mt-8 block lg:inline sm:inline lg:mt-5 text-[#a3a3a3]">
                            &nbsp;
                            {company[0]?.symbol}
                          </span>
                        </h2>
                        <div onClick={handleDivClick}>
                          <WatchListButton
                            id={id}
                            isDivClicked={isDivClicked}
                            company={company}
                            currentUser={currentUser}
                            isLoggedIn={isLoggedIn}
                            buttonClassName={buttonClassName}
                          />
                        </div>
                        <Tooltip title="Technical Chart" trigger="hover">
                          <Link
                            href={`/technicalchart?symbol=${id}`}
                            target="_blank"
                            className={`${buttonClassName} hover:bg-primary text-primary font-bold hover:text-secondary`}
                          >
                            <AiOutlineLineChart />
                            <span className="font-bold text-xs">
                              Technical Chart
                            </span>
                          </Link>
                        </Tooltip>
                        {/* <div>
                          <AlertButton
                            symbol={company[0]?.symbol}
                            buttonClassName={buttonClassName}
                          />
                        </div> */}
                      </div>
                      <div>
                        <div className="flex gap-4 text-3xl lg:text-sm font-normal my-[10px] lg:py-[2px] border-black ">
                          <span className="lg:text-xs text-2xl">
                            <Tag
                              color="blue"
                              className="px-2 py-1 lg:text-xs text-xl"
                            >
                              {company[0]?.instrumentType === "Mutual Funds" ||
                              "Non-Convertible Debentures"
                                ? company[0]?.instrumentType
                                : company[0]?.sectorName}{" "}
                            </Tag>
                          </span>
                        </div>
                        <div>
                          <span className="font-[700] text-3xl lg:text-[1.75rem">
                            Rs.{" "}
                            {company[0]?.lastTradedPrice >= 0 ||
                            company[0]?.lastTradedPrice < 0
                              ? formatMoneyForLTPInCompany(
                                  company[0]?.lastTradedPrice
                                )
                              : "-"}
                          </span>
                          <span>
                            {company[0]?.length > 0 ? (
                              <span
                                className={
                                  (company[0]?.schange > 0
                                    ? "text-success"
                                    : company[0]?.schange < 0
                                    ? "text-danger"
                                    : "text-info") + " lg:text-lg text-4xl ml-2"
                                }
                              >
                                {formatMoneyForLTPInCompany(
                                  company[0]?.schange
                                )}
                                ({company[0]?.perChange?.toFixed(2)} %)
                              </span>
                            ) : (
                              <span
                                className={`${
                                  company[0]?.schange > 0
                                    ? "text-success"
                                    : company[0]?.schange < 0
                                    ? "text-danger"
                                    : "text-info"
                                } font-medium lg:text-lg text-4xl  ml-2`}
                              >
                                {company[0]?.schange >= 0 ||
                                company[0]?.schange < 0
                                  ? formatMoneyForLTPInCompany(
                                      company[0]?.schange
                                    )
                                  : "-"}{" "}
                                (
                                {company[0]?.perChange >= 0 ||
                                company[0]?.perChange < 0
                                  ? company[0]?.perChange?.toFixed(2)
                                  : "-"}
                                %)
                              </span>
                            )}
                          </span>
                          <span className="block text-gray-600 text-xl lg:text-sm pt-[4px]">
                            as of {formattedDate}{" "}
                            {
                              company[0]?.lastUpdatedDateTime
                                ?.split("T")[1]
                                ?.split(".")[0]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:container lg:mx-auto mx-auto ">
            {isCompanyloading ? (
              <>
                <div>
                  <div className="w-full">
                    {" "}
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                </div>
              </>
            ) : (
              <div
                className={`bg-secondary relative top-[-17px] pt-[10px] rounded-b-[20px] border-r-[1px] border-l-[1px] border-b-[1px] flex items-center lg:block   shadow-none  lg:shadow-xs`}
              >
                <span className="text-5xl animate-pulse lg:hidden px-2 pb-3 text-gray-500 font-bold ">
                  {"<"}
                </span>
                <ul className="mx-5 flex p-3 lg:p-0 lg:bg-none lg:w-auto snap-x-mandatory  overflow-x-auto whitespace-nowrap items-center gap-10  ">
                  {promotersShareRoutes?.map((route, id) => {
                    return (
                      <>
                        <li
                          style={{ fontFamily: "poppins" }}
                          className={`text-primary   lg:text-[15px] text-[30px] px-[5px] pt-3 mt-[-12px]  cursor-pointer`}
                        >
                          <button
                            onClick={() => {
                              setRouteActive(id);
                            }}
                            style={{ paddingBottom: "14px" }}
                            className={`${
                              routeActive === route
                                ? "text-primary"
                                : "text-primary  Primary"
                            }`}
                          >
                            {route}
                          </button>
                          {routeActive === id && (
                            <div className="border-[#000000] ml-[-5px] w-[115%]  border-b-[3px]"></div>
                          )}
                        </li>
                      </>
                    );
                  })}
                </ul>
                <span className="lg:hidden  animate-pulse text-5xl text-gray-500  pl-5 pb-3 font-bold ">
                  {">"}
                </span>
              </div>
            )}
            {/* Company Details */}
            <div className="mt-5">
              {isCompanyloading ? (
                <>
                  <div>
                    <div className="w-full">
                      {" "}
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {routeActive === 0 && (
                    <BasicInfo
                      singleCompanyLiveData={company}
                      industryAvg={industryAvg}
                      id={id}
                      sector={company?.[0]?.sectorName}
                    />
                  )}
                  {routeActive === 1 && <Floorsheet symbol={id} />}
                  {routeActive === 2 && <News symbol={id} />}
                </>
              )}
            </div>
          </div>
        </div>
      ) : company?.[0]?.status && company[0]?.status !== "A" ? (
        <div className="lg:container relative  px-10  lg:px-10 mx-auto">
          <div className="lg:container relative mx-auto pt-[20px] break-down">
            <div className="flex justify-between flex-col lg:flex-row start rounded-[20px] border-[1px] px-[10px] py-[10px] bg-secondary">
              <div className="flex lg:flex-row flex-col my-5 items-start gap-5">
                {isCompanyloading ? (
                  <>
                    <div className="flex gap-4">
                      <div className="h-14 w-14 bg-[#dfdfdf] rounded-full animate-pulse"></div>
                      <div>
                        <div className="h-4 bg-[#dbdbdb] rounded animate-pulse  w-[400px]"></div>
                        <div className="h-4 my-1 bg-gray-200 rounded animate-pulse  w-[400px]"></div>
                        <div className="h-4 bg-[#d4d3d3] rounded animate-pulse  w-[400px]"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:w-[78px] w-[200px] lg:h-[70px] h-[140px] ">
                      <img
                        src={`${
                          `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                            ? `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                            : "https://sarallagani.xyz/company_logo/sarallagani.webp"
                        }`}
                        onError={(e) => {
                          e.target.src =
                            "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                        }}
                        className="rounded-full w-full h-full"
                        style={{ aspectRatio: "1/1" }}
                        alt={`${company[0]?.symbol}`}
                      />
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <h2 className="lg:text-[2.25rem] text-2xl font-[700]">
                          {company[0]?.companyName}
                          <span className="text-3xl lg:text-[1.5rem] font-[600] mt-8 block lg:inline sm:inline lg:mt-5 text-[#a3a3a3]">
                            &nbsp;
                            {company[0]?.symbol}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="flex gap-4 text-3xl lg:text-sm font-normal my-[10px] lg:py-[2px] border-black ">
                          <span className="lg:text-xs text-2xl">
                            <Tag
                              color="blue"
                              className="px-2 py-1 lg:text-xs text-xl"
                            >
                              {company[0]?.instrumentType === "Mutual Funds" ||
                              "Non-Convertible Debentures"
                                ? company[0]?.instrumentType
                                : company[0]?.sectorName}{" "}
                            </Tag>
                          </span>
                        </div>
                        <div>
                          <span className="font-[700] text-3xl lg:text-[1.75rem">
                            Rs.{" "}
                            {company[0]?.lastTradedPrice >= 0 ||
                            company[0]?.lastTradedPrice < 0
                              ? formatMoneyForLTPInCompany(
                                  company[0]?.lastTradedPrice
                                )
                              : "-"}
                          </span>
                          <span>
                            {company[0]?.length > 0 ? (
                              <span
                                className={
                                  (company[0]?.schange > 0
                                    ? "text-success"
                                    : company[0]?.schange < 0
                                    ? "text-danger"
                                    : "text-info") + " lg:text-lg text-4xl ml-2"
                                }
                              >
                                {formatMoneyForLTPInCompany(
                                  company[0]?.schange
                                )}
                                ({company[0]?.perChange?.toFixed(2)} %)
                              </span>
                            ) : (
                              <span
                                className={`${
                                  company[0]?.schange > 0
                                    ? "text-success"
                                    : company[0]?.schange < 0
                                    ? "text-danger"
                                    : "text-info"
                                } font-medium lg:text-lg text-4xl  ml-2`}
                              >
                                {company[0]?.schange >= 0 ||
                                company[0]?.schange < 0
                                  ? formatMoneyForLTPInCompany(
                                      company[0]?.schange
                                    )
                                  : "-"}{" "}
                                (
                                {company[0]?.perChange >= 0 ||
                                company[0]?.perChange < 0
                                  ? company[0]?.perChange?.toFixed(2)
                                  : "-"}
                                %)
                              </span>
                            )}
                          </span>
                          <span className="block text-gray-600 text-xl lg:text-sm pt-[4px]">
                            as of {formattedDate}{" "}
                            {
                              company[0]?.lastUpdatedDateTime
                                ?.split("T")[1]
                                ?.split(".")[0]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:container lg:mx-auto mx-auto ">
            {isCompanyloading ? (
              <>
                <div>
                  <div className="w-full">
                    {" "}
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                  <div className="w-full">
                    <Skeleton />
                  </div>
                </div>
              </>
            ) : (
              <div
                className={`bg-secondary relative top-[-17px] pt-[10px] rounded-b-[20px] border-r-[1px] border-l-[1px] border-b-[1px] flex items-center lg:block   shadow-none  lg:shadow-xs`}
              >
                <span className="text-5xl animate-pulse lg:hidden px-2 pb-3 text-gray-500 font-bold ">
                  {"<"}
                </span>
                <ul className="mx-5 flex p-3 lg:p-0 lg:bg-none lg:w-auto snap-x-mandatory  overflow-x-auto whitespace-nowrap items-center gap-10  ">
                  {company[0]?.status !== "A" &&
                    companyRoutes
                      ?.filter(
                        (route) =>
                          route !== "Analytics" &&
                          route !== "Basic info" &&
                          route !== "Rating" &&
                          route !== "Broker" &&
                          route !== "Holdings" &&
                          route !== "Peer Comparison"
                      )
                      ?.map((route, id) => {
                        return (
                          <>
                            <li
                              style={{ fontFamily: "poppins" }}
                              className={`text-primary   lg:text-[15px] text-[30px] px-[5px] pt-3 mt-[-12px]  cursor-pointer`}
                            >
                              <button
                                onClick={() => {
                                  setRouteActive(id);
                                }}
                                style={{ paddingBottom: "14px" }}
                                className={`${
                                  routeActive === route
                                    ? "text-primary"
                                    : "text-primary  Primary"
                                }`}
                              >
                                <div className="flex items-center">
                                  {route}
                                  &nbsp;
                                  {route === "Rating" && (
                                    <Tag
                                      color="cyan"
                                      className="lg:text-sm text-2xl"
                                    >
                                      {/* <Blink
                                        color="green"
                                        text="New"
                                        fontSize="25"
                                      >
                                        {" "}
                                      </Blink> */}
                                    </Tag>
                                  )}
                                </div>
                              </button>
                              {routeActive === id && (
                                <div className="border-[#000000] ml-[-5px] w-[115%]  border-b-[3px]"></div>
                              )}
                            </li>
                          </>
                        );
                      })}
                </ul>
                <span className="lg:hidden  animate-pulse text-5xl text-gray-500  pl-5 pb-3 font-bold ">
                  {">"}
                </span>
              </div>
            )}
            {/* Company Details */}
            <div className="mt-5">
              {isCompanyloading ? (
                <>
                  <div>
                    <div className="w-full">
                      {" "}
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {routeActive === 0 && <Floorsheet symbol={id} />}
                  {routeActive === 1 && (
                    <Finacial symbol={id} sector={company?.[0]?.sectorName} />
                  )}
                  {routeActive === 2 && (
                    <Ratio symbol={id} sector={company?.[0]?.sectorName} />
                  )}
                  {routeActive === 3 && <Dividend symbol={id} />}
                  {routeActive === 4 && <News symbol={id} />}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-28 lg:mt-auto  lg:w-full">
            <div className="lg:container relative  px-10  lg:px-10 mx-auto lg:pt-[20px] pt-[60px] break-down">
              <div className="flex justify-between flex-col lg:flex-row start rounded-[20px] border-[1px] px-[10px] py-[10px] bg-secondary">
                <div className="flex lg:flex-row flex-col my-5 items-start gap-5 w-full">
                  {isCompanyloading ? (
                    <>
                      <div className="flex gap-4">
                        <div className="h-14 w-14 bg-[#dfdfdf] rounded-full animate-pulse"></div>
                        <div>
                          <div className="h-4 bg-[#dbdbdb] rounded animate-pulse  w-[400px]"></div>
                          <div className="h-4 my-1 bg-gray-200 rounded animate-pulse  w-[400px]"></div>
                          <div className="h-4 bg-[#d4d3d3] rounded animate-pulse  w-[400px]"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:w-[78px] w-[200px] lg:h-[70px] h-[140px]">
                        <img
                          src={`${
                            `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                              ? `https://sarallagani.xyz/company_logo/${company?.[0]?.symbol}.webp`
                              : "https://sarallagani.xyz/company_logo/sarallagani.webp"
                          }`}
                          onError={(e) => {
                            e.target.src =
                              "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                          }}
                          className="rounded-full w-full h-full"
                          style={{ aspectRatio: "1/1" }}
                          alt={`${company?.[0]?.symbol}`}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex lg:flex-row flex-col gap-3">
                          <h2 className="lg:text-[2.25rem] text-2xl font-[700]">
                            {company?.[0]?.companyName}
                            <span className="text-3xl lg:text-[1.5rem] font-[600] mt-8 block lg:inline sm:inline lg:mt-5 text-[#a3a3a3]">
                              &nbsp;
                              {company?.[0]?.symbol}
                            </span>
                          </h2>
                          <div className="flex gap-3">
                            <div onClick={handleDivClick}>
                              <WatchListButton
                                id={id}
                                isDivClicked={isDivClicked}
                                company={company}
                                currentUser={currentUser}
                                isLoggedIn={isLoggedIn}
                                buttonClassName={buttonClassName}
                              />
                            </div>
                            {company?.[0]?.instrumentType !==
                              "Mutual Funds" && (
                              <Tooltip
                                title="Compare with other stock"
                                trigger="hover"
                              >
                                <button
                                  onClick={() => {
                                    router.push(
                                      `/stock-compare?sectorName=${company?.[0]?.sectorName}&companyName=${company[0]?.symbol}`
                                    );
                                  }}
                                  className={`${buttonClassName} hover:bg-primary text-primary font-bold hover:text-secondary flex items-center `}
                                >
                                  <FaBalanceScaleLeft />
                                  <span className="lg:hidden block lg:text-xs text-2xl">
                                    Stock Compare
                                  </span>
                                </button>
                              </Tooltip>
                            )}

                            <Tooltip title="Technical Chart" trigger="hover">
                              <Link
                                href={`/technicalchart?symbol=${id}`}
                                target="_blank"
                                className={`${buttonClassName} hover:bg-primary text-primary font-bold hover:text-secondary flex items-center`}
                              >
                                <AiOutlineLineChart />
                                <span className="font-bold lg:text-xs text-2xl">
                                  Technical Chart
                                </span>
                              </Link>
                            </Tooltip>
                            {/* <div>
                              <AlertButton
                                symbol={company[0]?.symbol}
                                buttonClassName={buttonClassName}
                              />
                            </div> */}
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <div className="w-full">
                            <div className="flex justify-between items-center">
                              <div className="flex gap-[2px] text-3xl lg:text-sm font-normal lg:py-[2px] border-black my-[10px]">
                                <span>
                                  <Tag
                                    color="blue"
                                    className="px-2 py-1 text-xl lg:text-sm"
                                  >
                                    {company?.[0]?.instrumentType ===
                                    "Mutual Funds"
                                      ? company?.[0]?.instrumentType
                                      : company?.[0]?.sectorName}
                                  </Tag>
                                </span>
                                <span>
                                  {company?.[0]?.cap_type ? (
                                    <>
                                      <Tag
                                        color="blue"
                                        className="px-2 py-1 text-xl lg:text-sm"
                                      >
                                        {company?.[0]?.cap_type}
                                      </Tag>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between ">
                              <div className="flex flex-col">
                                <span className="font-[700] text-3xl lg:text-[1.75rem]">
                                  Rs.{" "}
                                  {formatMoneyForLTPInCompany(
                                    company?.[0]?.lastTradedPrice
                                  )}
                                </span>
                                <span>
                                  {company?.[0]?.length > 0 ? (
                                    <span
                                      className={
                                        (company[0]?.schange > 0
                                          ? "text-success"
                                          : company[0]?.schange < 0
                                          ? "text-danger"
                                          : "text-info") +
                                        " lg:text-lg text-4xl ml-2"
                                      }
                                    >
                                      {formatMoneyForLTPInCompany(
                                        company?.[0]?.schange
                                      )}{" "}
                                      ({company?.[0]?.perChange?.toFixed(2)} %)
                                    </span>
                                  ) : (
                                    <span
                                      className={`${
                                        company?.[0]?.schange > 0
                                          ? "text-success"
                                          : company?.[0]?.schange < 0
                                          ? "text-danger"
                                          : "text-info"
                                      } font-medium lg:text-lg text-4xl  ml-2`}
                                    >
                                      {formatMoneyForLTPInCompany(
                                        company?.[0]?.schange
                                      )}{" "}
                                      ({company?.[0]?.perChange?.toFixed(2)} %)
                                    </span>
                                  )}
                                </span>
                                <span className="block text-gray-600 pt-[4px] text-xl lg:text-sm">
                                  as of {formattedDate}{" "}
                                  {
                                    company?.[0]?.lastUpdatedDateTime
                                      ?.split("T")[1]
                                      ?.split(".")[0]
                                  }
                                </span>
                              </div>
                              <div className=" ">
                                <div className="flex flex-col items-center">
                                  <div className="text-xl  lg:text-lg font-bold uppercase flex gap-3 ">
                                    <span className="">Technical Meter</span>
                                    <div className="">
                                      <Tooltip
                                        className="cursor-pointer"
                                        title={getTechnicalMeterDescription()}
                                      >
                                        <AiOutlineInfoCircle className="mt-2 text-[28px] lg:text-[16px]" />
                                      </Tooltip>
                                    </div>
                                  </div>
                                  <GaugeChart
                                    animate={true}
                                    animDelay={10}
                                    animateDuration={500}
                                    id="gauge-chart5"
                                    nrOfLevels={3}
                                    colors={["#FF5656", "#0000FF", "#30AD43"]}
                                    textColor="#000"
                                    percent={tradingMeterPercentage / 100}
                                    needleColor="#cccecf"
                                    arcPadding={0.02}
                                    arcWidth={0.25}
                                    hideText={false}
                                    style={{ width: "100%" }}
                                  />
                                  <h3
                                    style={{
                                      backgroundColor: getTradingMeter(
                                        tradingMeterPercentage
                                      ).color,
                                      color: "white",
                                    }}
                                    className="mt-2 rounded-md px-3 py-1"
                                  >
                                    {
                                      getTradingMeter(tradingMeterPercentage)
                                        .text
                                    }
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full  lg:container lg:px-10 lg:mx-auto  px-10 mx-auto ">
              {isCompanyloading ? (
                <>
                  <div>
                    <div className="w-full">
                      {" "}
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                    <div className="w-full">
                      <Skeleton />
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={`bg-secondary relative top-[-17px] pt-[10px] rounded-b-[20px] border-r-[1px] border-l-[1px] border-b-[1px] flex items-center lg:block   shadow-none  lg:shadow-xs`}
                >
                  <span className="text-5xl animate-pulse lg:hidden px-2 pb-3 text-gray-500 font-bold ">
                    {"<"}
                  </span>
                  <ul className="mx-5 flex p-3 lg:p-0 lg:bg-none lg:w-auto snap-x-mandatory  overflow-x-auto whitespace-nowrap items-center gap-10  ">
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? companyRoutes
                          ?.filter(
                            (route) => route !== "Ratio" && route !== "Rating"
                          )
                          ?.map((route, id) => {
                            return (
                              <>
                                <li
                                  style={{ fontFamily: "poppins" }}
                                  className={`text-primary lg:text-[15px] text-[30px] px-[5px] pt-3 mt-[-12px]  cursor-pointer`}
                                >
                                  <button
                                    onClick={() => {
                                      setRouteActive(id);
                                    }}
                                    style={{ paddingBottom: "14px" }}
                                    className={`${
                                      routeActive === route
                                        ? "text-primary"
                                        : "text-primary  Primary"
                                    }`}
                                  >
                                    {route}
                                  </button>
                                  {routeActive === id && (
                                    <div className="border-[#000000] ml-[-5px] w-[115%]  border-b-[3px]"></div>
                                  )}
                                </li>
                              </>
                            );
                          })
                      : companyRoutes
                          ?.filter((route) =>
                            quickSypnosisList?.dataList === undefined
                              ? route !== "Holdings"
                              : route !== "Holdings"
                          )
                          // ?.filter((route) => route !== "Holdings")
                          ?.map((route, id) => {
                            return (
                              <>
                                <li
                                  style={{ fontFamily: "poppins" }}
                                  className={`text-primary   lg:text-[15px] text-[30px] px-[5px] pt-3 mt-[-12px]  cursor-pointer`}
                                >
                                  <button
                                    onClick={() => {
                                      setRouteActive(id);
                                    }}
                                    style={{ paddingBottom: "14px" }}
                                    className={`${
                                      routeActive === route
                                        ? "text-primary"
                                        : "text-primary  Primary"
                                    }`}
                                  >
                                    <div className="flex items-center">
                                      {route}
                                      &nbsp;
                                      {route === "Rating" && (
                                        <Tag
                                          color="cyan"
                                          className="lg:text-sm text-2xl"
                                        >
                                          {/* <Blink
                                            color="green"
                                            text="New"
                                            fontSize="25"
                                          >
                                            {" "}
                                          </Blink> */}
                                        </Tag>
                                      )}
                                    </div>
                                  </button>
                                  {routeActive === id && (
                                    <div className="border-[#000000] ml-[-5px] w-[115%]  border-b-[3px]"></div>
                                  )}
                                </li>
                              </>
                            );
                          })}
                  </ul>
                  <span className="lg:hidden  animate-pulse text-5xl text-gray-500  pl-5 pb-3 font-bold ">
                    {">"}
                  </span>
                </div>
              )}
              <div className="mt-5">
                {isCompanyloading ? (
                  <>
                    <div>
                      <div className="w-full">
                        {" "}
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                      <div className="w-full">
                        <Skeleton />
                      </div>
                    </div>
                  </>
                ) : !quickSypnosisList?.dataList?.length > 0 ? (
                  <>
                    {routeActive === 0 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <MutalFundBreakDown />
                      ) : (
                        <BasicInfo
                          singleCompanyLiveData={company}
                          industryAvg={industryAvg}
                          id={id}
                          sector={company?.[0]?.sectorName}
                        />
                      ))}
                    {routeActive === 1 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <BasicInfo
                          singleCompanyLiveData={company}
                          industryAvg={industryAvg}
                          id={id}
                          sector={company?.[0]?.sectorName}
                        />
                      ) : (
                        <StockBasicInfo />
                      ))}
                    {routeActive === 2 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <BasicInfo
                          singleCompanyLiveData={company}
                          industryAvg={industryAvg}
                          id={id}
                          sector={company?.[0]?.sectorName}
                        />
                      ) : (
                        <Floorsheet symbol={id} />
                      ))}
                    {routeActive === 3 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <Rating symbol={id} />
                      ) : (
                        <Rating symbol={id} />
                      ))}
                    {routeActive === 4 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <BreakdownBySymbol company={id} />
                      ) : (
                        <BreakdownBySymbol company={id} />
                      ))}
                    {routeActive === 5 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <MutualFundHoldings
                          data={mutualFundsInvestmentByCompanies?.data}
                        />
                      ) : (
                        <>
                          {company?.[0]?.sectorName === "Life Insurance" ||
                          company?.[0]?.sectorName === "Non Life Insurance" ? (
                            <InsuranceFinancial
                              symbol={id}
                              sector={company?.[0]?.sectorName}
                            />
                          ) : (
                            <Finacial
                              symbol={id}
                              sector={company?.[0]?.sectorName}
                            />
                          )}
                        </>
                      ))}
                    {routeActive === 6 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <MutualFundsFinancials
                          symbol={company?.[0]?.instrumentType}
                          data={mutualFundsPL}
                          sector={company?.[0]?.sectorName}
                        />
                      ) : (
                        <PeerComparision
                          symbol={id}
                          sector={company?.[0]?.sectorName}
                        />
                      ))}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 7 && (
                          <MutualFundPeerComparision symbol={id} />
                        )
                      : routeActive === 7 && (
                          <Ratio
                            symbol={id}
                            sector={company?.[0]?.sectorName}
                          />
                        )}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 8 && <Dividend symbol={id} />
                      : routeActive === 8 && <Dividend symbol={id} />}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 9 && <News symbol={id} />
                      : routeActive === 9 && <News symbol={id} />}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 10 && <PriceHistory symbol={id} />
                      : routeActive === 10 && <PriceHistory symbol={id} />}
                  </>
                ) : (
                  <>
                    {routeActive === 0 &&
                      (company?.[0]?.instrumentType === "Mutual Funds" ? (
                        <MutalFundBreakDown />
                      ) : (
                        <BreakDown
                          sector={company?.[0]?.sectorName}
                          altMan={altMan?.data}
                        />
                      ))}
                    {routeActive === 1 && (
                      <BasicInfo
                        singleCompanyLiveData={company}
                        industryAvg={industryAvg}
                        id={id}
                        sector={company?.[0]?.sectorName}
                      />
                    )}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 2 && <Floorsheet symbol={id} />
                      : routeActive === 2 && <Floorsheet symbol={id} />}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 3 && (
                          <BreakdownBySymbol company={company} />
                        )
                      : routeActive === 3 && <Rating symbol={id} />}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 4 && (
                          <MutualFundHoldings
                            data={mutualFundsInvestmentByCompanies?.data}
                          />
                        )
                      : routeActive === 4 && <BreakdownBySymbol company={id} />}

                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 5 && (
                          <MutualFundsFinancials
                            symbol={company?.[0]?.instrumentType}
                            data={mutualFundsPL}
                            sector={company?.[0]?.sectorName}
                          />
                        )
                      : routeActive === 5 && (
                          <>
                            {company?.[0]?.sectorName === "Life Insurance" ||
                            company?.[0]?.sectorName ===
                              "Non Life Insurance" ? (
                              <InsuranceFinancial
                                symbol={id}
                                sector={company?.[0]?.sectorName}
                              />
                            ) : (
                              <Finacial
                                symbol={id}
                                sector={company?.[0]?.sectorName}
                              />
                            )}
                          </>
                        )}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? ""
                      : routeActive === 6 && (
                          <PeerComparision
                            symbol={id}
                            sector={company?.[0]?.sectorName}
                          />
                        )}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? ""
                      : routeActive === 7 && (
                          <Ratio
                            symbol={id}
                            sector={company?.[0]?.sectorName}
                          />
                        )}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 6 && <Dividend symbol={id} />
                      : routeActive === 8 && <Dividend symbol={id} />}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 7 && <News symbol={id} />
                      : routeActive === 9 && <News symbol={id} />}
                    {company?.[0]?.instrumentType === "Mutual Funds"
                      ? routeActive === 8 && <PriceHistory symbol={id} />
                      : routeActive === 10 && <PriceHistory symbol={id} />}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Company;
