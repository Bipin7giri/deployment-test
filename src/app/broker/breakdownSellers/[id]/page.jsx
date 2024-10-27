"use client";
import React, { useState, useEffect } from "react";
import { TbMoneybag } from "react-icons/tb";
import BarChart from "../../[id]/_component/BarChart";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Sidebar from "../../[id]/_component/SideBar";
import api from "@/api/axios";
import BrokerSellersTable from "../../[id]/_component/BrokerSellersTable";
import marketActions from "../../../(market)/_redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { BsInfoCircle } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { GoTag } from "react-icons/go";
import Link from "next/link";
import { Anchor, DatePicker } from "antd";
import moment from "moment";
import actions from "../../[id]/_redux/action";
import { setBrokerHystoricSell } from "../../[id]/_redux/brokerSlice";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const BreakdownBySellers = ({ params: { id } }) => {
  const [loadingData, setLoading] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sellers, setSellers] = useState(null);
  const [topSeller, setTopSellers] = useState(null);
  const [brokerDateRange, setBrokerDateRange] = useState(null);
  const [pickedDateRange, setPickedDateRange] = useState([]);

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
  //   handleScroll();
  // });

  const dispatch = useDispatch();
  const { brokerStockSelling, loading } = useSelector((state) => state.market);
  const { brokerHystoricSell } = useSelector((state) => state.broker);

  //   dispatch(marketActions.getBrokerStockSelling());

  useEffect(() => {
    dispatch(marketActions.getBrokerStockSelling());
  }, []);

  let sellData = [];

  if (brokerStockSelling?.sell !== undefined) {
    sellData = brokerStockSelling?.sell?.map((item, id) => {
      return {
        key: id + 1,
        sno: id + 1,
        sellerMemberId: item.sellerMemberId,
        contractAmount: item.contractAmount,
        contractQuantity: item?.contractQuantity,
      };
    });
  }
  const weeklyTopSellers = async () => {
    try {
      const res = await api.get(
        `/floorsheet/broker_breakdown/top_five_by_seller`
      );
      if (res) {
        setSellers(res.data.data);
        setTopSellers(res.data.data.today[0]);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  // useEffect(() => {
  //   breakDownSellingStock();
  // }, [pagination.current]);

  useEffect(() => {
    weeklyTopSellers();
  }, [id]);

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
      dispatch(setBrokerHystoricSell([]));
    }
  };

  const handleRangeBrokerData = () => {
    if (selectedRange) {
      dispatch(
        actions.getBrokerHistoricSell({
          fromDate: pickedDateRange[0],
          toDate: pickedDateRange[1],
        })
      );
    }
  };

  let selectedSellData = [];
  if (brokerHystoricSell?.data !== undefined) {
    selectedSellData = brokerHystoricSell?.data?.map((item, id) => {
      return {
        key: id + 1,
        sno: id + 1,
        sellerMemberId: item.sellerMemberId,
        contractAmount: item.totalTrades,
        contractQuantity: item?.totalQuantity,
      };
    });
  }

  return (
    <>
      <div className="bg-[#F4F6F9] ">
        <div className="lg:container lg:px-10 lg:mx-auto  mx-auto mt-32 lg:mt-0">
          {loadingData ? (
            <>
              <div className="flex items-center mt-[190px] lg:mt-0 h-[100vh] mx-auto justify-center lg:h-auto">
                <div className="animate-spin mt-[0px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
              </div>
            </>
          ) : (
            <>
              <div className="py-5 ">
                <div className="lg:px-[2px] px-[60px] z-[9] relative ">
                  <Anchor
                      className={`${anchorTop} text-[16px] lg:z-[9] z-[-9999] lg:mt-0 lg:relative inherit
                     bg-white rounded-lg shadow-md lg:mb-[30px] mb-[40px] font-semibold py-3 ps-5
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
                        key: "Buyers",
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
                            <span className="text-[16px]">Buyers</span>
                          </span>
                        ),
                      },
                      {
                        key: "Sellers",
                        href: `/broker/breakdownSellers/${
                          isNaN(id) ? 1 : Number(id)
                        }`,
                        title: (
                          <span
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold  "
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal "
                            }
                          >
                            <span className="border-b-4 text-[16px] text-blue-600 border-black px-[2px] ">
                              {" "}
                              Sellers
                            </span>
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
                  <div className="flex gap-8  flex-col lg:flex-row lg:justify-between !mt-10">
                  <div className="flex  items-start gap-5">
                    {/* <div className="flex flex-col gap-5">
                      <div>
                        <Link
                          className={({ isActive }) =>
                            isActive
                              ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                              : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                          }
                          to={`/broker/${1}`}
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
                          to={`/broker/breakdownBuyers/${
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
                          to={`/broker/breakdownSellers/${
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
                          to={`/breakdownTopFiveSymbol/${"adbl"}`}
                        >
                          <GrCart />
                          <span className="font-[500] text-gray-500 text-xs">
                            Symbols
                          </span>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                    <div className="order-2 lg:order-none mt-3 lg:mt-none">
                      <div className="flex lg:flex-row flex-col gap-10 ">
                      <div className="lg:w-[100%]  rounded-3xl shadow-md  bg-secondary ">
                        <h1 className="font-semibold px-3 py-2 text-lg">
                          Today Top 5 Sellers{" "}
                        </h1>
                        <BarChart
                          topData={sellers?.today != null ? sellers?.today : []}
                        />
                      </div>
                      <div className="lg:w-[100%]  rounded-[20px] shadow-md  bg-secondary ">
                        <h1 className="font-semibold px-3 py-2 text-lg">
                          Weekly Top 5 Sellers
                        </h1>
                        <BarChart
                          topData={
                            sellers?.weekly != null ? sellers?.weekly : []
                          }
                        />
                      </div>
                    </div>
                  </div>

                    <div className="order-1 lg:order-none -mt-5 lg:mt-0 flex flex-col  justify-between">
                    <div className="financial-info bg-danger-4    p-3 rounded-xl shadow-md flex ">
                      <div className="mr-[20px] h-10 bg-secondary   text-primary  px-[8px] py-[8px] rounded-2xl">
                        <GoTag size={24} />
                      </div>
                      <div>
                        <p className="lg:text-[12px] text-[17px] text-danger font-[600]">
                          Top Sell Broker
                        </p>
                        <p className="lg:text-[12px] py-1 text-[20px] text-[#000] font-[400]">
                          {topSeller?.sellerBrokerName}
                        </p>
                      </div>
                    </div>
                    <div className="financial-info bg-danger-4    p-3 rounded-xl shadow-md flex ">
                      <div className="mr-[20px]  h-10 bg-secondary   text-primary  px-[8px] py-[8px] rounded-2xl">
                        <GoTag size={24} />
                      </div>
                      <div>
                        <p className="lg:text-[12px] text-[17px] text-danger font-[600]">
                          Total Amount
                        </p>
                        <p className="lg:text-[14px] py-1 text-[20px] text-[#000] font-[400]">
                          {topSeller &&
                            topSeller?.totalAmount &&
                            topSeller?.totalAmount?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="financial-info bg-danger-4    p-3 rounded-xl shadow-md flex ">
                      <div className="mr-[20px]  h-10 bg-secondary   text-primary   px-[8px] py-[8px] rounded-2xl">
                        <GoTag size={24} />
                      </div>
                      <div>
                        <p className="lg:text-[12px] py-1 text-[17px] text-danger font-[600]">
                          Total Sell Quantity
                        </p>
                        <p className="lg:text-[14px] text-[20px] text-[#000] font-[400]">
                          {" "}
                          {topSeller?.totalQuantity}
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
          {selectedSellData?.length > 0 ? (
            <BrokerSellersTable sellData={selectedSellData} loading={loading} />
          ) : (
            <BrokerSellersTable sellData={sellData} loading={loading} />
          )}
        </div>

        {/* <div className="lg:w-[110%] mt-[190px] lg:mt-0">
          <div className=" lg:px-[40px] lg:mx-auto py-5 lg:pt-0 pt-44  gap-10 px-4 mx-auto">
            {loadingData ? <>
              <div className="flex items-center h-[100vh] lg:h-auto mx-auto justify-center ">
                <div className="animate-spin mt-[-100px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
              </div>
            </> : <>
              <div className="flex py-10 justify-between">

              </div>
              <div className="flex lg:flex-row flex-col gap-10">
                <div className="xl:w-[50%] shadow-xl rounded-lg bg-secondary ">
                  <h1 className="font-semibold px-3 py-2 text-lg">Today Top 5 Sellers </h1>
                  <BarChart topData={sellers?.today != null ? sellers?.today : []} />
                </div>
                <div className="xl:w-[50%] shadow-xl rounded-lg bg-secondary ">
                  <h1 className="font-semibold px-3 py-2 text-lg">Weekly Top 5 Sellers</h1>
                  <BarChart topData={sellers?.weekly != null ? sellers?.weekly : []} />
                </div>
              </div>
              <div className="py-10">
                <BrokerSellersTable sellData={sellData} loading={loading} />
              </div>
            </>}

          </div>
        </div> */}
      </div>
    </>
  );
};

export default BreakdownBySellers;
