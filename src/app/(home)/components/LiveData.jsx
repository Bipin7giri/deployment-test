"use client";
import MarketTable from "@/app/(market)/_component/MarketTabel";
import { Input, Pagination, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import Link from "next/link";
import debounce from "lodash.debounce";
import api from "@/api/axios";

const { Search } = Input;

const LiveData = () => {
  const dispatch = useDispatch();
  const {
    limitedLiveData,
    count,
    loading,
    limitedLiveDataBySector,
    searchedLiveData,
  } = useSelector((state) => state.home);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [sectorList, setSectorList] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);

  const fetchSectors = async () => {
    try {
      const { data: sectors } = await api.post(`/report/getAllSectors`);
      setSectorList(sectors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      dispatch(actions.getSearchedLiveData({ searchedText: searchText }));
    }, 1000);

    if (!searchText.length) {
      if (!selectedSector?.length > 0) {
        dispatch(actions.getLimitedLiveData({ page, sortOrder }));
      } else {
        dispatch(
          actions.getLimitedLiveDataBySector({
            page,
            sortOrder,
            sectors: selectedSector,
          })
        );
      }
    } else {
      debouncedSearch();
    }

    // Cleanup the debounce function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, page, sortOrder, selectedSector]);

  const formatData = (data) => {
    return {
      symbol: data.symbol,
      ltp: `${data.lastTradedPrice}`,
      schange: data?.priceChange,
      pChange: data?.percentageChange * 100,
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
    if (!searchText.length) {
      if (!selectedSector?.length > 0) {
        setFilteredData(
          limitedLiveData
            ?.filter((item) => item.lastTradedPrice !== null)
            ?.map(formatData)
        );
      } else {
        setFilteredData(
          limitedLiveDataBySector
            ?.filter((item) => item.lastTradedPrice !== null)
            ?.map(formatData)
        );
      }
    } else {
      setFilteredData(
        searchedLiveData
          ?.filter((item) => item.lastTradedPrice !== null)
          ?.map(formatData)
      );
    }
  }, [
    limitedLiveData,
    searchedLiveData,
    searchText,
    limitedLiveDataBySector,
    selectedSector,
  ]);

  const options = sectorList?.map((item) => ({
    value: item?.sector_name,
    label: item?.sector_name,
  }));

  return (
    <div className="lg:container lg:px-8 lg:mx-auto my-14 px-4">
      <div className="bg-white px-4 py-6 w-full rounded-2xl">
        <div className="mb-6 flex lg:flex-row flex-col lg:items-center items-start justify-between lg:gap-6 gap-4 w-full">
          <h2 className="lg:text-xl text-[32px] font-semibold">
            Today&apos;s Price
          </h2>
          <div className="flex items-center gap-4">
            <Select
              mode="tags"
              placeholder="Please select"
              onChange={(value) => setSelectedSector(value)}
              value={selectedSector}
              className="w-[300px]"
              options={options}
            />
            <Search
              placeholder="Search Your Stock"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
              // classNames=""
            />
          </div>
        </div>
        <MarketTable
          data={filteredData}
          isHomePage={true}
          setSortOrder={setSortOrder}
        />
        <div className="flex items-center justify-between mt-2">
          <Pagination
            onChange={(page) => setPage(page)}
            pageSize={10}
            defaultCurrent={1}
            total={count}
          />
          <Link
            href="/live-data"
            className="bg-black text-white py-1 px-2 font-medium rounded-2xl"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveData;
