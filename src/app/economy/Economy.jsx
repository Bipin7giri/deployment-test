"use client";

import React, { useEffect } from "react";
import Card from "../../components/Card";
import { Carousel, Skeleton, Tag } from "antd";
import SingleLineChart from "./component/SingleLineChart";
import StockPerformanceChart from "../../components/Charts/SrockPerformanceChart";
import CircleChart from "./component/CircleChart";
import { useDispatch, useSelector } from "react-redux";
import actions from "../(home)/redux/actions";
import MultipleLineChart from "../../components/Charts/MultipleLineChart";
import { Helmet } from "react-helmet";
import economyActions from "./redux/actions";
import IndicatorsRates from "./component/IndicatorsRates";

const Economy = () => {
  const dispatch = useDispatch();
  const {
    interest,
    inflation,
    isInterestLoading,
    isInterestError,
    isInflationLoading,
    isInflationError,
  } = useSelector((state) => state.home);
  const {
    mofAnnual,
    isMofError,
    expenditureAndRevenue,
    importAndExport,
    exportBreakDown,
    remittancesAndDebt,
    importBreakDown,
    highlightsImport,
    highlightsImportError,
    calculatedHighLight,
    isExpenditureAndRevenueLoading,
    isMofLoading,
    highlightsLoding,
    calculatedHighLightLoading,
  } = useSelector((state) => state.economy);

  useEffect(() => {
    dispatch({ type: actions.GET_INFLATION_REQ });
    dispatch({ type: actions.GET_INTEREST_REQ });
    dispatch({ type: economyActions.GET_MOF_ANNUAL_REQ });
    dispatch(
      economyActions.economyChart([
        {
          chartDataNameOne: "Total Revenue",
          chartDataNameTwo: "Total Expenditure",
        },
        {
          chartDataNameOne: "Import",
          chartDataNameTwo: "Export",
        },
        {
          chartDataNameOne: "Remittances",
          chartDataNameTwo: "Total Outstanding Debt",
        },
        {
          chartDataNameOne: "India (Import)",
          chartDataNameTwo: "China (Import)",
          chartDataNameThree: "Other countries (Import)",
        },
        {
          chartDataNameOne: "India (Export)",
          chartDataNameTwo: "China (Export)",
          chartDataNameThree: "Other countries (Export)",
        },
      ])
    );
    dispatch({ type: economyActions.GET_Highlights_Import_Export });
    dispatch({ type: economyActions.GET_Calculated_HighLights });
  }, []);

  return (
    <div>
      <Helmet>
        {/* <meta charset="UTF-8" /> */}
        <title>Economy | Saral Lagani</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta property="og:title" content="Nepal Latest Economy Condition ." />
        <meta
          name="description"
          content={`Get various insight about the economy of the country and get data about various condtions like remmitance, import, exports etc. `}
        />
        <meta
          name="keywords"
          content="Nepal Economy,Nepal Remittance, ,Nepal Import, Nepal Export, Nepal Inflation History, Nepal Inflation, Nepal Interest Rate"
        />
        <meta
          property="og:description"
          content="Get various insight about the economy of the country and get data about various condtions like remmitance, import, exports etc."
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>
      <div className="  lg:w-full px-8  lg:px-10 lg:mx-auto  py-5 mt-52 lg:mt-0 ">
        <div className="lg:pb-8 ">
          {isMofError && <h1 className="text-center">Something went wrong</h1>}
          <div className="lg:block hidden">
            <Carousel
              dots={false}
              draggable
              slidesToShow={5}
              slidesToScroll={1}
              autoplaySpeed={3000}
              infinite={true}
              speed={3000}
              autoplay
            >
              {!isMofLoading &&
                mofAnnual?.map((item, id) => {
                  return (
                    <div key={id} className="mr-4 cursor-move">
                      <Card
                        Title={item?.key}
                        Number={item?.value}
                        Percentage={item?.perChange}
                        Trend="up"
                        marginLeft={"mx-6"}
                        marginY={"my-2"}
                      />
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <div className="lg:hidden block">
            <Carousel
              dots={false}
              draggable
              slidesToShow={1}
              slidesToScroll={1}
              autoplaySpeed={6000}
              infinite={true}
              speed={6000}
              autoplay
              waitForAnimate={false}
            >
              {isMofLoading &&
                ["", "", "", ""].map((item, index) => {
                  return (
                    <div key={index}>
                      <Skeleton active />
                    </div>
                  );
                })}
              {!isMofLoading &&
                mofAnnual?.map((item, id) => {
                  return (
                    <div className="lg:mx-6 mx-10" key={id}>
                      <Card
                        Title={item?.key}
                        Number={item?.value}
                        Percentage={324}
                        Trend="up"
                        marginY={"my-2"}
                      />
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </div>
        <div className="flex lg:flex-row pt-10 lg:pt-0 flex-col gap-8">
          <div className="lg:w-[30%] w-[100%] px-4 lg:px-0  flex flex-col gap-4">
            <div className="bg-secondary    py-5 lg:shadow-sm  shadow-md rounded-[20px]">
              {highlightsImportError && <h2>Some Thing Went wrong</h2>}
              <h2 className="pl-4 text-4xl  lg:text-lg  text-medium font-semibold">
                Highlights
              </h2>
              {/* highlightsImport */}
              {highlightsLoding && (
                <>
                  <div className="p-5">
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                  </div>
                </>
              )}
              {!highlightsLoding && (
                <>
                  {highlightsImport?.length > 0 && (
                    <>
                      <ul className="flex lg:text-sm flex-col lg:mt-0 mt-3 px-5   lg:gap-3 gap-8  w-[100%] lg:w-[98%] pl-4 py-2">
                        {highlightsImport?.map((item, id) => {
                          return (
                            <>
                              <li className="lg:text-sm text-[40px]" key={id}>
                                <div className="flex items-center gap-3">
                                  <div>
                                    <svg
                                      className="w-[40px] lg:w-4"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clip-path="url(#clip0_571_2424)">
                                        <path
                                          d="M2.1875 11.8687L9.0625 11.875C9.48125 11.875 9.85625 11.6687 10.0812 11.35L12.8125 7.5L10.0812 3.65C9.85625 3.33125 9.48125 3.125 9.0625 3.125L2.1875 3.13125L5.2125 7.5L2.1875 11.8687Z"
                                          fill="black"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_571_2424">
                                          <rect
                                            width="15"
                                            height="15"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  <span className="">{item}</span>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="bg-secondary     lg:shadow-sm  shadow-lg rounded-[20px]">
              <h2 className="pl-4 text-4xl py-5 lg:text-lg  text-medium font-semibold">
                Synopsis
              </h2>
              {calculatedHighLightLoading && (
                <>
                  <div className="p-5">
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                  </div>
                </>
              )}
              {!calculatedHighLightLoading && (
                <>
                  <ul className="flex lg:text-sm text-[40px] flex-col mt-3 lg:mt-0  lg:gap-3 gap-10 w-[100%] lg:w-[98%] pl-4 py-2">
                    {calculatedHighLight?.length > 0 && (
                      <>
                        {calculatedHighLight?.map((item, index) => {
                          return (
                            <>
                              <li className="" key={index}>
                                <div className="flex items-center gap-3">
                                  <div>
                                    <svg
                                      className="w-[40px] lg:w-4"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clip-path="url(#clip0_571_2424)">
                                        <path
                                          d="M2.1875 11.8687L9.0625 11.875C9.48125 11.875 9.85625 11.6687 10.0812 11.35L12.8125 7.5L10.0812 3.65C9.85625 3.33125 9.48125 3.125 9.0625 3.125L2.1875 3.13125L5.2125 7.5L2.1875 11.8687Z"
                                          fill="black"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_571_2424">
                                          <rect
                                            width="15"
                                            height="15"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  <span>{item}</span>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </>
                    )}
                  </ul>
                </>
              )}
            </div>
            <IndicatorsRates />
          </div>
          <div className="lg:w-[70%] w-[100%]">
            <div className="bg-secondary     shadow-sm rounded-[20px]">
              <h2 className="pl-4 lg:text-sm py-6 lg:py-4 text-3xl font-semibold">
                Inflation & Interest
              </h2>
              <div>
                {isInterestLoading || isInflationLoading ? (
                  <>
                    <div className="p-5">
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:block hidden">
                      <StockPerformanceChart
                        height={400}
                        chartData={{
                          interest: interest,
                          inflation: inflation,
                        }}
                      />
                    </div>
                    <div className="lg:hidden block px-5 py-5">
                      <StockPerformanceChart
                        height={700}
                        fontSize={23}
                        chartData={{
                          interest: interest,
                          inflation: inflation,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-secondary    my-10 px-4 py-4 shadow-sm rounded-[20px]">
              <div className="flex justify-between">
                <h2 className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                  Revenue & Expenditure
                </h2>
                <p className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                  <Tag color="cyan">In mln</Tag>
                </p>
              </div>
              <div>
                {isExpenditureAndRevenueLoading && (
                  <>
                    <div className="px-5 py-3">
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                    </div>
                  </>
                )}
                {!isExpenditureAndRevenueLoading && (
                  <>
                    <MultipleLineChart
                      title={{ titleOne: "Revenue", titleTwo: "Expenditure" }}
                      chartData={expenditureAndRevenue}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 grid-cols-1">
              <div className="bg-secondary     shadow-sm rounded-[20px] py-3 px-3">
                <div className="flex justify-between">
                  <h2 className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                    Import and Export
                  </h2>
                  <p className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                    <Tag color="cyan">In mln</Tag>
                  </p>
                </div>
                {isExpenditureAndRevenueLoading && (
                  <>
                    <div className="px-5 py-3">
                      <Skeleton></Skeleton>
                    </div>
                  </>
                )}
                {!isExpenditureAndRevenueLoading && (
                  <>
                    <MultipleLineChart
                      title={{ titleOne: "Import", titleTwo: "Export" }}
                      chartData={importAndExport}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col gap-5 lg:gap-0 lg:h-auto lg:flex-row justify-between py-5 px-3   bg-secondary     shadow-sm rounded-[20px] ">
                <div>
                  <h2 className="text-4xl lg:text-sm text-center  font-semibold mb-5 ">
                    Import BreakDown
                  </h2>
                  {isExpenditureAndRevenueLoading && (
                    <>
                      <div className="px-5 py-3">
                        <Skeleton></Skeleton>
                      </div>
                    </>
                  )}
                  {!isExpenditureAndRevenueLoading && (
                    <div className="">
                      <CircleChart chartData={importBreakDown} />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between -mt-[16px]">
                    <h2 className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                      Export BreakDown
                    </h2>
                    <p className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                      <Tag color="cyan">In mln</Tag>
                    </p>
                  </div>
                  {isExpenditureAndRevenueLoading && (
                    <>
                      <div className="px-5 py-3">
                        <Skeleton></Skeleton>
                      </div>
                    </>
                  )}
                  {!isExpenditureAndRevenueLoading && (
                    <>
                      <CircleChart chartData={exportBreakDown} />
                    </>
                  )}
                </div>
              </div>
              <div className="bg-secondary    py-3 px-5 font-semibold rounded-[20px]">
                <div className="flex justify-between">
                  <h2 className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                    Remittance
                  </h2>
                  <p className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                    <Tag color="cyan">In mln</Tag>
                  </p>
                </div>
                {isExpenditureAndRevenueLoading && (
                  <>
                    <div className="px-5 py-3">
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                    </div>
                  </>
                )}

                {!isExpenditureAndRevenueLoading && (
                  <>
                    <div>
                      <SingleLineChart
                        title={"Remittance"}
                        chartData={remittancesAndDebt[0]}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="bg-secondary    font-semibold px-5 py-3 rounded-[20px]">
                <div className="flex justify-between">
                  <h2 className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                    Debt
                  </h2>
                  <p className="pl-4 text-4xl lg:text-sm py-4 font-semibold">
                    <Tag color="cyan">In mln</Tag>
                  </p>
                </div>
                {isExpenditureAndRevenueLoading && (
                  <>
                    <div className="px-5 py-3">
                      <Skeleton></Skeleton>
                      <Skeleton></Skeleton>
                    </div>
                  </>
                )}
                {!isExpenditureAndRevenueLoading && (
                  <>
                    <div>
                      <SingleLineChart
                        height={400}
                        title={"Debt"}
                        chartData={remittancesAndDebt[1]}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Economy;
