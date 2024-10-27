"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MarketTabel from "../_component/MarketTabel";
import { AudioOutlined, CloseCircleFilled } from "@ant-design/icons";
import actions from "../_redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Skeleton,
  InputNumber,
  Slider,
  Input,
  Popover,
  Drawer,
  Button,
  Checkbox,
  Radio,
  Tag,
} from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import api from "@/api/axios";
import Link from "next/link";
import { formatMoney } from "@/utils/formatMoney";

const antIcon = <LoadingOutlined spin />;
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const Market = () => {
  const { liveMarketData, loading, filterMarketLiveData, capitalizationLogic } =
    useSelector((state) => state.market);

  const marketCaps = liveMarketData?.map((item) => item.marketCapitalization);
  const lastTradedPrices = liveMarketData?.map((item) => item.lastTradedPrice);

  const [highMC, setHighMC] = useState();
  const [highLTP, setHighLTP] = useState(0);
  const dispatch = useDispatch();
  const [data, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState([0, highLTP]);
  const [postpriceRange, setpostPriceRange] = useState([0, 27000]);
  const [marketCapRange, setMarketCapRange] = useState([null, null]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [marketCheckedValues, setMarketCheckedValues] = useState([]);
  const [setcorList, setSectorList] = useState([]);
  const [marketCapList, setMarketCapList] = useState([
    { id: 5, name: "Penny Stock" },
    { id: 4, name: "Small Cap" },
    { id: 3, name: "Mid Cap" },
    { id: 2, name: "High Cap" },
    { id: 1, name: "Mega Cap" },
  ]);

  useEffect(() => {
    setPriceRange([0, highLTP]);
  }, [highLTP + 10]);

  const [isStockBelow, setIsStockBelow] = useState(false);
  const [isStockNear, setIsStockNear] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleClearAll = (e) => {
    setPriceRange([0, highLTP]);
    setMarketCapRange([0, setHighMC]);
    setCheckedValues([]);
    setMarketCheckedValues([]);
  };

  const formatLiveData = (data) => {
    return {
      symbol: data.symbol,
      name: data?.companyName,
      ltp: `${data.lastTradedPrice}`,
      schange: data?.schange,
      pChange: data?.perChange,
      previousPrice: data.previousClose,
      weekhigh: data.fiftyTwoWeekHigh,
      weeklow: data.fiftyTwoWeekLow,
      high: data.highPrice,
      low: data.lowPrice,
      open: data.openPrice,
      volume: data.totalTradeQuantity,
      turnover: data.totalTradeValue,
    };
  };

  useEffect(() => {
    if (filterMarketLiveData?.filterMarketData?.resultList !== undefined) {
      setHighLTP(
        filterMarketLiveData?.filterMarketData?.filterInfo?.maxLTP + 10
      );
      setHighMC(
        filterMarketLiveData?.filterMarketData?.filterInfo?.maxMarketCap
      );
      const tableData = filterMarketLiveData?.filterMarketData?.resultList
        ?.filter((data) => {
          const symbolMatches = data["symbol"]
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase());
          return symbolMatches;
        })
        ?.map(formatLiveData);
      setTableData(tableData);
    }
  }, [
    filterMarketLiveData,
    searchText,
    priceRange,
    isStockBelow,
    isStockNear,
    checkedValues,
    marketCapRange,
    marketCheckedValues,
  ]);

  useEffect(() => {
    dispatch({ type: actions.GET_LIVE_MARKET_DATA });
    dispatch({ type: actions.GET_CAPITALIZATION_LOGIC });
  }, []);

  //antd range picker
  const handlePriceChnage = (value) => {
    setPriceRange(value);
  };
  const handlePostPriceChange = (value) => {
    setpostPriceRange(value);
  };

  const handleMarketCapChange = (value) => {
    setMarketCapRange(value);
  };

  const handlePriceInputNumberChange = (value, index) => {
    const newRange = [...priceRange];
    newRange[index] = value;
    setpostPriceRange(newRange);
    setPriceRange(newRange);
  };

  const handleMarketCapInputNumberChange = (value, index) => {
    const newRange = [...marketCapRange];
    newRange[index] = value;
    setMarketCapRange(newRange);
  };

  //antd check box
  const onSectorCheckBoxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedValues((prevCheckedValues) => [...prevCheckedValues, value]);
    } else {
      setCheckedValues((prevCheckedValues) =>
        prevCheckedValues.filter((item) => item !== value)
      );
    }
  };
  const onMarketcapCheckBoxChange = (e) => {
    const value = e.target.value;
    setMarketCheckedValues(value);
    let marketCap = capitalizationLogic.data.filter((ele) => ele.id == value);
    setMarketCapRange([
      marketCap[0].firstt_value / 1000000,
      marketCap[0].last_value / 1000000,
    ]);
  };

  useEffect(() => {
    let values = {};
    values.ltpMin = priceRange[0];
    values.ltpMax = priceRange[1];
    values.marketCapMin = marketCapRange[0];
    values.marketCapMax = marketCapRange[1];
    values.sectors = checkedValues;
    values.fiftyTwoWeekLow = isStockBelow === false ? null : isStockBelow;
    values.fiftyTwoWeekHigh = isStockNear === false ? null : isStockNear;
    dispatch(actions.getFilterMarketLiveData(values));
  }, [
    searchText,
    postpriceRange,
    marketCapRange,
    isStockBelow,
    isStockNear,
    checkedValues,
  ]);

  const onStockBelowCheckBoxChange = (e) => {
    setIsStockBelow(e.target.checked);
  };

  const onStockNearCheckBoxChange = (e) => {
    setIsStockNear(e.target.checked);
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

  // for filter
  useEffect(() => {
    let values = {};
    values.ltpMin = null;
    values.ltpMax = null;
    values.marketCapMin = null;
    values.marketCapMax = null;
    values.sectors = [];
    values.fiftyTwoWeekLow = isStockBelow === false ? null : isStockBelow;
    values.fiftyTwoWeekHigh = isStockNear === false ? null : isStockNear;

    dispatch(actions.getFilterMarketLiveData(values));
  }, []);

  const fetchLiveData = () => {
    let values = {};
    setPriceRange([0, 27000]);
    setMarketCapRange([0, 160000]);
    setCheckedValues([]);
    setIsStockBelow(false);
    setIsStockNear(false);
    dispatch(actions.getFilterMarketLiveData(values));
  };
  const reset = () => {
    fetchLiveData();
  };

  // Drawar
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  const smallScreenDrawer = (
    <div className="lg:hidden ">
      <AiOutlineMenu
        type="primary"
        onClick={showDrawer}
        className="cursor-pointer"
        size={36}
      >
        Open
      </AiOutlineMenu>
      <Drawer
        title="Filter the Live Market"
        placement="left"
        onClose={onClose}
        open={open}
        className="w-90vh"
        style={{ width: "90vw" }}
        closeIcon={<CloseCircleFilled style={{ fontSize: "3rem" }} />}
      >
        <Button
          type="text"
          onClick={handleClearAll}
          className="text-[22px] text-red-500 font-bold "
          style={{ float: "right" }}
          //  style={{ fontSize: '1.2rem', padding: '0.8rem 1.6rem', color: red}}
        >
          Clear All
        </Button>
        <br></br>
        <br></br>
        <div className="flex justify-between">
          <p className="font-semibold text-[2.2rem]">Price</p>
        </div>
        <div className="mt-[12px]">
          <Slider
            trackStyle={{ height: "8px" }}
            style={{ height: "20px" }}
            range={{
              draggableTrack: true,
            }}
            value={priceRange}
            onChange={handlePriceChnage}
            onAfterChange={handlePostPriceChange}
            min={0}
            max={Math.ceil(highLTP) + 1}
          />
          <InputNumber
            min={0}
            max={Math.ceil(highLTP) + 1}
            style={{
              margin: "0 20px",
              fontSize: "2rem",
              textAlign: "center",
              width: "30vw",
            }}
            value={priceRange[0]}
            onChange={(value) => handlePriceInputNumberChange(value, 0)}
          />
          <InputNumber
            min={0}
            max={Math.ceil(highLTP) + 1}
            style={{
              margin: "0 20px",
              fontSize: "2rem",
              textAlign: "center",
              width: "30vw",
            }}
            value={priceRange[1]}
            className="centered-input-number"
            onChange={(value) => handlePriceInputNumberChange(value, 1)}
          />
        </div>
        <div className="mt-[30px]">
          <p className="font-semibold text-[2.2rem]">Sector</p>
          <div className="live-data-sector">
            {setcorList?.map((item, id) => {
              return (
                <>
                  <div className="mt-[8px] ">
                    <Checkbox
                      className="text-[2rem]"
                      value={item?.sector_name}
                      onChange={onSectorCheckBoxChange}
                      checked={checkedValues.includes(item?.sector_name)}
                    >
                      {item.sector_name}
                    </Checkbox>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="mt-[30px]">
          <p className="font-semibold text-[2.2rem]">Market Cap</p>
          <div>
            <Radio.Group
              onChange={onMarketcapCheckBoxChange}
              value={marketCheckedValues}
            >
              {marketCapList?.map((item, id) => {
                return (
                  <>
                    <div className="mt-[8px]">
                      <div className="mt-[8px]">
                        <Radio value={item.id} className="text-[2rem]">
                          {item.name}
                        </Radio>
                      </div>
                    </div>
                  </>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        <div className="mt-[30px]">
          <div className="stock-above-below">
            <div className="mt-[10px]">
              <Checkbox
                onChange={onStockBelowCheckBoxChange}
                checked={isStockBelow}
                className="text-[2rem]"
              >
                Stock Below 52 Weeks Low
              </Checkbox>
            </div>
            <div className="mt-[10px]">
              <Checkbox
                onChange={onStockNearCheckBoxChange}
                checked={isStockNear}
                className="text-[2rem]"
              >
                Stock Near 52 Weeks Low
              </Checkbox>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );

  const handleFilterData = (type) => {
    if (type === "advance") {
      setTableData(
        filterMarketLiveData?.filterMarketData?.resultList
          ?.filter((item) => item.perChange > 0)
          .map(formatLiveData)
      );
    } else if (type === "decline") {
      setTableData(
        filterMarketLiveData?.filterMarketData?.resultList
          ?.filter((item) => item.perChange < 0)
          .map(formatLiveData)
      );
    } else {
      setTableData(
        filterMarketLiveData?.filterMarketData?.resultList
          ?.filter((item) => item.perChange === 0)
          .map(formatLiveData)
      );
    }
  };

  return (
    <div>
      <div className="flex px-5 gap:0 lg:gap-6 lg:mx-auto bg-[#F4F6F9] pt-[50px] lg:pt-0 lg:pb-[0px] pb-[40px]">
        <div className="lg:w-[25%] w-0 mt-[30px] pb-4">
          <div className="hidden lg:block sticky top-[106px]">
            <div className="flex justify-between">
              <p className="font-semibold">Price</p>
              <Button
                type="text"
                onClick={handleClearAll}
                className="bg-red-500 hover:bg-red-500 text-secondary  rounded-md"
              >
                Clear All
              </Button>
            </div>
            <div className="mt-[12px]">
              <Slider
                range={{
                  draggableTrack: true,
                }}
                value={priceRange}
                onChange={handlePriceChnage}
                onAfterChange={handlePostPriceChange}
                min={0}
                max={Math.ceil(highLTP) + 1}
              />
              <InputNumber
                min={0}
                max={Math.ceil(highLTP) + 5000}
                style={{ margin: "0 16px" }}
                value={priceRange[0]}
                onChange={(value) => handlePriceInputNumberChange(value, 0)}
              />
              <InputNumber
                min={0}
                max={Math.ceil(highLTP) + 5000}
                style={{ margin: "0 16px" }}
                value={priceRange[1]}
                onChange={(value) => handlePriceInputNumberChange(value, 1)}
              />
            </div>
            <div className="mt-[20px]">
              <p className="font-semibold">Sector</p>
              <div>
                {setcorList?.map((item, id) => {
                  return (
                    <>
                      <div
                        className={`${
                          item.sector_name === "Mutual Fund" ? "hidden" : ""
                        } mt-[7px]`}
                      >
                        <Checkbox
                          value={item?.sector_name}
                          onChange={onSectorCheckBoxChange}
                          checked={checkedValues.includes(item?.sector_name)}
                        >
                          {item.sector_name}
                        </Checkbox>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* <div className="mt-[20px]">
              <p className="font-semibold">Market Cap</p>
              <div>
                <Radio.Group
                  onChange={onMarketcapCheckBoxChange}
                  value={marketCheckedValues}
                >
                  {marketCapList?.map((item, id) => {
                    return (
                      <>
                        <div className="mt-[7px]">
                          <div className="mt-[8px]">
                            <Radio value={item.id}>{item.name}</Radio>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
            <div className="mt-[20px] mb-[30px]">
              <div>
                <div className="mt-[10px]">
                  <Checkbox
                    onChange={onStockBelowCheckBoxChange}
                    checked={isStockBelow}
                  >
                    Stock Below 52 Weeks Low
                  </Checkbox>
                </div>
                <div className="mt-[10px]">
                  <Checkbox
                    onChange={onStockNearCheckBoxChange}
                    checked={isStockNear}
                  >
                    Stock Near 52 Weeks Low
                  </Checkbox>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="bg-[#F4F6F9] lg:min-h-[100vh] min-h-[50vh] lg:w-[75%] w-[100%] mt-[20Px] lg:mt-[0px]">
          <div className="lg:container  w-full mt-40 lg:mt-0 gap-10 px-0 lg:px-4 mx-auto">
            <div className="my-5">
              <div className="flex">
                <div className="flex-1">{smallScreenDrawer}</div>
                <div className="flex-1 text-right">
                  <Search
                    placeholder="Search Your Stock"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    style={{
                      // height: '60px',
                      width: "400px",
                      // fontWeight: 'bold',
                      // fontSize: '1.6rem',
                      "@media (min-width: 768px)": {
                        height: "20px",
                        width: "300px",
                      },
                      "@media (min-width: 1024px)": {
                        height: "24px",
                        width: "400px",
                      },
                    }}
                    className="custom-search sm:custom-search-marketLive lg:custom-search"
                  />
                </div>
              </div>
            </div>
            {filterMarketLiveData?.filterMarketData?.resultList === undefined &&
            !filterMarketLiveData?.filterMarketData?.resultList?.length > 0 ? (
              <div className=" pb-10 w-full sm:mx-28 px-8 lg:px-0 lg:mx-auto flex lg:flex-col flex-col gap-5 py-5 justify-between ">
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
              </div>
            ) : filterMarketLiveData?.filterMarketData?.resultList !==
                undefined &&
              filterMarketLiveData?.filterMarketData?.resultList?.length > 0 ? (
              <>
                <div className="pb-[30px]">
                  <div className="mt-[10px] lg:text-[15px] text-[24px] flex justify-between items-center ml-[20px] mb-[12px] mr-[16px]">
                    <div className="flex gap-4">
                      <div className="rounded-lg py-2 px-8 flex flex-col items-center gap-1 bg-success">
                        <b className="text-semibold text-white">ADVANCED</b>
                        <p className="font-semibold bg-black text-white px-2 py-0.5 rounded">
                          {
                            filterMarketLiveData?.filterMarketData?.resultList?.filter(
                              (item) => item.perChange > 0
                            ).length
                          }
                        </p>
                        <button
                          onClick={() => handleFilterData("advance")}
                          className="bg-white text-xs font-medium rounded py-1 px-3"
                        >
                          View Stocks
                        </button>
                      </div>
                      <div className="rounded-lg py-2 px-8 flex flex-col items-center gap-1 bg-danger">
                        <b className="text-semibold text-white">DECLINED</b>
                        <p className="font-semibold bg-black text-white px-2 py-0.5 rounded">
                          {
                            filterMarketLiveData?.filterMarketData?.resultList?.filter(
                              (item) => item.perChange < 0
                            ).length
                          }
                        </p>
                        <button
                          onClick={() => handleFilterData("decline")}
                          className="bg-white text-xs font-medium rounded-lg py-1 px-3"
                        >
                          View Stocks
                        </button>
                      </div>
                      <div className="rounded-lg py-2 px-8 flex flex-col items-center gap-1 bg-info">
                        <b className="text-semibold text-white">UNCHANGED</b>
                        <p className="font-semibold bg-black text-white px-2 py-0.5 rounded">
                          {
                            filterMarketLiveData?.filterMarketData?.resultList?.filter(
                              (item) => item.perChange === 0
                            ).length
                          }
                        </p>
                        <button
                          onClick={() => handleFilterData("unchange")}
                          className="bg-white text-xs font-medium rounded-lg py-1 px-3"
                        >
                          View Stocks
                        </button>
                      </div>
                    </div>
                    <Tag color="cyan">
                      <span className="text-primary   font-semibold">
                        {" "}
                        As of : &nbsp;{" "}
                      </span>
                      <span className="text-success">
                        {" "}
                        {
                          filterMarketLiveData?.filterMarketData
                            ?.resultList?.[0]?.lastUpdatedDate
                        }
                      </span>{" "}
                      &nbsp;
                      <span className="text-success">
                        {
                          filterMarketLiveData?.filterMarketData?.resultList?.[0]?.lastUpdatedDateTime
                            ?.split("T")[1]
                            ?.split(".")[0]
                        }
                      </span>
                    </Tag>
                  </div>
                  <MarketTabel data={data} />
                </div>
              </>
            ) : (
              <>
                <div className="lg:text-lg text-3xl font-semibold capitalize text-center mt-[40vh]">
                  No stocks found in selected filter.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
