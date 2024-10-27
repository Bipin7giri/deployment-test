/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineBulb, AiOutlineShoppingCart } from "react-icons/ai";
import { BsTag } from "react-icons/bs";
import { Select, Skeleton } from "antd";
import {
  arabConvert,
  croreConvert,
  formatMoney,
} from "../../../../utils/formatMoney";
import SectorDetails from "../../_component/SectorDetails";
import { useDispatch, useSelector } from "react-redux";
import action from "../../_redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectorLineChart from "../../_component/SectorLineChart";
import ProductWiseLoan from "../../_component/ProductWiseLoan";
import api from "@/api/axios";
import { TVChartContainer } from "@/components/TVChartContainer";
import Link from "next/link";

const Sector = () => {
  const dispatch = useDispatch();
  const [sectorList, setSectorList] = useState([]);
  const [selectSector, setSelectSector] = useState("Development Banks");
  const [sectorId, setSectorId] = useState();
  // const [data, setData] = useState([]);

  const onSectorChange = (value) => {
    setSelectSector(value);
  };

  const fetchSectors = async () => {
    try {
      const { data: sectors } = await api.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/report/getAllSectors`
      );
      setSectorList(sectors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  let sectors = [];
  if (sectorList !== undefined) {
    sectors = sectorList
      // ?.filter((item) => item?.sector_name !== "Mutual Fund")
      ?.map((item) => ({
        value: item?.sector_name,
        label: item?.sector_name,
      }));
  }

  // let tempSector = "Development Banks"
  // useEffect(() => {
  //     dispatch(action.getStockDetailsBySector({
  //         sector: tempSector
  //     }))
  //     // dispatch(action.getProductWiseLoan({
  //     //     sector: tempSector
  //     // }))
  // }, [tempSector])

  useEffect(() => {
    if (selectSector !== null && selectSector !== undefined) {
      dispatch(
        action.getStockDetailsBySector({
          sector: selectSector,
        })
      );
      dispatch(
        action.getProductWiseLoan({
          sector: selectSector,
        })
      );
    }
  }, [selectSector]);

  const {
    loading,
    stockDetailsBysector,
    sectorChartData,
    nepseChartData,
    productWiseLoan,
  } = useSelector((state) => state.market);

  const getType = (sector) => {
    const result = {
      "Development Banks": 1,
      "Manufacturing And Processing": 2,
      "Micro Finance": 3,
      "Life Insurance": 4,
      "Mutual Fund": 5,
      "Commercial Banks": 6,
      "Hotels And Tourism": 7,
      Others: 8,
      "Hydro Power": 9,
      "Non Life Insurance": 10,
      Finance: 11,
      Trading: 12,
      Investment: 13,
    };
    return result[sector];
  };

  let sector = getType(selectSector ? selectSector : "Development Banks");

  useEffect(() => {
    setSectorId(sector);
  }, [selectSector]);

  const chartRender = useMemo(() => {
    return (
      <TVChartContainer
        symbol={selectSector ? selectSector : "Development Banks"}
        disabledFeatures={[
          "left_toolbar",
          "header_widget",
          "timeframes_toolbar",
        ]}
        search={false}
        enableFeatures={["side_toolbar_in_fullscreen_mode"]}
        height={"lg:h-[60vh] h-[40vh]"}
      />
    );
  }, [selectSector]);

  // for the sector chart data
  // function getUnixTimestampForLastThreeMonths() {
  //     const currentDate = new Date();
  //     const currentMonth = currentDate.getMonth(); // 0 to 11 (January is 0, February is 1, etc.)
  //     const currentYear = currentDate.getFullYear();

  //     // Calculate the month and year for 3 months ago
  //     let lastThreeMonths = currentMonth - 2;
  //     let lastThreeMonthsYear = currentYear;

  //     if (lastThreeMonths < 0) {
  //         // If the calculated month is negative, adjust it to the previous year
  //         lastThreeMonths += 12;
  //         lastThreeMonthsYear--;
  //     }

  //     // Create a new Date object for the start of the last 3 months
  //     const lastThreeMonthsDate = new Date(lastThreeMonthsYear, lastThreeMonths, 1);

  //     // Calculate the Unix timestamp for the start of the last 3 months
  //     const unixTimestamp = Math.floor(lastThreeMonthsDate.getTime() / 1000);
  //     return unixTimestamp;
  // }

  // const unixTimestampForLastThreeMonths = getUnixTimestampForLastThreeMonths();

  useEffect(() => {
    dispatch(
      action.getSectorChartData({
        sectorId: sectorId,
        // timeStamp: unixTimestampForLastThreeMonths
      })
    );
  }, [sectorId]);

  let sectorChartDta;
  if (sectorChartData?.data !== undefined) {
    sectorChartDta = sectorChartData?.data?.data;
  }

  // for nepse chart data
  useEffect(() => {
    dispatch(action.getNepseChartData());
  }, []);

  let nepseData;
  if (nepseChartData !== undefined) {
    nepseData = nepseChartData?.data;
  }

  return (
    <>
      <div className=" bg-[#f4f6f9cb] xl:mt-0 lg:mt-0 mt-[160px]">
        <div className="w-full xl:container lg:container px-10 pb-10 mx-auto pl-10">
          <div className="flex gap-10">
            <div className="lg:w-[75%] w-[75%] py-5 text-center">
              <div className="flex items-center">
                <div className="text-[50px] mr-[4px]">
                  <FontAwesomeIcon
                    icon={stockDetailsBysector?.data?.summary?.sector_symbol}
                    className="text-6xl lg:text-4xl rounded-md bg-[#F4F6F9] px-[8px] py-[6px]  "
                    style={{ color: 1 > 0 ? "#08bf82" : "#DC2626" }}
                  />
                </div>
                <div>
                  <h1 className="text-left text-[24px] font-[600] ">
                    {selectSector}
                  </h1>
                  <p className="text-left ">
                    {" "}
                    <span className="text-[16px] font-[600] mr-[8px]">
                      {" "}
                      {stockDetailsBysector?.data?.summary?.todaysValue
                        ? formatMoney(
                            stockDetailsBysector?.data?.summary?.todaysValue
                          )
                        : ""}{" "}
                    </span>
                    <sapn
                      className={`${
                        stockDetailsBysector?.data?.summary?.change > 0
                          ? "text-success"
                          : stockDetailsBysector?.data?.summary?.change === 0
                          ? "text-info"
                          : "text-danger"
                      }`}
                    >
                      {stockDetailsBysector?.data?.summary?.change
                        ? formatMoney(
                            stockDetailsBysector?.data?.summary?.change
                          )
                        : ""}
                    </sapn>
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-[25%] w-[25%] py-5 mt-[20px]">
              <div className="stock-sector">
                <Select
                  showSearch
                  placeholder="Select a sector"
                  // optionFilterProp="children"
                  onChange={onSectorChange}
                  // filterOption={(input, option) =>
                  //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  // }
                  options={sectors}
                  className="w-[100%]"
                />
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-5">
            <div className="mt-[0px] lg:w-[75%] w-[100%] p-[20px]">
              <div className="lg:w-[100%] 2xl:w-[100%] bg-WhiteSecondary ">
                {chartRender}
              </div>
            </div>

            <div className="mt-[16px] lg:w-[25%] w-[100%] flex lg:flex-col flex-row lg:gap-0 gap-10">
              <div className="bg-[#E9F0FE] py-[5px] mb-[40px]">
                <div className="flex lg:flex-row flex-col items-center py-[6px] px-[16px]">
                  <div className="text-[26px] p-[6px] bg-[#fff] rounded-3xl">
                    <AiOutlineShoppingCart />
                  </div>
                  <div className="lg:ml-[24px] ml-0 lg:mt-0 mt-[10px] lg:text-left text-center">
                    <p className="lg:text-[12px] text-[17px] text-[#868484] font-[600]">
                      Total Turnover
                    </p>
                    <p className="lg:text-[16px] text-[20px] text-[#000] font-[600]">
                      RS{" "}
                      {croreConvert(
                        stockDetailsBysector?.data?.summary
                          ?.totalTurnoverBySector
                      )}
                      ({stockDetailsBysector?.data?.summary?.sectorTurnoverPer}
                      %)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#E9F0FE] py-[5px] mb-[40px]">
                <div className="flex lg:flex-row flex-col px-[16px] items-center py-[6px]">
                  <div className="text-[26px] p-[6px] bg-[#fff] rounded-3xl">
                    <BsTag />
                  </div>
                  <div className="lg:ml-[24px] ml-0 lg:mt-0 mt-[10px] lg:text-left text-center">
                    <p className="lg:text-[12px] text-[17px] text-[#868484] font-[600]">
                      Total Transaction
                    </p>
                    <p className="lg:text-[16px] text-[20px] text-[#000] font-[600]">
                      RS{" "}
                      {formatMoney(
                        stockDetailsBysector?.data?.summary
                          ?.totalTransactionBySector
                      )}
                      (
                      {
                        stockDetailsBysector?.data?.summary
                          ?.sectorTransactionPer
                      }
                      %)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#E9F0FE] py-[5px] mb-[40px]">
                <div className="flex lg:flex-row flex-col px-[16px] items-center py-[6px]">
                  <div className="text-[26px] p-[6px] bg-[#fff] rounded-3xl">
                    <AiOutlineShoppingCart />
                  </div>
                  <div className="lg:ml-[24px] ml-0 lg:mt-0 mt-[10px] lg:text-left text-center">
                    <p className="lg:text-[12px] text-[17px] text-[#868484] font-[600]">
                      Total Volume
                    </p>
                    <p className="lg:text-[16px] text-[20px] text-[#000] font-[600]">
                      RS{" "}
                      {formatMoney(
                        stockDetailsBysector?.data?.summary?.totalVolumeBySector
                      )}
                      (
                      {
                        stockDetailsBysector?.data?.summary
                          ?.sectorTotalVolumePer
                      }
                      %)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#E9F0FE] py-[5px] mb-[40px]">
                <div className="flex lg:flex-row flex-col px-[16px] items-center py-[6px]">
                  <div className="text-[26px] p-[6px] bg-[#fff] rounded-3xl">
                    <BsTag />
                  </div>
                  <div className="lg:ml-[24px] ml-0 lg:mt-0 mt-[10px] lg:text-left text-center">
                    <p className="lg:text-[12px] text-[17px] text-[#868484] font-[600]">
                      Total Market Cap
                    </p>
                    <p className="lg:text-[16px] text-[20px] text-[#000] font-[600]">
                      RS{" "}
                      {formatMoney(
                        stockDetailsBysector?.data?.summary
                          ?.totalMarketCapBySector
                      )}
                      ({stockDetailsBysector?.data?.summary?.sectorMarketCapPer}
                      %)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[20px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-[#fff] sm:mb-[32px] mb-[16px] xl:px-[10px] sm:px-[30px] py-[10px] rounded-[20px]">
              <div className="flex justify-between py-[10px] px-[16px]">
                <h4 className="font-[600] capitalize lg:text-[18px] text-[28px]">
                  Gainers
                </h4>
                <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary  py-1">
                  <SectorDetails
                    fromWhere="gainers"
                    data={stockDetailsBysector?.data?.gainers}
                  />
                </button>
              </div>
              <div>
                <table className="table w-[100%] mt-[6px]">
                  <thead>
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockDetailsBysector?.data?.gainers?.length > 0 ? (
                      <>
                        {stockDetailsBysector?.data?.gainers
                          ?.slice(0, 6)
                          ?.sort((a, b) => b.schange - a.schange)
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.schange)} (
                                    {item?.percentageChange}%)
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#fff] sm:mb-[32px] mb-[16px] xl:px-[10px] sm:px-[30px] py-[10px] rounded-[20px]">
              <div className="flex justify-between py-[10px] px-[16px]">
                <h4 className="font-[600] capitalize lg:text-[18px] text-[28px]">
                  Losers
                </h4>
                <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary  py-1">
                  <SectorDetails
                    fromWhere="losers"
                    data={stockDetailsBysector?.data?.loosers}
                  />
                </button>
              </div>
              <div>
                <table className="table w-[100%] mt-[6px]">
                  <thead>
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockDetailsBysector?.data?.loosers?.length > 0 ? (
                      <>
                        {stockDetailsBysector?.data?.loosers
                          ?.slice(0, 6)
                          ?.sort((a, b) => a.schange - b.schange)
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.schange)} (
                                    {item?.percentageChange}%)
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#fff] sm:mb-[32px] mb-[16px] xl:px-[10px] sm:px-[30px] py-[10px] rounded-[20px]">
              <div className="flex justify-between py-[10px] px-[16px]">
                <h4 className="font-[600] capitalize lg:text-[18px] text-[28px]">
                  Turnover
                </h4>
                <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary  py-1">
                  <SectorDetails
                    fromWhere="turnover"
                    data={stockDetailsBysector?.data?.liveDataBySector}
                  />
                </button>
              </div>
              <div>
                <table className="table w-[100%] mt-[6px]">
                  <thead>
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Turnover
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockDetailsBysector?.data?.liveDataBySector?.length >
                    0 ? (
                      <>
                        {stockDetailsBysector?.data?.liveDataBySector
                          ?.slice(0, 6)
                          ?.sort(
                            (a, b) => b.totalTradeValue - a.totalTradeValue
                          )
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.totalTradeValue)}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#fff] sm:mb-[32px] mb-[16px] xl:px-[10px] sm:px-[30px] py-[10px] rounded-[20px]">
              <div className="flex justify-between py-[10px] px-[16px]">
                <h4 className="font-[600] capitalize lg:text-[18px] text-[28px]">
                  Volume
                </h4>
                <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary  py-1">
                  <SectorDetails
                    fromWhere="volume"
                    data={stockDetailsBysector?.data?.liveDataBySector}
                  />
                </button>
              </div>
              <div>
                <table className="table w-[100%] mt-[6px]">
                  <thead>
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockDetailsBysector?.data?.liveDataBySector?.length >
                    0 ? (
                      <>
                        {stockDetailsBysector?.data?.liveDataBySector
                          ?.slice(0, 6)
                          ?.sort(
                            (a, b) =>
                              b.totalTradeQuantity - a.totalTradeQuantity
                          )
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.totalTradeQuantity)}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        v<td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-[30px] bg-secondary py-[20px] rounded-[20px]">
            {console.log(productWiseLoan?.data?.[0])}
            {loading ? (
              <>
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <ProductWiseLoan height={400} data={productWiseLoan?.data?.[0]} />
            )}
          </div>

          <div className="mt-[30px] bg-secondary py-[20px] rounded-[20px]">
            <SectorLineChart
              height={400}
              otherChartData={sectorChartDta}
              nepseChartData={nepseData}
              sector={selectSector}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Sector;
