"use client";
import { formatMoney } from "@/utils/formatMoney";
import { Skeleton, Tooltip } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GainerTable = ({
  toggle,
  setToggle,
  currentPage,
  pageSize,
  currentData,
  setCurrentPage,
  loading,
}) => {
  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const titles = [
    { label: "Gainers", value: "gainer" },
    { label: "Losers", value: "loser" },
    // { label: "Unchanged", value: "unchanged" },
    { label: "Volume", value: "volume" },
    { label: "Transaction", value: "transaction" },
    { label: "Turnover", value: "turnover" },
  ];

  return (
    <>
      <div
        className="px-5 w-full overflow-x-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex gap-6 mt-3">
          {titles?.map((item, id) => (
            <button
              key={id}
              onClick={() => {
                setToggle(item.value), setCurrentPage(1);
              }}
              className={`tab-btn font-medium text-2xl lg:text-[14px]  text-gray-500 ${
                toggle === item.value &&
                "!text-[#23B123] border-b-2 border-black !font-bold"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {!loading ? (
          <table className="table mt-0 w-full">
            <thead>
              {toggle === "volume" && (
                <tr>
                  <th className="px-4 lg:text-sm  text-[22px] font-medium text-gray-400    py-2">
                    Symbol
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    Volume
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    LTP
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium  text-gray-400 py-2">
                    Change
                  </th>
                </tr>
              )}

              {(toggle === "gainer" ||
                toggle === "loser" ||
                toggle === "unchanged") && (
                <tr>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400    py-2">
                    Symbol
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    LTP
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    % Change
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    Change
                  </th>
                </tr>
              )}

              {toggle === "transaction" && (
                <tr>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400    py-2">
                    Symbol
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    Transaction
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    LTP
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium  text-gray-400 py-2">
                    Change
                  </th>
                </tr>
              )}
              {toggle === "turnover" && (
                <tr>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400    py-2">
                    Symbol
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    Turnover
                  </th>
                  <th className="px-4 lg:text-sm text-[22px] font-medium text-gray-400 py-2">
                    LTP
                  </th>
                </tr>
              )}
            </thead>
            <tbody>
              {(toggle === "gainer" ||
                toggle === "loser" ||
                toggle === "unchanged") && (
                <>
                  {currentData?.slice(startIndex, endIndex)?.map((item, id) => {
                    return (
                      <tr
                        className={
                          id % 2 === 0
                            ? "text-center text-[32px] lg:text-sm"
                            : "text-center text-[32px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td className="text-center px-4 py-2">
                          <Tooltip title={item?.companyName}>
                            <Link
                              href={`/company/${item?.symbol}`}
                              className="hover:text-info"
                            >
                              {" "}
                              {item?.symbol}{" "}
                            </Link>{" "}
                          </Tooltip>
                        </td>
                        <td
                          className={`${
                            toggle === "gainer"
                              ? "text-success"
                              : toggle === "loser"
                              ? "text-danger"
                              : "text-info-2"
                          } px-4 py-2`}
                        >
                          {item?.lastTradedPrice}
                        </td>
                        <td className="px-4 py-2">
                          {item?.perChange?.toFixed(2) + " %"}
                        </td>
                        <td className="px-4 py-2">{item?.schange}</td>
                      </tr>
                    );
                  })}
                </>
              )}

              {toggle === "volume" && (
                <>
                  {currentData?.slice(startIndex, endIndex)?.map((item, id) => {
                    return (
                      <tr
                        className={
                          id % 2 === 0
                            ? "text-center text-[32px] lg:text-sm"
                            : "text-center text-[32px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td className="text-center px-4 py-2">
                          <Tooltip title={item?.companyName}>
                            <Link
                              href={`/company/${item?.symbol}`}
                              className="hover:text-info"
                            >
                              {" "}
                              {item?.symbol}{" "}
                            </Link>{" "}
                          </Tooltip>
                        </td>
                        <td className=" px-4 py-2 ">
                          {formatMoney(item.totalTradeQuantity)}
                        </td>
                        <td
                          className={`${
                            item.perChange >= 0 ? "text-success" : "text-danger"
                          }  px-4 py-2`}
                        >
                          {formatMoney(item.lastTradedPrice)}
                        </td>
                        <td className="px-4 py-2">{item?.schange}</td>
                      </tr>
                    );
                  })}
                </>
              )}

              {toggle === "transaction" && (
                <>
                  {currentData?.slice(startIndex, endIndex)?.map((item, id) => {
                    return (
                      <tr
                        className={
                          id % 2 === 0
                            ? "text-center text-[32px] lg:text-sm"
                            : "text-center text-[32px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td className="text-center px-4 py-2">
                          <Tooltip title={item?.companyName}>
                            <Link
                              href={`/company/${item?.symbol}`}
                              className="hover:text-info"
                            >
                              {" "}
                              {item?.symbol}{" "}
                            </Link>{" "}
                          </Tooltip>
                        </td>
                        <td className=" px-4 py-2 ">
                          {formatMoney(item.totalTrades)}
                        </td>
                        <td
                          className={`${
                            item.perChange >= 0 ? "text-success" : "text-danger"
                          } px-4 py-2`}
                        >
                          {formatMoney(item.lastTradedPrice)}
                        </td>
                        <td className="px-4 py-2">{item?.schange}</td>
                      </tr>
                    );
                  })}
                </>
              )}

              {toggle === "turnover" && (
                <>
                  {currentData?.slice(startIndex, endIndex)?.map((item, id) => {
                    return (
                      <tr
                        className={
                          id % 2 === 0
                            ? "text-center text-[32px] lg:text-sm"
                            : "text-center text-[32px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td className="text-center py-2">
                          <Tooltip title={item?.companyName}>
                            <Link
                              href={`/company/${item?.symbol}`}
                              className="hover:text-info"
                            >
                              {" "}
                              {item?.symbol}{" "}
                            </Link>{" "}
                          </Tooltip>
                        </td>
                        <td className=" px-4 py-2 ">
                          {formatMoney(item.totalTradeValue)}
                        </td>
                        <td className=" px-4 py-2 text-success">
                          {formatMoney(item?.lastTradedPrice)}
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        ) : (
          <Skeleton active style={{ width: "100%" }} paragraph={{ rows: 9 }} />
        )}
      </div>
    </>
  );
};

export default GainerTable;
