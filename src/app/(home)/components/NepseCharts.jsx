"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "antd";
import Gainer from "./GainerAndLoser";
import Inflation from "./Inflation";
import { formatMoney } from "../../../utils/formatMoney";
import Card from "@/components/Card";
import { TVChartContainer } from "@/components/TVChartContainer";
import OverView from "./OverView";
// import toolsAction from "../Tools/redux/action";

const formattedDate = new Date().toISOString().split("T")[0];

const NepseCharts = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState("NEPSE");
  const { marketLiveHomeData, isMarketLiveHomeDataLoading } = useSelector(
    (state) => state.home
  );
  let finalIpoData = [];
  // Moved chartRender inside the component body
  const chartRender = (
    <TVChartContainer
      symbol={chartData}
      disabledFeatures={["left_toolbar", "header_widget", "timeframes_toolbar"]}
      search={false}
      enableFeatures={["side_toolbar_in_fullscreen_mode"]}
      height={"lg:h-[70vh] h-[55vh] xl:h-[74vh] 2xl:h-[60vh]"}
    />
  );
  const { ipoData } = useSelector((state) => state.tools);

  let latestOpenIpo = [];
  if (ipoData?.data !== undefined) {
    let allIpoData = ipoData?.data["IPO"][0]["open"]
      .concat(ipoData?.data["IPO"][1].close)
      .concat(ipoData?.data["IPO"][2]["approved"]);

    finalIpoData = allIpoData.map((item, id) => {
      let status;
      if (item.openDate <= formattedDate && item.closeDate >= formattedDate) {
        status = "Open";
      } else if (item.closeDate < formattedDate) {
        status = "Close";
      } else if (item.openDate > formattedDate) {
        status = "Coming Soon";
      }
      return {
        key: id + 1,
        company_name: item?.company_name,
        sector: item.sector,
        unit: item?.unit,
        mutualFundType: item?.mutual_fund_type,
        maturityYear: item?.maturity_year,
        rightShare: item?.ratio,
        opening_date: item?.openDate,
        closing_date: item?.closeDate,
        status: status,
      };
    });
    finalIpoData = finalIpoData.sort((a, b) => {
      if (a.status === "Open") return -1;
      if (a.status === "Coming Soon" && b.status !== "Open") return -1;
      return 1;
    });
    finalIpoData.filter((item, id) => {
      if (item.status === "Open") {
        latestOpenIpo.push(item);
      }
    });
  }
  let ipoOpenData = [];
  let ipoApproved = [];
  if (ipoData?.data !== undefined) {
    ipoOpenData = ipoData?.data?.open?.map((item, id) => {
      return {
        key: id + 1,
        company_name: item.company_name,
        sector: item.sector,
        opening_date: item.openDate,
        closing_date: item.closeDate,
      };
    });

    ipoApproved = ipoData?.data?.approved?.map((item, id) => {
      return {
        key: id + 1,
        company_name: item.company_name,
        sector: item.sector,
        opening_date: item.openDate,
        closing_date: item.closeDate,
      };
    });
  }

  useEffect(() => {
    // dispatch(toolsAction.getAllIpoData());
  }, []);

  return (
    <>
      {/* Index */}
      {isMarketLiveHomeDataLoading && (
        <div className="container w-full  sm:mx-28  px-8  lg:px-10 lg:mx-auto  flex lg:flex-row flex-col gap-5  py-5  justify-between ">
          <div className="lg:w-[20%]">
            <Skeleton active />
          </div>
          <div className="lg:w-[20%]">
            <Skeleton active />
          </div>
          <div className="lg:w-[20%]">
            <Skeleton active />
          </div>
          <div className="lg:w-[20%]">
            <Skeleton active />
          </div>
        </div>
      )}
      {!isMarketLiveHomeDataLoading && (
        <div className=" lg:container px-10 lg:w-full mt-40   mx-auto  flex lg:flex-row flex-wrap lg:flex-auto gap-5  py-5  lg:mt-0 justify-between ">
          {marketLiveHomeData?.nepseIndex?.map((item, id) => {
            return (
              <>
                <div className="lg:w-[20%] w-[48%]" key={item?.id}>
                  <Card
                    Title={item?.sindex}
                    Number={item?.currentValue}
                    Percentage={item?.perChange}
                    Trend={item?.perChange >= 0 ? "up" : "down"}
                    sChange={formatMoney(item?.schange)}
                  />
                </div>
              </>
            );
          })}
        </div>
      )}

      <div className="lg:container px-10 lg:mx-auto  flex lg:flex-row flex-col  py-5  lg:mt-0 gap-10  mx-auto">
        <div className="flex lg:w-[100%]  flex-col lg:flex-row lg:justify-between">
          <div className="flex lg:w-[30%] lg:order-1  order-2  flex-col  gap-10 lg:gap-5 ">
            {/* Sub Indices */}
            <div className="!bg-secondary    p-8 lg:p-0  dark:bg-gray-900    lg:ml-0 my-5 lg:my-0 rounded-[20px] shadow-md lg:py-3 py-4 lg:px-5">
              <h3 className="px-1  mb-2 text-gray-900 font-[500] text-[54px] lg:text-lg">
                Sub Indices
              </h3>
              {isMarketLiveHomeDataLoading && (
                <Skeleton paragraph={{ rows: 14 }} />
              )}
              {!isMarketLiveHomeDataLoading && (
                <>
                  {marketLiveHomeData?.subIndices?.map((item, id) => {
                    return (
                      <>
                        <div
                          key={id}
                          className="flex justify-between my-6 px-1  lg:my-4 items-center "
                        >
                          <div className="flex items-center">
                            <div className=" pr-2  mr-[1px] rounded-lg">
                              <FontAwesomeIcon
                                // icon={item.icon_name}
                                className="text-5xl lg:text-xl rounded-md bg-[#F4F6F9] px-[8px] py-[6px]  "
                                style={{
                                  color:
                                    item?.perChange > 0 ? "#08bf82" : "#DC2626",
                                }}
                              />
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  setChartData(item?.sector_key);
                                }}
                                className="lg:text-[13px] leading-none  text-[38px] font-[500]"
                              >
                                {item.sindex}
                              </button>
                            </div>
                          </div>
                          <div>
                            <p
                              className={`${
                                item?.perChange > 0
                                  ? "text-[#08bf82]"
                                  : "text-[#DC2626]"
                              } lg:text-xs text-[32px] font-[500] text-end`}
                            >
                              {item?.perChange}%
                            </p>
                            <p className="text-primary   font-[500] lg:text-xs text-[28px]">
                              {formatMoney(item?.currentValue)}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>

            {/* Ipo */}

            {/*             
            <div className="bg-secondary lg:px-3 px-8 py-2 rounded-lg">
              {latestOpenIpo.length >= 1 ? (
                <div>
                  <>
                    <div className="flex justify-between">
                      <h4 className="uppercase font-[600] lg:text-[18px] text-[28px]">
                        upcoming ipo
                      </h4>
                      <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary py-1">
                        <Link href="/investment-opportunity">View More</Link>
                      </button>
                    </div>
                    <div className="mt-[30px] lg:mt-[15px]">
                      <h4 className="text-[26px] lg:text-[16px] uppercase font-[600]">
                        {latestOpenIpo[0]?.company_name}{" "}
                        <span className="text-[22px] lg:text-[12px] ml-[10px]">
                          {" "}
                          - {latestOpenIpo[0]?.sector}
                        </span>
                      </h4>
                      <p className="text-[24px] lg:text-[12px] font-[600] py-[12px]">
                        <span> {latestOpenIpo[0]?.opening_date} - </span>
                        <span> {latestOpenIpo[0]?.closing_date} </span>
                      </p>
                    </div>
                  </>
                  {/* )) */}
            {/* </div>
              ) : (
                <div>
                  <div className="flex justify-between">
                    <h4 className="uppercase font-[600] lg:text-[18px] text-[28px]">
                      ipo opening
                    </h4>
                    <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary py-1">
                      <Link href="/investment-opportunity">View More</Link>
                    </button>
                  </div>
                  <div className="mt-[30px] lg:mt-[15px]">
                    <h4 className="text-[26px] lg:text-[16px] uppercase font-[600] px-[6px] py-[10px]">
                      There are currently no active IPO openings and no upcoming
                      IPOs.
                    </h4>
                  </div>
                </div>
              )}
            </div> */}

            {/* Inflation */}
            <div className="bg-secondary shadow-md lg:px-3 px-8  py-2  rounded-[20px] ">
              <Inflation />
            </div>
          </div>
          <div className="lg:w-[68%]  lg:order-2  order-1">
            {/* Nepse Chart */}
            <div className="mb-10 z-0 px-4 py-3">{chartRender}</div>
            <div className="flex justify-between flex-col lg:flex-row lg:gap-0 gap-10 ">
              {/* Market Overview */}
              <OverView />
              {/* Top Gainer Loser */}
              <div className="bg-secondary py-4 lg:w-[62%] shadow-md rounded-[20px]">
                <Gainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NepseCharts;
