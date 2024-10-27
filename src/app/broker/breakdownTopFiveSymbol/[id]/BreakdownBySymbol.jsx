"use client";
import React, { useState, useEffect } from "react";
import { TbMoneybag } from "react-icons/tb";
import BarChartCompanyWise from "../../[id]/_component/BarChartCompanyWIse";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import Sidebar from "../../[id]/_component/SideBar";
import actions from "../../[id]/_redux/action";
import { formatMoney } from "../../../../utils/formatMoney";
import { RxCross2 } from "react-icons/rx";
import BreakDownSymbolDashboardTable from "../../[id]/_component/BreakDownSymbolDashboardTable";
import marketActions from "../../../(market)/_redux/actions";
import { Anchor, Dropdown, Menu, Select, Space, Tag } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { GrCart } from "react-icons/gr";
import { GoTag } from "react-icons/go";
import { BsInfoCircle } from "react-icons/bs";
import api from "@/api/axios";
import { DatePicker } from "antd";
import moment from "moment";
import {
  setBrokerHystoricBuyBySym,
  setBrokerHystoricSell,
  setBrokerHystoricSellBySym,
} from "../../[id]/_redux/brokerSlice";
import Holdtables from "../../[id]/_component/Hold.tables";
import Matchingtable from "../../[id]/_component/MatchTable";
import { useParams } from "next/navigation";

const { RangePicker } = DatePicker;

