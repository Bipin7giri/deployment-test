"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/app/(home)/redux/actions";
import { Skeleton } from "antd";
// import Card from "../../../../components/";
import homeActions from "@/app/(home)/redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import comingSoon from "@/assets/img/comingSoon.png";
import NewTable from "./Table";
import { disabledCompanies } from "@/utils/disableCompanies";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatMoney } from "@/utils/formatMoney";
import { useRouter } from "next/navigation";

/**
 * @author
 * @function TopGainers
 **/

export const TopGainers = () => {
  const dispatch = useDispatch();
  let { symbol } = useParams();
  const { isDropDownLoading, gainer, loser } = useSelector(
    (state) => state.home
  );
  const { marketLiveHomeData, isMarketLiveHomeDataLoading } = useSelector(
    (state) => state.home
  );
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: actions.GET_GAINER_REQ });
    dispatch({ type: actions.GET_LOOSER_REQ });
  }, [symbol]);

  const sortedGainer = [...gainer];
  sortedGainer?.sort((a, b) => b?.schange - a?.schange);
  const topGainer = sortedGainer?.slice(0, 6);

  const sortedLosers = [...loser];
  sortedLosers?.sort((a, b) => a?.schange - b?.schange);
  const topLosers = sortedLosers?.slice(0, 6);

  // useEffect(() => {
  //   dispatch(homeActions.getMarketDataHomeLive());
  // }, []);

  return (
    <>
      <div className="bg-[#f4f6f9]">
        {disabledCompanies.includes(symbol) ? (
          <>
            <div className="mt-[100px] text-center">
              <img src={comingSoon} alt="coming soon" />
              <h1 className="text-[20px] font-[500]">Coming Soon..!</h1>
            </div>
          </>
        ) : (
          <>
           <div className="mt-[30px]">
              {!isDropDownLoading ? (
                <>
                  <div className="bg-secondary w-[100%] px-[10px] rounded-[20px] py-6">
                    <h4 className="text-center font-[600] capitalize lg:text-[18px] text-[28px] text-success">
                      Top Gainers
                    </h4>
                    <div>
                      <table className="table w-[100%] mt-[6px]">
                        <thead>
                          <tr>
                            <th className="px-2 lg:text-[12px] text-[24px] py-2">
                              Symbol
                            </th>
                            <th className="px-2 lg:text-[12px] text-[24px] py-2">
                              LTP
                            </th>
                            <th className="px-2 lg:text-[12px] text-[24px] py-2">
                              Change
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {topGainer?.length > 0 ? (
                            topGainer?.map((item, id) => (
                              <tr
                                className={
                                  (id + 1) % 2 === 0
                                    ? "text-center text-[24px] lg:text-sm"
                                    : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                }
                                key={item?.id}
                              >
                                <td className="text-center py-2">
                                  <Link
                                    href={`/technicalchart/?symbol=${item.symbol}`}
                                    className="hover:text-BlueInfo"
                                  >
                                    {item?.symbol}
                                  </Link>
                                </td>
                                <td className=" px-4 py-2 ">
                                  {formatMoney(item?.lastTradedPrice)}
                                </td>
                                <td className=" px-4 py-2 text-success">
                                  {formatMoney(item?.schange)}{" "}
                                  ({item?.perChange?.toFixed(2)}%)
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="text-center">
                              <td colSpan="3">No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-secondary w-[100%] px-[10px] mt-[40px] rounded-[20px] py-6">
                    <h4 className="text-center font-[600] capitalize lg:text-[18px] text-[28px] text-danger">
                      Top Losers
                    </h4>
                    <div>
                      <table className="table w-[100%] mt-[6px]">
                        <thead>
                          <tr>
                            <th className="px-2 lg:text-[12px] text-[24px] py-2">
                              Symbol
                            </th>
                            <th className="px-2 lg:text-[12px] text-[24px] py-2">
                              LTP
                            </th>
                            <th className="px-2 lg:text-[12px] text-[24px] py-2">
                              Change
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {topLosers?.length > 0 ? (
                            topLosers?.map((item, id) => (
                              <tr
                                className={
                                  (id + 1) % 2 === 0
                                    ? "text-center text-[24px] lg:text-sm"
                                    : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                }
                                key={item?.id}
                              >
                                <td className="text-center py-2">
                                  <Link
                                    href={`/technicalchart/?symbol=${item.symbol}`}
                                    className="hover:text-BlueInfo"
                                  >
                                    {item?.symbol}
                                  </Link>
                                </td>
                                <td className=" px-4 py-2 ">
                                  {formatMoney(item?.lastTradedPrice)}
                                </td>
                                <td className=" px-4 py-2 text-danger">
                                  {formatMoney(item?.schange)}{" "}
                                  ({item?.perChange?.toFixed(2)}%)
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="text-center">
                              <td colSpan="3">No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <Skeleton />
              )}
            </div>
            <div className="rounded-[20px] shadow-md">
              {isMarketLiveHomeDataLoading && (
                <div className="lg:container px-10 lg:w-full mt-40 mx-auto gap-5 py-5 lg:mt-0">
                  <div>
                    <Skeleton active paragraph={{ rows: 5 }} />
                  </div>
                </div>
              )}

              {!isMarketLiveHomeDataLoading && (
                <div className="lg:container px-10 lg:w-full mt-40 mx-auto gap-5 py-5 lg:mt-0">
                  <h3 className="text-center mb-2 text-gray-900 font-[500] text-[54px] lg:text-lg">
                    Indices
                  </h3>
                  <NewTable title="indices" />
                </div>
              )}
            </div>

            <div className="mt-[40px] ">
                <div className=" !bg-secondary p-8 lg:p-0 dark:bg-gray-900 lg:ml-0 my-5 lg:my-0 rounded-[20px] shadow-md lg:py-3 py-4 lg:px-5">
                <h3 className="text-center mb-2 text-gray-900 font-[500] text-[54px] lg:text-lg">
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
                            className="flex justify-between my-6 px-1  lg:my-4 items-center"
                          >
                            <div className="flex items-center">
                              <div className=" pr-2  mr-[1px] rounded-lg">
                                <FontAwesomeIcon
                                  // icon={item.icon_name}
                                  className="text-5xl lg:text-xl rounded-md bg-[#F4F6F9] px-[8px] py-[6px]  "
                                  style={{
                                    color:
                                      item?.perChange > 0
                                        ? "#08bf82"
                                        : "#DC2626",
                                  }}
                                />
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    router.push(`/technicalchart?symbol=${item.sindex}`)
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
            </div>
          </>
        )}
      </div>
    </>
  );
};
