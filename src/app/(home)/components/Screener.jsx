"use client";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import ScreenerTable from "./ScreenerTable";

import TableLoader from "../../../components/TableLoader";
import api from "@/api/axios";

const Screener = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSector, setSelectedSector] = useState("Development Banks");
  const [selectedOrder, setSelectedOdrder] = useState("no_of_transactions");
  const [setcorList, setSectorList] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);
  const [historicalDataLoading, setHistoricalDataLoading] = useState(false);

  const handleChange = (sectorName) => {
    setSelectedSector(sectorName);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date.target.value);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.target.value);
  };

  const handleStoryByChange = (selectedOrder) => {
    setSelectedOdrder(selectedOrder);
  };

  // ? fetch sectors
  const fetchSectors = async () => {
    try {
      SetLoading(true);
      const res = await api.post(`/report/getAllSectors`);
      if (res) {
        setSectorList(res?.data?.data);
        SetLoading(false);
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Month is zero-based
  const day = today.getDate();

  // Calculate the new month and year for one month earlier
  let oneMonthEarlierMonth = month - 1;
  let oneMonthEarlierYear = year;

  if (oneMonthEarlierMonth === 0) {
    // If the current month is January, adjust to December of the previous year
    oneMonthEarlierYear--;
    oneMonthEarlierMonth = 12;
  }

  const formattedToday = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  const formattedOneMonthEarlier = `${oneMonthEarlierYear}-${String(
    oneMonthEarlierMonth
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  useEffect(() => {
    setEndDate(formattedToday);
    setStartDate(formattedOneMonthEarlier);
  }, []);

  const getHistoricalData = async () => {
    try {
      setHistoricalDataLoading(true);
      // const res = await api.get(`/historical_screener/getHistoricalScreener/?toDate='${startDate}'&fromDate='${endDate}'&sectorName='${selectedSector}'&orderByField='${selectedOrder}'`);
      const res = await api.get(
        `/historical_screener/getHistoricalScreener/?toDate='${startDate}'&fromDate='${endDate}'&sectorName='${selectedSector}'&orderByField='${selectedOrder}'`
      );
      if (res) {
        const dataWithSno = res.data.data.map((item, index) => ({
          ...item,
          sno: index + 1,
        }));
        setHistoricalData(dataWithSno);
        setHistoricalDataLoading(false);
      }
    } catch (error) {
      setHistoricalDataLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ((startDate, endDate, selectedSector, selectedOrder)) {
          setHistoricalDataLoading(true);
          const response = await api.get(
            `/historical_screener/getHistoricalScreener/?toDate='${startDate}'&fromDate='${endDate}'&sectorName='${selectedSector}'&orderByField='${selectedOrder}'`
          );

          if (response) {
            const dataWithSno = response.data.data.map((item, index) => ({
              ...item,
              sno: index + 1,
            }));
            setHistoricalData(dataWithSno);
          }
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      } finally {
        setHistoricalDataLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, selectedSector]);

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <>
      <div className="lg:container bg-[#F4F6F9] lg:mx-auto flex lg:flex-col flex-col pt-10 pb-20 lg:mt-0 mt-[160px] gap-10 mx-6">
        <div className="flex py-[2px] px-2 bg-[#212121] text-secondary rounded-md justify-between">
          <div>
            <h2 className="lg:text-[16px] lg:p-0 p-2 text-3xl font-[500]">
              Top Traded Companies Screener
            </h2>
          </div>
          <div>
            {/* <BsInfoCircleFill className='text-secondary  lg:text-lg text-2xl mt-3 lg:mt-2' /> */}
          </div>
        </div>
        <div className="grid text-3xl lg:text-sm px-5 z-10 grid-cols-6 lg:grid-cols-9 gap-5">
          <div className="col-span-2">
            <label className="text-gray-900 font-[500]" htmlFor="start-date">
              Enter From Date:
            </label>
            <input
              type="date"
              value={startDate}
              // selected={startDate}
              onChange={handleStartDateChange}
              // dateFormat="MM/dd/yyyy"
              // id="start-date"
              className="block w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-2">
            <label className="text-gray-900 font-[500]" htmlFor="end-date">
              Enter To Date:
            </label>
            <input
              type="date"
              value={endDate}
              // selected={endDate}
              onChange={handleEndDateChange}
              // dateFormat="MM/dd/yyyy"
              // id="end-date"
              className="block w-full p-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-2">
            <label className="text-gray-900 font-[500]" htmlFor="end-date">
              Sector:
            </label>
            <select
              className="block w-full text-2xl lg:text-sm bg-secondary    p-1 border border-gray-300 rounded-md"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              defaultValue={selectedSector}
            >
              <option value="" disabled hidden>
                Select a company
              </option>

              {setcorList?.length > 0 &&
                setcorList?.map((sectorName) => {
                  if (sectorName.sector_name !== "Mutual Fund") {
                    return (
                      <option
                        style={{ textAlign: "left" }}
                        key={sectorName.sector_name}
                        value={sectorName.sector_name}
                        className="!text-16 text-center 2xl:text-18"
                      >
                        {sectorName?.sector_name}
                      </option>
                    );
                  }
                  return null;
                })}
            </select>
          </div>
          {/* <div className='col-span-2'>
                        <label className="text-gray-900 font-[500]" htmlFor="end-date">
                            Store by:
                        </label>
                        <select
                            className="block w-full text-2xl lg:text-sm bg-secondary p-1 border border-gray-300 rounded-md"
                            onChange={(e) => {
                                handleStoryByChange(e.target.value);
                            }}
                            defaultValue={"no_of_transactions"}
                            value={selectedOrder}
                        >
                            <option value="no_of_transactions">No of Transactions</option>
                            <option value="turnover">
                                Turnover
                            </option>
                            <option value="volume">
                                Volume
                            </option>
                        </select>
                    </div> */}
          {/* <div className='cursor-pointer'>
                        <div onClick={getHistoricalData} className="bg-success-2 rounded-md my-9 w-12 h-12 lg:my-5 lg:w-8 lg:h-8 hover:bg-green-600 hover:transition-colors duration-300 flex items-center justify-center">
                            <FaSearch className="text-secondary  text-3xl lg:text-sm" />
                        </div>
                    </div> */}
        </div>
        {historicalDataLoading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            <ScreenerTable historicalData={historicalData} />
          </>
        )}
      </div>
    </>
  );
};

export default Screener;
