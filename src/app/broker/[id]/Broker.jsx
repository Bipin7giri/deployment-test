"use client";
import React from "react";
import { Anchor, Select, Tag } from "antd";
import { BiPhone } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { GoTag } from "react-icons/go";
import { BiLinkExternal } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./_redux/action";
import { formatMoney } from "../../../utils/formatMoney";
import brokerAction from "../../(portfolio)/portfolio/_redux/action";
import TopSellBuyStockChart from "./_component/TopSellBuyStockChart";
import Footer from "../../../components/Footer";
import api from "../../../api/axios";
import { DatePicker } from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import {
  setHistoricalInformationByBroker,
  setHistoricalInformationByTopBuysellBroker,
} from "./_redux/brokerSlice";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

const Broker = ({ id }) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState(id ? id : 1);
  const [firstLoad, setFirstLoad] = useState(true);
  const [highBuying, setHighBuying] = useState();
  const [highSelling, setHighSelling] = useState();
  const [loading, setLoading] = useState(true);
  const [totalBuying, setTotalBuying] = useState([]);
  const [totalSelling, setTotalSelling] = useState([]);
  const [fromDate, setFromDate] = useState([]);
  const [pickedDateRange, setPickedDateRange] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState(1);
  const [brokerDateRange, setBrokerDateRange] = useState(null);
  const [anchorTop, setAnchorTop] = useState("");
  const router = useRouter();

  // for available broker
  useEffect(() => {
    dispatch(brokerAction.getBrokerInfo());
  }, []);

  const { brokerInfo } = useSelector((state) => state.portfolio);
  const {
    brokerBreakDownTopFiveId,
    historicalInformationByBroker,
    historicalInformationByTopBuysellBroker,
  } = useSelector((state) => state.broker);

  let brokerNumber;
  let brokerInfomartion = [];
  if (brokerInfo?.brokerInfo !== undefined) {
    brokerInfomartion = brokerInfo?.brokerInfo.map((item, id) => {
      return { name: item?.memberName, brokerno: parseInt(item.memberCode) };
    });
    brokerNumber = brokerInfo?.brokerInfo
      .map((obj) => (obj.memberName === selectedItems ? obj.memberCode : null))
      .find((id) => id !== null);

    // navigate(`/broker/${brokerNumber}`)
  }

  const filteredOptions = brokerInfomartion;

  // const date = new Date(dateString);

  // const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // const formattedDate = date.toLocaleDateString(undefined, options);

  const highetSellingBuying = async (id) => {
    try {
      const [resHighestSelling, resHighestBuying, totalBuying, totalSelling] =
        await Promise.all([
          api.get(`/floorsheet/broker_breakdown/highest_selling/${id}`),
          api.get(`/floorsheet/broker_breakdown/highest_buying/${id}`),
          api.get(`/floorsheet/broker_breakdown/total_buying/${id}`),
          api.get(`/floorsheet/broker_breakdown/total_selling/${id}`),
        ]);
      setTotalBuying();
      if (totalBuying) {
        setTotalBuying(totalBuying.data.data);
      }
      if (totalSelling) {
        setTotalSelling(totalSelling.data.data);
      }
      if (resHighestBuying) {
        setHighBuying(resHighestBuying.data.data);
        setLoading(false);
      }
      if (resHighestSelling) {
        setHighSelling(resHighestSelling.data.data);
        setLoading(false);
      }
    } catch (error) {
      // Handle error here
      setLoading(false);
      console.error(error);
    }
  };

  // get As of Data Api
  const getFloorsheetData = async () => {
    const res = await api.get("floorsheet/broker_breakdown/get_entry_date");
    if (res) {
      setFromDate(res.data.data);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    // navigate(`/broker/${selectedOptions}`)
    //first load is false
    setFirstLoad(false);
    id = selectedOptions;
    router.push(`/broker/${selectedOptions}`);
    // dispatch(actions.getBrokerDetails({ brokerNo: selectedOptions }));
    // dispatch(
    //   actions.getBrokerBreakDownTopFiveBrokerId({ brokerNo: selectedOptions })
    // );
    // highetSellingBuying(selectedOptions);
    // setSelectedBroker(selectedOptions);
    // setSelectedItems(selectedOptions);
    // setBrokerDateRange(null);
    // dispatch(setHistoricalInformationByBroker([]));
    // dispatch(setHistoricalInformationByTopBuysellBroker([]));
  };

  useEffect(() => {
    // assging selected broker in search bar
    if (id) {
      const defaultBrokerSelected = filteredOptions.find(
        (ele) => ele.brokerno == id
      );
      setSelectedItems(
        `${defaultBrokerSelected?.brokerno} (${defaultBrokerSelected?.name})`
      );
    }
    if (brokerNumber) {
      dispatch(
        actions.getBrokerDetails({
          brokerNo: brokerNumber === undefined ? 1 : brokerNumber,
        })
      );
      highetSellingBuying(id);
      dispatch(actions.getBrokerBreakDownTopFiveBrokerId({ brokerNo: id }));
    } else {
      highetSellingBuying(id);
      dispatch(actions.getBrokerDetails({ brokerNo: id }));
      dispatch(actions.getBrokerBreakDownTopFiveBrokerId({ brokerNo: id }));
    }
    getFloorsheetData();
  }, [id, brokerNumber]);

  const { brokerDetails } = useSelector((state) => state.broker);

  let brokerData = [];
  if (brokerDetails?.data?.[0] !== undefined) {
    brokerData = brokerDetails?.data?.[0];
  }

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
      dispatch(setHistoricalInformationByBroker([]));
      dispatch(setHistoricalInformationByTopBuysellBroker([]));
    }
  };

  // for hystoric data
  const handleRangeBrokerData = () => {
    if (selectedRange) {
      dispatch(
        actions.getHistoricalInformationByBroker({
          fromDate: pickedDateRange[0],
          toDate: pickedDateRange[1],
          broker: selectedBroker,
        })
      );
      dispatch(
        actions.getHistoricalInformationByTopBuysellBroker({
          fromDate: pickedDateRange[0],
          toDate: pickedDateRange[1],
          broker: selectedBroker,
        })
      );
    }
  };

  let hystoricalInfo;
  if (
    historicalInformationByBroker !== undefined &&
    historicalInformationByBroker !== null
  ) {
    hystoricalInfo = historicalInformationByBroker?.data;
  }
  let hystoricalBuySellInfo;
  if (
    historicalInformationByTopBuysellBroker !== undefined &&
    historicalInformationByTopBuysellBroker !== null
  ) {
    hystoricalBuySellInfo = historicalInformationByTopBuysellBroker?.data;
  }

  useEffect(() => {
    // only take from params in first load
    if (id && firstLoad) {
      const defaultBrokerSelected = filteredOptions.find(
        (ele) => ele.brokerno == id
      );
      setSelectedItems(
        `${defaultBrokerSelected?.brokerno} (${defaultBrokerSelected?.name})`
      );
    }
    // const handleScroll = () => {
    //   if (typeof window !== "undefined") {
    //     if (window.pageYOffset > 50) {
    //       setAnchorTop("lg:top-[10vh] top-[12vh]");
    //     } else {
    //       setAnchorTop("");
    //     }
    //   }
    // };
  });

  return (
    <>
      <div className="w-full  bg-[#f4f6f9cb]  sm:flex sm:items-center sm:justify-center lg:ml-0 ">
        <div className=" !w-full lg:container  pb-10 mt-36 lg:mt-0  lg:pl-5 lg:mx-auto  flex lg:flex-row flex-col gap-5    justify-between ">
          {loading ? (
            <>
              <div className="container flex items-center mx-auto justify-center lg:h-[100vh]">
                <div className="animate-spin mt-[-100px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex px-0  lg:px-5 lg:flex-row flex-col gap-0 lg:gap-10 w-full">
                <div className="order-2 lg:order-none lg:w-[70%] lg:min-w-[70%] pl-0 lg:pl-10 py-0 lg:py-5">
                  <div className="lg:px-[2px] px-[60px] z-[9] relative hidden lg:block ">
                    <Anchor
                      className={`${anchorTop} lg:z-[9] z-[-9999] lg:mt-0 lg:relative inherit bg-white py-2 ps-5 rounded-lg shadow-md lg:mb-[30px] mb-[40px] font-semibold`}
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
                              <span className="border-b-4 text-[16px]  border-black px-[2px] text-blue-600">
                                {" "}
                                Information
                              </span>
                            </span>
                          ),
                        },
                        {
                          key: "Financials",
                          href: `/broker/breakdownBuyers/${
                            isNaN(id) ? 1 : Number(id)
                          }`,
                          title: (
                            <span className="text-[16px] px-4">
                              <span className="text-[16px]">Buyers</span>
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

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-start gap-5 w-full">
                      {/* <div className="flex  gap-5">
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
                          </NavLink>
                        </div>
                        <div>
                          <Link
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                            }
                            href={`/broker/breakdownByBuyers/${
                              isNaN(id) ? 1 : Number(id)
                            }`}
                          >
                            <GrCart />
                            <span className="font-[500] text-xs">Buyers</span>
                          </NavLink>
                        </div>
                        <div>
                          <Link
                            className={({ isActive }) =>
                              isActive
                                ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                            }
                            href={`/broker/breakdownBySellers/${
                              isNaN(id) ? 1 : Number(id)
                            }`}
                          >
                            <GoTag />
                            <span className="font-[500] text-gray-500 text-xs">
                              Sellers
                            </span>
                          </NavLink>
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
                          </NavLink>
                        </div>
                      </div> */}
                      <div className="w-full px-5">
                        <div className="flex justify-end mb-[10px] items-center">
                          <h2 className="text-sm text-gray-800 py-2 font-[500] mt-5 lg:mt-0">
                            <Tag color="cyan">As of {fromDate?.today}</Tag>
                          </h2>
                          {/* <div>
                            <RangePicker size="large"
                              onChange={handleDateRangeChange}
                              value={brokerDateRange}
                              disabledDate={(current) =>
                                current && current > moment().endOf("day")
                              } />
                            <button className="ml-[10px] px-3 py-1.5 bg-primary text-secondary rounded-md"
                              onClick={handleRangeBrokerData}>
                              <SearchOutlined className="relative -top-[4px]" />
                            </button>
                          </div> */}
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <h2 className="text-lg font-[500]">About</h2>
                          <div className="flex items-baseline">
                            <h6 className="text-sm font-[500] mr-[4px]">
                              Search:
                            </h6>
                            <Select
                              name="brokerInfo"
                              mode="single"
                              showSearch={true}
                              placeholder="Choose the broker"
                              value={selectedItems || ""}
                              onChange={handleSelectChange}
                              options={filteredOptions?.map((item) => {
                                const searchString = `${item.brokerno} ${item.name}`; // Combine broker number and name for search
                                return {
                                  value: item.brokerno,
                                  label: `${item.brokerno} (${item.name})`,
                                  searchString: searchString.toLowerCase(), // Store the lowercase search string
                                };
                              })}
                              filterOption={(inputValue, option) =>
                                option.searchString.indexOf(
                                  inputValue.toLowerCase()
                                ) !== -1
                              } // Perform search based on the lowercase search string
                              className="w-[300px]"
                            />
                          </div>
                        </div>
                        <p className="lg:text-[14px] px-5  text-gray-700  text-[24px] leading-[1.7]  py-5">
                          {brokerData?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:flex-col pt-5 flex-col gap-2 ">
                    {hystoricalBuySellInfo !== undefined &&
                    hystoricalBuySellInfo !== null &&
                    Object?.keys(hystoricalBuySellInfo)?.length > 0 ? (
                      <>
                        <div className="lg:w-[100%] p-4 shadow-md rounded-[20px] bg-secondary ">
                          <h1 className="font-semibold  text-lg">Top 5 Buy</h1>
                          <TopSellBuyStockChart
                            topData={hystoricalBuySellInfo?.topSell}
                          />
                        </div>
                        <div className="lg:w-[100%] p-4 shadow-md rounded-[20px] bg-secondary ">
                          <h1 className="font-semibold  text-lg">Top 5 Sell</h1>
                          <TopSellBuyStockChart
                            topData={hystoricalBuySellInfo?.topBuy}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="lg:w-[100%] p-4 shadow-md rounded-[20px] bg-secondary ">
                          <h1 className="font-semibold  text-lg">Top 5 Buy</h1>
                          <TopSellBuyStockChart
                            topData={
                              brokerBreakDownTopFiveId != null
                                ? brokerBreakDownTopFiveId?.data?.topBuyer
                                : []
                            }
                          />
                        </div>
                        <div className="lg:w-[100%] p-4 shadow-md rounded-[20px] bg-secondary ">
                          <h1 className="font-semibold  text-lg">Top 5 Sell</h1>
                          <TopSellBuyStockChart
                            topData={
                              brokerBreakDownTopFiveId != null
                                ? brokerBreakDownTopFiveId?.data?.topseller
                                : []
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="order-1 mt-10 lg:mt-0 lg:order-none lg:w-[30%] ml-0 lg:ml-10  bg-secondary">
                  <div className="py-2">
                    <div>
                      <div>
                        <div className="flex items-center gap-4">
                          <div>
                            <div
                              id="tooltip-jese"
                              role="tooltip"
                              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                            <img
                              data-tooltip-target="tooltip-jese"
                              className=" px-5  lg:w-28 w-20 h-20 lg:h-28 rounded-full object-contain"
                              src={`https://peridotnepal.xyz//broker_logo/${parseInt(
                                brokerData?.memberCode
                              )}.webp`}
                              // src={`http://154.26.128.9/broker_logo/1.webp`}
                              alt={brokerData?.memberName}
                            />
                          </div>
                          <div>
                            <h1 className=" lg:text-[16px] font-[600]">
                              {brokerData?.memberName}
                            </h1>
                            <span className="flex items-center py-2 text-[#1d73d1] gap-1">
                              <BiLinkExternal size={14} />
                              <a
                                href={
                                  brokerData?.tmsLink &&
                                  !/^https?:\/\//i.test(brokerData.tmsLink)
                                    ? `http://${brokerData.tmsLink}`
                                    : brokerData?.tmsLink
                                }
                                target="_blank"
                                className="!text-xs underline md:text-base font-medium"
                              >
                                {brokerData?.tmsLink}
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="px-5 flex justify-between flex-wrap">
                          {/* <div className="flex items-center gap-1">
                            <CgMail size={14} />
                            <Link
                              href="mailto:info@midasbroker.com.np"
                              className="lg:text-[13px] text-[20px]"
                            >
                              info@midasbroker.com.np
                            </Link>
                          </div> */}

                          <div className="flex items-center gap-1">
                            <BiPhone size={14} />
                            <Link
                              href="tel:+977071-570312"
                              className="lg:text-[13px] text-[20px]"
                            >
                              01-{brokerData?.authorizedContactPersonNumber}
                            </Link>
                          </div>
                          {/* <div className="flex items-center py-2 gap-1">
                            <BiPhone size={14} />
                            <Link
                              href="tel:+977071-570312"
                              className="lg:text-[13px] text-[20px]"
                            >
                              01-{brokerData?.authorizedContactPersonNumber}
                            </Link>
                          </div> */}
                        </div>
                      </div>
                      <div className=" my-6 flex justify-center">
                        <hr className="h-[2px] rounded-md  w-[80%] text-center bg-gray-200 border-0 dark:bg-gray-700"></hr>
                      </div>
                      <div className="px-6">
                        <h1 className="font-[500]">Highlights</h1>
                        <div className="flex py-2 justify-between lg:text-xs">
                          <div className="flex flex-col gap-1">
                            <span className="text-[#39D49F]">
                              Total Buy Quantity
                            </span>
                            {hystoricalInfo?.buyInfo?.totalQuantity ? (
                              <span>
                                {formatMoney(
                                  hystoricalInfo?.buyInfo?.totalQuantity
                                )}{" "}
                                Units
                              </span>
                            ) : totalBuying && totalBuying.length > 0 ? (
                              <span>
                                {formatMoney(totalBuying[0].total_quantity)}{" "}
                                Units
                              </span>
                            ) : (
                              <span>No data available</span>
                            )}
                          </div>
                          <div className="h-8 flex items-center">
                            <div className="h-full border border-gray-300 mx-auto"></div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-red-500">
                              Total Sell Quantity
                            </span>
                            {hystoricalInfo?.sellInfo?.totalQuantity ? (
                              <span>
                                {formatMoney(
                                  hystoricalInfo?.sellInfo?.totalQuantity
                                )}{" "}
                                Units
                              </span>
                            ) : totalSelling && totalSelling.length > 0 ? (
                              <span>
                                {formatMoney(totalSelling[0].total_quantity)}{" "}
                                Units
                              </span>
                            ) : (
                              <span>No data available</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col py-5 gap-4">
                          {/* <div className="financial-info bg-success-4 p-4 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] flex justify-center items-center w-14  h-14 text-primary   bg-secondary     rounded-full">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[14px] pb-2 text-[14px] text-success    font-[500]">
                                Highest Buying Amount
                              </p>
                              <p className="lg:text-[14px] text-[20px] text-primary-2 font-[500]">
                                Rs  {highBuying != undefined && (
                                  <>
                                    {formatMoney(highBuying[0]?.contractAmount)}
                                  </>
                                )}

                              </p>
                            </div>
                          </div> */}
                          {/* <div className="financial-info bg-danger-4 p-4 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] flex justify-center items-center w-14  h-14 text-primary   bg-secondary     rounded-full">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[14px] pb-2 text-[14px] text-danger  font-[500]">
                                Highest Selling Amount
                              </p>
                              <p className="lg:text-[14px] text-[20px] text-primary font-[500]">
                                Rs {highSelling != undefined && (
                                  <>
                                    {formatMoney(highSelling[0]?.contractAmount)}
                                  </>
                                )}
                              </p>
                            </div>
                          </div> */}

                          <div className="financial-info bg-success-4 p-4 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] flex justify-center items-center w-14  h-14 text-primary   bg-secondary     rounded-full">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[14px] pb-2 text-[14px] text-success  font-[500]">
                                Total Buy Amount
                              </p>
                              <p className="lg:text-[14px] text-[20px] text-[#000] font-[500]">
                                Rs{" "}
                                {hystoricalInfo?.buyInfo?.totalTrades ? (
                                  <span>
                                    {formatMoney(
                                      hystoricalInfo?.buyInfo?.totalTrades?.toFixed(
                                        2
                                      )
                                    )}
                                  </span>
                                ) : (
                                  formatMoney(
                                    brokerData?.totalContractAmountBuyer?.toFixed(
                                      2
                                    )
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="financial-info bg-danger-4 p-4 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] flex justify-center items-center w-14  h-14 text-primary   bg-secondary     rounded-full">
                              <GoTag size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[14px] pb-2 text-[14px] text-danger  font-[500]">
                                Total Sale Amount
                              </p>
                              <p className="lg:text-[14px] text-[20px] text-primary font-[500]">
                                Rs{" "}
                                {hystoricalInfo?.sellInfo?.totalTrades ? (
                                  <span>
                                    {formatMoney(
                                      hystoricalInfo?.sellInfo?.totalTrades?.toFixed(
                                        2
                                      )
                                    )}
                                  </span>
                                ) : (
                                  formatMoney(
                                    brokerData?.totalContractAmountSeller?.toFixed(
                                      2
                                    )
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="financial-info bg-success-4 p-4 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] flex justify-center items-center w-14  h-14 text-primary   bg-secondary     rounded-full">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[14px] pb-2 text-[14px] text-success  font-[500]">
                                Total Buy Transaction
                              </p>
                              <p className="lg:text-[14px] text-[20px] text-[#000] font-[500]">
                                {hystoricalInfo?.buyInfo
                                  ?.totalBuyTransaction ? (
                                  <span>
                                    {formatMoney(
                                      hystoricalInfo?.buyInfo
                                        ?.totalBuyTransaction
                                    )}
                                  </span>
                                ) : (
                                  formatMoney(brokerData?.rowCountBuyer)
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="financial-info bg-danger-4 p-4 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] flex justify-center items-center w-14  h-14 text-primary   bg-secondary     rounded-full">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[14px] pb-2 text-[14px] text-danger  font-[500]">
                                Total Sale Transaction
                              </p>
                              <p className="lg:text-[14px] text-[20px] text-primary font-[500]">
                                {hystoricalInfo?.sellInfo
                                  ?.totalSellTransaction ? (
                                  <span>
                                    {formatMoney(
                                      hystoricalInfo?.sellInfo
                                        ?.totalSellTransaction
                                    )}
                                  </span>
                                ) : (
                                  formatMoney(brokerData?.rowCountSeller)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Broker;
