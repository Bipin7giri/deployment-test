"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import DropdownAddHolder from "./dropdownAddHolder";
import { Skeleton } from "antd";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { formatMoney } from "@/utils/formatMoney";

const OverAllPortfolio = () => {
  const dispatch = useDispatch();
  // to get the seleced portfolio holder data
  const {
    shareHolderId,
    selectedPortfolioHolder,
    portfolioHolderByShid,
    setOverallPortfolioLoading,
  } = useSelector((state) => state.portfolio);

  // useEffect(() => {
  //   dispatch(actions.getPortfolioByShid({ id: shareHolderId }))
  // }, [shareHolderId])

  let data = {};

  if (portfolioHolderByShid.portfolioHolder !== undefined) {
    if (portfolioHolderByShid?.portfolioHolder?.summary !== undefined) {
      data = portfolioHolderByShid.portfolioHolder.summary;
    }
  }

  const totalInvestment = data["Total Investment"]?.toFixed(2);
  const totalGain = data["Total Gain"]?.toFixed(2);
  const dailyGain = data?.["Daily Gain"] ? data?.["Daily Gain"]?.toFixed(2) : 0;
  const totalValue = data["Total Value"]?.toFixed(2);
  const prefferedSector = data["Preffered Sector"];
  const data1 = { totalInvestment, totalGain };

  return (
    <>
      {setOverallPortfolioLoading && (
        <div className=" mt-4 my-10">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
      <div className="portfolio-view bg-[#F4F6F9] py-10 container max-w-screen-lg mx-auto lg:px-0 px-[60px]">
        <div className={`overall-portfolio-info`}>
          <div className="lg:pb-0 lg:pt-0 pb-[20px] pt-[20px]">
            <DropdownAddHolder />
          </div>

          <div className="container max-w-screen-lg mx-auto content rounded-[20px] w-auto bg-[#fff] shadow-md bg-opacity-50 py-6 px-6 flex justify-between lg:py-[50px]">
            {totalInvestment > 0 || totalInvestment < 0 ? (
              <>
                <div className="text-head">
                  <span className="text-gray-400 lg:text-[19px] text-[26px] font-semibold">
                    Total value:{" "}
                  </span>
                  <span className="text-primary  -500 lg:text-[19px] text-[24px] font-semibold">
                    {" "}
                    {formatMoney(totalValue)}{" "}
                  </span>
                  <div className="text-info flex lg:flex-row flex-col gap-1 lg:gap-0 lg:mt-8 justify-between ">
                    <div className="mr-[30px]">
                      <p className="py-1">
                        <span className="text-gray-400 lg:text-[18px] text-[24px] font-600">
                          {" "}
                          Today&apos;s Gain:
                        </span>

                        <span
                          className={`${
                            dailyGain >= 0 ? "text-green-400" : "text-red-500"
                          } lg:text-[18px] text-[24px] font-600`}
                        >
                          {" "}
                          {formatMoney(dailyGain)}{" "}
                        </span>
                      </p>
                      <p className="py-1">
                        <span className="text-gray-400 lg:text-[18px] text-[24px] font-600">
                          {" "}
                          Total Gain:{" "}
                        </span>
                        <span
                          className={`${
                            totalGain >= 0 ? "text-green-400" : "text-red-500"
                          } lg:text-[18px] text-[24px] font-600`}
                        >
                          {" "}
                          {formatMoney(totalGain)}{" "}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="py-1">
                        <span className="text-gray-400 lg:text-[18px] text-[24px] font-600">
                          Total Investment:{" "}
                        </span>
                        <span className="text-primary   lg:text-[18px] text-[24px] font-600">
                          {" "}
                          {formatMoney(totalInvestment)}{" "}
                        </span>
                      </p>
                      <p className="py-1">
                        <span className="text-gray-400 lg:text-[18px] text-[24px] font-600">
                          Preferred Sector:{" "}
                        </span>
                        <span className="text-primary   lg:text-[18px] text-[24px] font-600">
                          {" "}
                          {prefferedSector}{" "}
                        </span>
                      </p>
                    </div>
                    {/* <div className="w-150 h-150 border-30 border-red-500 bg-white rounded-full mt--30"></div> */}
                  </div>
                </div>

                <div className="w-60 h-40 ">
                  {totalInvestment ? (
                    <DoughnutChart data={data1} fromWhere="portfolio" />
                  ) : (
                    "No Data"
                  )}
                </div>
              </>
            ) : totalInvestment == 0 ? (
              <div className="rounded-md px-4 py-20">No Data Found</div>
            ) : (
              <div className="rounded-md px-4 py-20">Loading data ......</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverAllPortfolio;
