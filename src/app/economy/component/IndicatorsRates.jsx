"use client";
import api from "@/api/axios";
import { formatMoney } from "@/utils/formatMoney";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";

const IndicatorsRates = () => {
  const [nrbData, setNrbData] = useState({});
  const fetchNrbData = async () => {
    const res = await api.get("economy/getNrbForex/today");
    if (res) {
      const data = res.data.data;
      setNrbData(data);
    }
  };

  useEffect(() => {
    fetchNrbData();
  }, []);

  const separatedData = {};
  let dates;
  let keys;
  if (nrbData?.nrbObj !== undefined) {
    Object?.entries(nrbData?.nrbObj)?.forEach(([date, items]) => {
      items?.forEach((item) => {
        const { key, value } = item;
        if (!separatedData[key]) {
          separatedData[key] = {};
        }
        if (!separatedData[key][date]) {
          separatedData[key][date] = [];
        }
        separatedData[key][date]?.push(value);
      });
    });
    dates = Object.keys(separatedData["Total Deposits"]);
    keys = Object.keys(separatedData);
  }
  return (
    <>
      <div className="py-4 lg:px-3 px-10 rounded-[20px] mb-5 lg:shadow-md shadow-xl bg-secondary">
        <div className="flex items-center gap-3">
          <div>
            <BiTrendingUp className="text-success lg:text-xl text-4xl font-[500]" />
          </div>
          <div>
            <h4 className="font-[500] text-3xl lg:text-[18px]">
              NRB Indicators
            </h4>
          </div>
        </div>
        <div>
          <table className="lg:mt-4 mt-6">
            <thead>
              <tr className="lg:text-xs text-3xl  font-medium text-gray-800  lg:text-gray-500 ">
                <th className=" pr-16">Latest Updated</th>
                {dates?.map((date) => (
                  <th key={date} className="lg:px-3 px-16">
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys?.map((key, index) => (
                <tr key={key}>
                  <td className="px-4">
                    <p className="lg:text-xs text-left text-2xl pt-5 lg:pt-3 font-medium text-blue-600">
                      {key}
                    </p>
                    <p className="lg:text-[10px] lg:leading-[2px] text-left text-2xl pt-2 font-regular text-gray-500">
                      {index < 6 ? "( in NPR Billion )" : "( in % )"}
                    </p>
                  </td>
                  {dates?.map((date) => (
                    <td
                      key={date}
                      className="lg:text-xs px-10 text-2xl text-right font-medium text-primary  "
                    >
                      {separatedData[key][date] &&
                        formatMoney(separatedData[key][date][0])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:mt-0 mt-10 py-4  px-5 lg:px-5 rounded-[20px] mb-5 lg:shadow-md shadow-xl bg-secondary">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div>
                <BiTrendingUp className="text-success lg:text-[18px] text-[40px] font-[500]" />
              </div>
              <div>
                <h4 className="font-[500] text-3xl px-3 lg:text-[18px]">
                  Foreign Rates
                </h4>
              </div>
            </div>
            <p className="lg:text-xs text-left text-2xl pt-2 lg:pt-0 font-regular text-gray-500">
              Last Updated on :{" "}
              {nrbData
                ? nrbData.forexList
                  ? nrbData.forexList[0].date
                  : "-"
                : "-"}
              {/* {moment(forexData ? forexData[0].date : moment()).format(
                      "MMMM DD, YYYY"
                    )} */}
            </p>
          </div>
        </div>
        <div className="lg:mt-0 mt-5 px-[60px] lg:px-[5px]">
          <table className="w-full lg:mt-0 mt-6">
            <thead>
              <tr className="lg:text-[14px] text-left text-[32px] lg:text-gray-800 text-gray-500">
                <th className=" py-2 ">Symbol</th>
                <th className=" py-2 ">Buy</th>
                <th className=" py-2">Sell</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {nrbData?.forexList?.slice(0, 8)?.map((item, id) => (
                <tr key={id} className="text-left">
                  <td className="px-5">
                    <p className="lg:text-[14px] text-[32px]  cursor-pointer pt-2 font-medium text-info">
                      <Popover content={item?.name}>{item?.symbol}</Popover>
                    </p>
                  </td>
                  <td className="lg:text-[14px] text-[32px]  font-semibold text-primary  ">
                    {item?.buy}
                  </td>
                  <td className="lg:text-[14px] text-[32px]  font-semibold text-primary  ">
                    {item?.sell}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default IndicatorsRates;