const BreakdownBySymbol = ({ symbol, company }) => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [selectedName, setSelectedName] = useState("Buy");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [companyName, setCompanyName] = useState(
    "Agricultural Development Bank Limited"
  );
  const [selectedItems, setSelectedItems] = useState(
    "ADBL /Agricultural Development Bank Limited"
  );

  const [data, setTableData] = useState([]);
  const [selectedData, setSelectedTableData] = useState([]);
  const [symbolChnage, setSymbolChange] = useState();
  const [brokerDateRange, setBrokerDateRange] = useState(null);
  const [pickedDateRange, setPickedDateRange] = useState([]);
  const [activeSymbol, setactiveSymbol] = useState(
    `${company ? company : "adbl"}`
  );
  const [anchorTop, setAnchorTop] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.pageYOffset > 50) {
          setAnchorTop("lg:top-[10vh] top-[12vh]");
        } else {
          setAnchorTop("");
        }
      }
    };
    handleScroll();
  });

  const names = ["Buy", "Sell", "Hold", "Matching"];
  const { marketLiveHomeData } = useSelector((state) => state.home);
  const {
    brokerBreakDownTopFiveSymbol,
    brokerHystoricBuyBySym,
    brokerHystoricSellBySym,
  } = useSelector((state) => state.broker);
  const { loading, stockBuyingBrokerBySymbol, stockSellingBrokerBySymbol } =
    useSelector((state) => state.market);
  const [fromDate, setFromDate] = useState([]);

  let companyInformation = [];

  if (marketLiveHomeData?.liveData !== undefined) {
    companyInformation = marketLiveHomeData?.liveData?.map((item, id) => {
      return { name: item?.companyName, symbol: item?.symbol };
    });
  }

  const filteredOptions = companyInformation?.filter(
    (o) => !selectedItems.includes(o)
  );

  const getFloorsheetData = async () => {
    const res = await api.get("floorsheet/broker_breakdown/get_entry_date");
    if (res) {
      setFromDate(res.data.data);
    }
  };
  const handleMenuClick = (e) => {
    setBrokerDateRange(null);
    setSelectedName(e.key);
    dispatch(setBrokerHystoricBuyBySym([]));
    dispatch(setBrokerHystoricSellBySym([]));
    setSelectedTableData([]);
    setButtonClicked(false);
  };

  const HandleSelectChange = (selectedOptions) => {
    dispatch(setBrokerHystoricBuyBySym([]));
    dispatch(setBrokerHystoricSellBySym([]));
    setSelectedTableData([]);
    setBrokerDateRange(null);

    const splitArray = selectedOptions.split(" /");
    const symbol = splitArray[0];
    setSymbolChange(symbol);
    setactiveSymbol(symbol);
    const companyName = splitArray[1];
    setCompanyName(companyName);
    setSelectedItems(selectedOptions);

    useEffect(() => {
      dispatch(
        actions.getBrokerBreakDownTopFiveSymbol({
          companySymbol: company ? company : symbol,
        })
      );
    }, [company]);

    if (selectedItems) {
      if (selectedName === "Buy") {
        dispatch(
          marketActions.getStockBuyingBrokerBySymbol({
            symbol: company ? company : symbol,
          })
        );
      } else if (selectedName === "Sell") {
        dispatch(
          marketActions.getStockSellingBrokerBySymbol({
            symbol: company ? company : symbol,
          })
        );
      } else {
      }
    }
  };

  const setData = () => {
    if (selectedName === "Buy") {
      if (stockBuyingBrokerBySymbol?.data !== undefined) {
        const tableData = stockBuyingBrokerBySymbol?.data?.map((item, id) => {
          return {
            key: id + 1,
            sno: id + 1,
            brokerId: item.brokerId,
            brokerName: item.brokerName,
            contractAmount: item.contractAmount,
            contractQuantity: item?.contractQuantity,
            averagePrice: item?.averagePrice,
          };
        });
        setTableData(tableData);
      }
    } else {
      if (stockSellingBrokerBySymbol?.data !== undefined) {
        const tableData = stockSellingBrokerBySymbol?.data?.map((item, id) => {
          return {
            key: id + 1,
            sno: id + 1,
            brokerName: item.brokerName,
            brokerId: item.brokerId,
            contractAmount: item.contractAmount,
            contractQuantity: item?.contractQuantity,
            averagePrice: item?.averagePrice,
          };
        });
        setTableData(tableData);
      }
    }
  };
  useEffect(() => {
    setData();
  }, [
    selectedName,
    selectedItems,
    stockBuyingBrokerBySymbol,
    stockSellingBrokerBySymbol,
  ]);

  // useEffect(() => {
  //   if (pickedDateRange.length !== 2) {
  //     setrangeForHoldAndMatching(pickedDateRange);
  //   }
  // }, [pickedDateRange]);

  useEffect(() => {
    dispatch(
      actions.getBrokerBreakDownTopFiveSymbol({
        companySymbol: company ? company : symbolChnage ? symbolChnage : id,
      })
    );
    getFloorsheetData();
  }, [company, symbolChnage]);

  useEffect(() => {
    const splitArray = selectedItems.split(" /");
    const symbol = splitArray[0];
    if (selectedItems) {
      if (selectedName === "Buy") {
        if (company !== undefined) {
          dispatch(
            marketActions.getStockBuyingBrokerBySymbol({ symbol: company })
          );
        } else {
          dispatch(
            marketActions.getStockBuyingBrokerBySymbol({ symbol: symbol })
          );
        }
      } else {
        if (company !== undefined) {
          dispatch(
            marketActions.getStockSellingBrokerBySymbol({ symbol: company })
          );
        } else {
        }
      }
    }
  }, [selectedName, company, symbolChnage]);

  const [selectedRange, setSelectedRange] = useState(false);

  const handleDateRangeChange = (e) => {
    if (e !== null && e !== undefined) {
      setBrokerDateRange(e);
      const fromDate = e[0].format("YYYY-MM-DD");
      const toDate = e[1].format("YYYY-MM-DD");
      if (fromDate && toDate) {
        setPickedDateRange([fromDate, toDate]);
        setSelectedRange(true);
      } else {
        setSelectedRange(false);
      }
    } else {
      setBrokerDateRange(null);
      setSelectedRange(false);
      setSelectedTableData([]);
      dispatch(setBrokerHystoricBuyBySym([]));
      dispatch(setBrokerHystoricSellBySym([]));
    }
  };

  const handleRangeBrokerData = () => {
    if (selectedRange) {
      if (selectedName === "Buy") {
        if (company !== undefined) {
          dispatch(
            actions.getBrokerHistoricBuyBySym({
              fromDate: pickedDateRange[0],
              toDate: pickedDateRange[1],
              symbol: company,
            })
          );
        } else {
          dispatch(
            actions.getBrokerHistoricBuyBySym({
              fromDate: pickedDateRange[0],
              toDate: pickedDateRange[1],
              symbol: symbolChnage ? symbolChnage : id,
            })
          );
        }
      } else if (selectedName === "Sell") {
        if (company !== undefined) {
          dispatch(
            actions.getBrokerHistoricSellBySym({
              fromDate: pickedDateRange[0],
              toDate: pickedDateRange[1],
              symbol: company,
            })
          );
        } else {
          dispatch(
            actions.getBrokerHistoricSellBySym({
              fromDate: pickedDateRange[0],
              toDate: pickedDateRange[1],
              symbol: symbolChnage ? symbolChnage : id,
            })
          );
        }
      } else {
      }
    }
  };

  const handleSelectedStockData = () => {
    if (selectedName === "Buy") {
      if (brokerHystoricBuyBySym?.data !== undefined) {
        const tableData = brokerHystoricBuyBySym?.data?.map((item, id) => {
          return {
            key: id + 1,
            sno: id + 1,
            brokerId: item.brokerId,
            brokerName: item.brokerName,
            contractAmount: item.contractAmount,
            contractQuantity: item?.contractQuantity,
            averagePrice: item?.averagePrice,
          };
        });
        setSelectedTableData(tableData);
      }
    } else {
      if (brokerHystoricSellBySym?.data !== undefined) {
        const tableData = brokerHystoricSellBySym?.data?.map((item, id) => {
          return {
            key: id + 1,
            sno: id + 1,
            brokerName: item.brokerName,
            brokerId: item.brokerId,
            contractAmount: item.contractAmount,
            contractQuantity: item?.contractQuantity,
            averagePrice: item?.averagePrice,
          };
        });
        setSelectedTableData(tableData);
      }
    }
  };

  useEffect(() => {
    if (selectedRange) {
      handleSelectedStockData();
    }
  }, [
    selectedRange,
    brokerHystoricBuyBySym,
    brokerHystoricSellBySym,
    symbolChnage,
  ]);

  useEffect(() => {
    setPickedDateRange([]);
    setSelectedRange(false);
  }, [selectedName]);

  return (
    <>
      <div className="bg-[#F4F6F9] ">
        <div
          className={`${
            company
              ? " "
              : "w-full pb-10  lg:mt-0  lg:pl-5 lg:mx-auto flex lg:flex-row flex-col gap-5 justify-between"
          } mt-36 lg:mt-0`}
        >
          {loading ? (
            <>
              <div className="container flex items-center mx-auto justify-center lg:h-[100vh]">
                <div className="animate-spin mt-[-100px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
              </div>
            </>
          ) : (
            <>
              <div className=" gap-5 w-full">
                {company ? (
                  ""
                ) : (
                  <>
                    <div className="lg:px-[2px] py-5 px-[60px] z-[9] relative ">
                      <Anchor
                        className={`${anchorTop} lg:z-[9] z-[-9999] lg:!mt-0 lg:relative inherit
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
                                Information
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
                                Buyers
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
                                Sellers
                              </span>
                            ),
                          },
                          {
                            key: "dividend-analysis",
                            href: `/breakdownTopFiveSymbol/${"adbl"}`,
                            title: (
                              <span
                                className={({ isActive }) =>
                                  isActive
                                    ? "cursor-pointer bg-secondary rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-bold"
                                    : "cursor-pointer bg-[#d1e8f9] rounded-xl shadow-md gap-1 p-3 flex flex-col items-center justify-center font-normal"
                                }
                              >
                                <span className="border-b-4  border-black px-[2px] text-blue-600">
                                  {" "}
                                  Symbol
                                </span>
                              </span>
                            ),
                          },
                        ]}
                      ></Anchor>
                    </div>
                    {/* <div className="flex flex-col gap-5">
                            <div>
                              <NavLink
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
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
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
                                <span className="font-[500] text-xs">
                                  Buyers
                                </span>
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
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
                              </NavLink>
                            </div>
                            <div>
                              <NavLink
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
                              </NavLink>
                            </div>
                          </div> */}
                  </>
                )}
                <div className={`${company ? "w-full sm:w-[100%]" : ""} `}>
                  <div className="flex justify-end">
                    <h2 className="text-sm text-gray-800 py-2 font-[500]">
                      <Tag color="cyan">As of {fromDate?.today}</Tag>
                    </h2>
                    <div
                      className={`${company ? "flex justify-end" : "hidden "}`}
                    >
                      <Dropdown
                        overlay={
                          <Menu onClick={handleMenuClick}>
                            {names.map((item) => (
                              <Menu.Item key={item}>
                                <span> {item} </span>
                              </Menu.Item>
                            ))}
                          </Menu>
                        }
                        className="border-2 border-balck-500 py-1 px-2 rounded-md "
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            {names.length > 0
                              ? selectedName
                                ? selectedName
                                : names[0]
                              : ""}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>

                  <div
                    className={`${
                      company ? "lg:flex-row flex-col" : ""
                    } flex flex-col lg:flex-row justify-between gap-5 `}
                  >
                    <div
                      className={`${
                        company ? "" : "sm:w-full lg:flex-row flex-col"
                      } flex flex-row gap-5 lg:min-h-[300px] order-2 lg:order-none`}
                    >
                      <div
                        className={`${
                          company
                            ? "sm:w-[50%] lg:w-[350px] xl:w-[450px] 2xl:w-[600px]"
                            : "lg:w-[250px] xl:w-[300px]  2xl:w-[430px]"
                        }  shadow-lg rounded-xl bg-secondary`}
                      >
                        <h1 className="font-semibold px-3 py-2 text-lg">
                          Top 5 Buyers
                        </h1>
                        <BarChartCompanyWise
                          type={"buyer"}
                          topData={
                            brokerBreakDownTopFiveSymbol != null
                              ? brokerBreakDownTopFiveSymbol?.data?.topBuyer
                              : []
                          }
                        />
                      </div>
                      <div
                        className={`${
                          company
                            ? "sm:w-[50%] lg:w-[350px] xl:w-[450px] 2xl:w-[530px]"
                            : "lg:w-[250px] xl:w-[300px]  2xl:w-[430px]"
                        }  shadow-lg rounded-xl bg-secondary`}
                      >
                        <h1 className="font-semibold px-3 py-2 text-lg">
                          Top 5 Sellers
                        </h1>
                        <BarChartCompanyWise
                          topData={
                            brokerBreakDownTopFiveSymbol != null
                              ? brokerBreakDownTopFiveSymbol?.data?.topseller
                              : []
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${
                          company ? "justify-end" : ""
                        } flex items-center gap-3 mt-0 lg:mt-[4px] order-1 lg:order-none`}
                      >
                        <div className={`${company ? "hidden" : "block"}`}>
                          {company ? (
                            ""
                          ) : (
                            <div className=" flex items-center lg:flex-wrap xl:flex-nowrap ">
                              <div className="company-search ">
                                <Select
                                  name="chooseCompany"
                                  mode="single"
                                  showSearch={true}
                                  placeholder="Choose the Company"
                                  value={selectedItems}
                                  onChange={HandleSelectChange}
                                  options={filteredOptions?.map((item) => ({
                                    value: item.symbol + " /" + item.name,
                                    label: `${item.name} ( ${item.symbol} )`,
                                  }))}
                                  className="w-[340px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={`${company ? "hidden" : "block"}`}>
                          <Dropdown
                            overlay={
                              <Menu onClick={handleMenuClick}>
                                {names.map((item) => (
                                  <Menu.Item key={item}>
                                    <span> {item} </span>
                                  </Menu.Item>
                                ))}
                              </Menu>
                            }
                            className="border-2 border-balck-500 py-1 px-2 rounded-md "
                          >
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                {names.length > 0
                                  ? selectedName
                                    ? selectedName
                                    : names[0]
                                  : ""}
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                        </div>
                      </div>

                      {brokerBreakDownTopFiveSymbol?.data?.topBuyer?.length >
                        0 && (
                        <div className="flex py-4  flex-col gap-1 justify-between">
                          <div className="financial-info bg-success-4 p-3 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] bg-secondary   text-primary  px-[8px] py-[8px] rounded-2xl">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[16px] text-[17px] text-success font-[500]">
                                Top Buy Broker
                              </p>
                              <p className="lg:text-[12px] text-[20px] text-[#000] font-[400]">
                                {
                                  brokerBreakDownTopFiveSymbol?.data
                                    ?.topBuyer?.[0]?.buyerBrokerName
                                }
                              </p>
                            </div>
                          </div>
                          <div className="financial-info bg-success-4   p-3 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] bg-secondary   text-primary  px-[8px] py-[8px] rounded-2xl">
                              <GrCart size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[12px] text-[17px] text-success font-[500]">
                                Total Buy Amount
                              </p>
                              <p className="lg:text-[16px] text-[20px] text-[#000] font-[500]">
                                {formatMoney(
                                  brokerBreakDownTopFiveSymbol?.data
                                    ?.topBuyer?.[0]?.totalAmount
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="financial-info bg-danger-4    p-3 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] bg-secondary   text-primary  px-[8px] py-[8px] rounded-2xl">
                              <GoTag size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[12px] py-1 text-[17px] text-danger font-[500]">
                                Top Sell Broker
                              </p>
                              <p className="lg:text-[12px] text-[20px] text-[#000] font-[400]">
                                {
                                  brokerBreakDownTopFiveSymbol?.data
                                    ?.topseller?.[0]?.sellerBrokerName
                                }
                              </p>
                            </div>
                          </div>
                          <div className="financial-info bg-danger-4    p-3 rounded-xl shadow-md flex ">
                            <div className="mr-[20px] bg-secondary   Primary text-black  px-[8px] py-[8px] rounded-2xl">
                              <GoTag size={24} />
                            </div>
                            <div>
                              <p className="lg:text-[12px] py-1 text-[17px] text-danger font-[500]">
                                Total Sell Amount
                              </p>
                              <p className="lg:text-[16px] text-[20px] text-[#000] font-[500]">
                                {formatMoney(
                                  brokerBreakDownTopFiveSymbol?.data
                                    ?.topseller?.[0]?.totalAmount
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  company ? "" : "flex px-5 lg:flex-row flex-col  gap-5"
                }`}
              >
                <div
                  className={`${company ? " w-full py-5" : "lg:w-[70%]  py-5"}`}
                ></div>
              </div>
            </>
          )}
        </div>

        <div className=" p-0 lg:pt-10 lg:container lg:mx-auto lg:px-10 flex justify-end">
          {
            <>
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
                onClick={() => {
                  handleRangeBrokerData();
                  if (selectedName === "Hold" || selectedName === "Matching") {
                    setButtonClicked(true);
                  }
                }}
              >
                <SearchOutlined className="relative -top-[4px]" />
              </button>
            </>
          }
        </div>

        {selectedName !== "Hold" && selectedName !== "Matching" && (
          <div
            className={`${company ? "" : " lg:container lg:mx-auto lg:px-10"}`}
          >
            {selectedData?.length > 0 ? (
              // <BrokerSellersTable sellData={selectedSellData} loading={loading} />
              <BreakDownSymbolDashboardTable
                handleMenuClick={handleMenuClick}
                data={selectedData}
                loading={loading}
                title="brokersymbol"
                brokerInvestmentStatus={selectedName}
              />
            ) : (
              <BreakDownSymbolDashboardTable
                handleMenuClick={handleMenuClick}
                data={data}
                title="brokersymbol"
                loading={loading}
                brokerInvestmentStatus={selectedName}
              />
            )}
          </div>
        )}

        {selectedName === "Hold" && (
          <>
            {pickedDateRange && selectedRange && buttonClicked ? (
              <div>
                <Holdtables
                  symbol={activeSymbol}
                  fromDate={pickedDateRange[0] || null}
                  toDate={pickedDateRange[1] || null}
                />
              </div>
            ) : (
              <Holdtables symbol={activeSymbol} />
            )}
          </>
        )}
        {selectedName === "Matching" && (
          <>
            {pickedDateRange && selectedRange && buttonClicked ? (
              <div>
                <Matchingtable
                  symbol={activeSymbol}
                  fromDate={pickedDateRange[0] || null}
                  toDate={pickedDateRange[1] || null}
                />
              </div>
            ) : (
              <Matchingtable symbol={activeSymbol} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BreakdownBySymbol;
