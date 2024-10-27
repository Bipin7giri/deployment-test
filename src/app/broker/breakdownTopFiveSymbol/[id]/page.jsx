/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import BarChartCompanyWise from "../../[id]/_component/BarChartCompanyWIse";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../[id]/_redux/action";
import { formatMoney } from "../../../../utils/formatMoney";
import BreakDownSymbolDashboardTable from "../../[id]/_component/BreakDownSymbolDashboardTable";
import marketActions from "../../../(market)/_redux/actions";
import { Anchor, Dropdown, Menu, Select, Space, Tag } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { GrCart } from "react-icons/gr";
import { GoTag } from "react-icons/go";
import api from "@/api/axios";
import { DatePicker } from "antd";
import moment from "moment";
import {
  setBrokerHystoricBuyBySym,
  setBrokerHystoricSellBySym,
} from "../../[id]/_redux/brokerSlice";
import Holdtables from "../../[id]/_component/Hold.tables";
import Matchingtable from "../../[id]/_component/MatchTable";
import { useParams } from "next/navigation";

const { RangePicker } = DatePicker;

const BreakdownBySymbol = ({ symbol, company }) => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedName, setSelectedName] = useState("Buy");
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
  console.log({ stockBuyingBrokerBySymbol, stockSellingBrokerBySymbol });
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
  const handleMenuClick = (item) => {
    setBrokerDateRange(null);
    setSelectedName(item);
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
  //     setpickedDateRange(pickedDateRange);
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
      <div className="bg-[#F4F6F9] px-10 ">
        <div
          className={`${
            company
              ? " "
              : "w-full pb-10  lg:mt-0  lg:pl-5 lg:mx-auto flex lg:flex-row flex-col gap-5 justify-between"
          }  `}
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
                    <div className="lg:px-[2px]  py-5 px-[60px] z-[9] relative ">
                      <Anchor
                        className={`${anchorTop} lg:z-[9] z-[-9999]   inherit
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
                  </>
                )}

                <div className="flex justify-between items-center mb-10">
                  <div
                    className={`${
                      company ? "justify-end" : ""
                    } flex items-center gap-3 mt-0 lg:mt-[4px] order-1 lg:order-none`}
                  >
                    <div className={`${company ? "hidden" : "block"}`}>
                      {company ? (
                        ""
                      ) : (
                        <div className=" flex items-center gap-5 lg:flex-wrap xl:flex-nowrap ">
                          <div className="flex w-full">
                            {names.map((item, index) => (
                              <div
                                key={item}
                                onClick={() => handleMenuClick(item)}
                                className={`flex-1 w-[160px] py-2 px-6 cursor-pointer text-center transition duration-200 ${
                                  selectedName === item
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-gray-100"
                                } ${
                                  index === 0
                                    ? "rounded-l-full"
                                    : index === names.length - 1
                                    ? "rounded-r-full"
                                    : ""
                                } border border-gray-300 -ml-px`}
                              >
                                {item}
                              </div>
                            ))}
                          </div>

                          <div className="company-search">
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
                              className="custom-select w-[340px]"
                              dropdownClassName="custom-dropdown"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${company ? "flex justify-end" : "hidden"}`}>
                    <div className="flex space-x-4 bg-black rounded-md shadow-md p-2 border border-gray-300">
                      {names?.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleTabClick(item)}
                          className={`py-2 px-4 rounded-md transition duration-150 
                              "bg-blue-500 text-white"
                          `}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-green-500 text-white px-4  py-2 rounded-lg text-sm">
                    As of {fromDate?.today}
                  </div>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between  gap-32 ${
                    company ? "lg:flex-row" : ""
                  }`}
                >
                  <div
                    className={`flex flex-col lg:flex-row gap-5 ${
                      company ? "" : "sm:w-full lg:flex-row flex-col"
                    }`}
                  >
                    <div className={`flex-1 shadow-lg rounded-xl bg-secondary`}>
                      <h1 className="font-semibold px-3 py-2 text-lg">
                        Top 5 Buyers
                      </h1>
                      <BarChartCompanyWise
                        type={"buyer"}
                        topData={
                          brokerBreakDownTopFiveSymbol?.data?.topBuyer || []
                        }
                      />
                    </div>
                    <div className={`flex-1 shadow-lg rounded-xl bg-secondary`}>
                      <h1 className="font-semibold px-3 py-2 text-lg">
                        Top 5 Sellers
                      </h1>
                      <BarChartCompanyWise
                        topData={
                          brokerBreakDownTopFiveSymbol?.data?.topseller || []
                        }
                      />
                    </div>
                  </div>
                  <div>
                    {brokerBreakDownTopFiveSymbol?.data?.topBuyer?.length >
                      0 && (
                      <div className="flex flex-col gap-4 py-4">
                        <div className="financial-info bg-success-4 p-3 rounded-xl shadow-md flex items-center">
                          <div className="mr-4 bg-secondary text-primary p-2 rounded-full">
                            <GrCart size={24} />
                          </div>
                          <div>
                            <p className="text-success font-semibold text-lg">
                              Top Buy Broker
                            </p>
                            <p className="text-black font-normal text-sm">
                              {
                                brokerBreakDownTopFiveSymbol?.data?.topBuyer[0]
                                  ?.buyerBrokerName
                              }
                            </p>
                          </div>
                        </div>
                        <div className="financial-info bg-success-4 p-3 rounded-xl shadow-md flex items-center">
                          <div className="mr-4 bg-secondary text-primary p-2 rounded-full">
                            <GrCart size={24} />
                          </div>
                          <div>
                            <p className="text-success font-semibold">
                              Total Buy Amount
                            </p>
                            <p className="text-black font-semibold text-sm">
                              {formatMoney(
                                brokerBreakDownTopFiveSymbol?.data?.topBuyer[0]
                                  ?.totalAmount
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="financial-info bg-danger-4 p-3 rounded-xl shadow-md flex items-center">
                          <div className="mr-4 bg-secondary text-primary p-2 rounded-full">
                            <GoTag size={24} />
                          </div>
                          <div>
                            <p className="text-danger font-semibold">
                              Top Sell Broker
                            </p>
                            <p className="text-black font-normal text-sm">
                              {
                                brokerBreakDownTopFiveSymbol?.data?.topseller[0]
                                  ?.sellerBrokerName
                              }
                            </p>
                          </div>
                        </div>
                        <div className="financial-info bg-danger-4 p-3 rounded-xl shadow-md flex items-center">
                          <div className="mr-4 bg-secondary text-primary p-2 rounded-full">
                            <GoTag size={24} />
                          </div>
                          <div>
                            <p className="text-danger font-semibold">
                              Total Sell Amount
                            </p>
                            <p className="text-black font-semibold text-sm">
                              {formatMoney(
                                brokerBreakDownTopFiveSymbol?.data?.topseller[0]
                                  ?.totalAmount
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className=" p-0 lg:pt-10 lg:container lg:mx-auto  flex justify-end">
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
                onClick={(e) => {
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
          <div className={`${company ? "" : " "}`}>
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
