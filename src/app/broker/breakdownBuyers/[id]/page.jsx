"use client";
import React, { useEffect, useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import BarChart from "../../[id]/_component/BarChart";
import BrokerBuyersTable from "../../[id]/_component/BrokerBuyersTable";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Sidebar from "../../[id]/_component/SideBar";
import api from "../../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import marketActions from "../../../(market)/_redux/actions";
import { BsInfoCircle } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { GoTag } from "react-icons/go";
import Link from "next/link";
import { Anchor, DatePicker } from "antd";
import moment from "moment";
import actions from "../../[id]/_redux/action";
import { setBrokerHystoricBuy } from "../../[id]/_redux/brokerSlice";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const BreakdownByBuyers = ({ params: { id } }) => {
  const [loadingData, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [buyers, setBuyers] = useState(null);
  const [topBuyers, setTopBuyers] = useState(null);
  const [pickedDateRange, setPickedDateRange] = useState([]);
  const [brokerDateRange, setBrokerDateRange] = useState(null);
  const [anchorTop, setAnchorTop] = useState("");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (typeof window !== "undefined") {
  //       if (window.pageYOffset > 50) {
  //         setAnchorTop("lg:top-[10vh] top-[12vh]");
  //       } else {
  //         setAnchorTop("");
  //       }
  //     }
  //   };
  // });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: marketActions.GET_BROKER_STOCK_BUYING });
  }, []);
  const { brokerStockBuying, loading } = useSelector((state) => state.market);
  const { brokerHystoricBuy } = useSelector((state) => state.broker);
  let buyData = [];
  if (brokerStockBuying?.buy !== undefined) {
    buyData = brokerStockBuying?.buy?.map((item, id) => {
      return {
        key: id + 1,
        sno: id + 1,
        buyerMemberId: item.buyerMemberId,
        contractAmount: item.contractAmount,
        contractQuantity: item?.contractQuantity,
      };
    });
  }

  const weeklyTopBuyers = async () => {
    try {
      const res = await api.get(
        `/floorsheet/broker_breakdown/top_five_by_buyer`
      );
      if (res) {
        setBuyers(res.data.data);
        setLoading(false);
        setTopBuyers(res.data.data.today[0]);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    weeklyTopBuyers();
  }, []);

  const [selectedRange, setSelectedRange] = useState(false);

  const handleDateRangeChange = (e) => {
    if (e !== null && e !== undefined) {
      setBrokerDateRange(e);
      const fromDate = e[0].format("YYYY-MM-DD");
      const toDate = e[1].format("YYYY-MM-DD");
      setPickedDateRange([fromDate, toDate]);
      setSelectedRange(true);
    } else {
      setBrokerDateRange(null);
      setSelectedRange(false);
      dispatch(setBrokerHystoricBuy([]));
    }
  };

  const handleRangeBrokerData = () => {
    if (selectedRange) {
      dispatch(
        actions.getBrokerHistoricBuy({
          fromDate: pickedDateRange[0],
          toDate: pickedDateRange[1],
        })
      );
    }
  };

  let selectedBuyData = [];
  if (brokerHystoricBuy?.data !== undefined) {
    selectedBuyData = brokerHystoricBuy?.data?.map((item, id) => {
      return {
        key: id + 1,
        sno: id + 1,
        buyerMemberId: item.buyerMemberId,
        contractAmount: item.totalTrades,
        contractQuantity: item?.totalQuantity,
      };
    });
  }

  return (
    <>
      <div className="bg-[#F4F6F9] w-full">
        <div className="lg:container lg:px-10 lg:mx-auto w-full mt-32 lg:mt-0">
          {loadingData ? (
            <>
              <div className="flex items-center mt-[190px] lg:mt-0 h-[100vh] mx-auto justify-center lg:h-auto">
                <div className="animate-spin mt-[0px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
              </div>
            </>
          ) : (
            <>
                <div className="py-5">
                <div className="lg:px-[2px] px-[60px] z-[9] relative ">
                  <Anchor
                      className={`${anchorTop} lg:z-[9] z-[-9999] lg:mt-0 lg:relative inherit
                     bg-white rounded-lg shadow-md lg:mb-[30px] mb-[40px] font-semibold py-2 ps-5
                     hidden lg:block`}
                    direction="horizontal"
                    items={[
                      {
                        key: "overview",
                        href: `/broker/${1}`,
                        title: (
                          <span
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                            }
                          >
                            <span className="text-[16px]">Information</span>
                          </span>
                        ),
                      },
                      {
                        key: "Financials",
                        href: `/broker/breakdownBuyers/${
                          isNaN(id) ? 1 : Number(id)
                        }`,
                        title: (
                          <span
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                            }
                          >
                            <span className="border-b-4 text-[16px]  border-black px-[2px] text-blue-600">
                              {" "}
                              Buyers
                            </span>
                          </span>
                        ),
                      },
                      {
                        key: "Ratio",
                        href: `/broker/breakdownSellers/${
                          isNaN(id) ? 1 : Number(id)
                        }`,
                        title: (
                          <span
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                            }
                          >
                            <span className="text-[16px]">Sellers</span>
                          </span>
                        ),
                      },
                      {
                        key: "dividend-analysis",
                        href: `/broker/breakdownTopFiveSymbol/${"adbl"}`,
                        title: (
                          <span
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                            }
                          >
                            <span className="text-[16px]">Symbols</span>
                          </span>
                        ),
                      },
                    ]}
                  ></Anchor>
                </div>

                  <div className="flex flex-col lg:flex-row lg:justify-between !mt-10">
                    <div className="flex items-start gap-5">
                    {/* <div className="flex flex-col gap-5">
                      <div>
                        <Link
                          className={({ isActive }) =>
                            isActive
                              ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                              : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                          }
                          href={`/broker/${1}`}
                        >
                          <BsInfoCircle />
                          <span className="font-[500] text-xs">
                            Information
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          className={({ isActive }) =>
                            isActive
                              ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                              : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                          }
                          href={`/broker/breakdownBuyers/${
                            isNaN(id) ? 1 : Number(id)
                          }`}
                        >
                          <GrCart />
                          <span className="font-[500] text-xs">Buyers</span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          className={({ isActive }) =>
                            isActive
                              ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                              : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                          }
                          href={`/broker/breakdownSellers/${
                            isNaN(id) ? 1 : Number(id)
                          }`}
                        >
                          <GoTag />
                          <span className="font-[500] text-gray-500 text-xs">
                            Sellers
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          className={({ isActive }) =>
                            isActive
                              ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                              : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                          }
                          href={`/breakdownTopFiveSymbol/${"adbl"}`}
                        >
                          <GrCart />
                          <span className="font-[500] text-gray-500 text-xs">
                            Symbols
                          </span>
                        </Link>
                      </div>
                    </div> */}
                    </div>
                    <div className="order-2 lg:order-none mt-10 lg:mt-0">
                    <div className="flex lg:flex-row flex-col gap-10">
                      <div className="lg:w-[100%]  rounded-[20px] shadow-md  bg-secondary ">
                        <h1 className="font-semibold px-3 py-2 text-lg">
                          Today Top 5 Buyers
                        </h1>
                        <BarChart
                          type={"buyer"}
                          topData={buyers?.today != null ? buyers?.today : []}
                        />
                      </div>
                      <div className="lg:w-[100%]  rounded-[20px] shadow-md  bg-secondary ">
                        <h1 className="font-semibold px-3 py-2 text-lg">
                          Weekly Top Buyers
                        </h1>
                        <BarChart
                          type={"buyer"}
                          topData={buyers?.weekly != null ? buyers?.weekly : []}
                        />
                      </div>
                    </div>
                  </div>

                    <div className=" order-1 lg:order-none mt-3 lg:mt-0 flex flex-col justify-between">
                    <div className="financial-info bg-success-4    p-3 rounded-xl shadow-md flex ">
                      <div className="mr-[20px]  h-10 Primary bg-secondary    text-primary-2  px-[8px] py-[8px] rounded-2xl">
                        <GrCart size={24} />
                      </div>
                      <div>
                        <p className="lg:text-[12px] text-[17px] text-success font-[600]">
                          Total Buy Broker
                        </p>
                        <p className="lg:text-[14px] py-1 text-[20px] text-[#000] font-[400]">
                          {topBuyers?.buyerBrokerName}
                        </p>
                      </div>
                    </div>
                    <div className="financial-info bg-success-4    p-3 rounded-xl shadow-md flex ">
                      <div className="mr-[20px]  h-10 bg-secondary    Primary text-secondary  px-[8px] py-[8px] rounded-2xl">
                        <GrCart size={24} />
                      </div>
                      <div>
                        <p className="lg:text-[12px] text-[17px] text-success font-[600]">
                          Total Amount
                        </p>
                        <p className="lg:text-[14px] py-1 text-[20px] text-[#000] font-[400]">
                          {topBuyers &&
                            topBuyers?.totalAmount &&
                            topBuyers?.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="financial-info bg-success-4    p-3 rounded-xl shadow-md flex ">
                      <div className="mr-[20px]  h-10 bg-secondary    Primary text-primary  px-[8px] py-[8px] rounded-2xl">
                        <GrCart size={24} />
                      </div>
                      <div>
                        <p className="lg:text-[12px] text-[17px] text-success font-[600]">
                          Total Buy Quantity
                        </p>
                        <p className="lg:text-[14px] py-1 text-[20px] text-primary font-[400]">
                          {topBuyers?.totalQuantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="pt-14 lg:container lg:mx-auto lg:px-10 flex justify-end">
          <RangePicker
            size="large"
            onChange={handleDateRangeChange}
            value={brokerDateRange}
            disabledDate={(current) =>
              current && current > moment().endOf("day")
            }
          />
          <button
            className="ml-[10px] px-3 py-1.5 bg-primary text-secondary rounded-md"
            onClick={handleRangeBrokerData}
          >
            <SearchOutlined className="relative -top-[4px]" />
          </button>
        </div> */}
        <div className="py-10 lg:container lg:mx-auto lg:px-10">
          {selectedBuyData?.length > 0 ? (
            <BrokerBuyersTable buyData={selectedBuyData} loading={loading} />
          ) : (
            <BrokerBuyersTable buyData={buyData} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};

export default BreakdownByBuyers;
