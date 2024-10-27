"use client";
import { formatMoney } from "@/utils/formatMoney";
import { Table, Pagination } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const MarketTable = ({ data, isHomePage, setSortOrder }) => {
  const columns = [
    // {
    //   title: "S.No",
    //   dataIndex: "sno",
    //   key: "sno",
    //   // fixed: "left",
    //   width: 50,
    //   sorter: (a, b) => a.sno - b.sno,
    //   render: (text) => <div className="text-center">{text}</div>,
    // },

    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      // fixed: "left",
      width: 100,
      sorter: (a, b) => !isHomePage && a.symbol.localeCompare(b.symbol),
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              {/* <Popover content={record?.name}> */}
              <Link href={`/company/${record.symbol}`}>{record?.symbol}</Link>
              {/* </Popover> */}
            </div>
          </>
        );
      },
    },

    {
      title: "LTP",
      dataIndex: "ltp",
      key: "ltp",
      align: "center",
      sorter: (a, b, sortOrder) => {
        if (!isHomePage) {
          return a["ltp"] - b["ltp"];
        } else {
          setSortOrder(sortOrder);
        }
      },
      sortDirections: ["ascend", "descend", ""],
      render: (text, record) => (
        <div className="text-center">
          <span className={`font-semibold `}>{formatMoney(text)}</span>
        </div>
      ),
    },
    {
      title: "Price Change",
      dataIndex: "schange",
      key: "schange",
      align: "center",
      sorter: (a, b) => !isHomePage && a.schange - b.schange,
      render: (text, record) => (
        <div className="text-center">
          <span>{formatMoney(text)}</span>
        </div>
      ),
    },
    {
      title: "% Change",
      dataIndex: "pChange",
      key: "pChange",
      align: "center",
      sorter: (a, b) => !isHomePage && a.pChange - b.pChange,
      render: (text, record) => (
        <div className="text-center">
          <span>{text?.toFixed(2)} %</span>
        </div>
      ),
    },
    {
      title: "Previous Price",
      dataIndex: "previousPrice",
      key: "previousPrice",
      align: "center",
      sorter: (a, b) => !isHomePage && a.previousPrice - b.previousPrice,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "52 Week high",
      dataIndex: "weekhigh",
      key: "weekhigh",
      align: "center",
      sorter: (a, b) => !isHomePage && a.weekhigh - b.weekhigh,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "52 Week Low",
      dataIndex: "weeklow",
      key: "weeklow",
      align: "center",
      sorter: (a, b) => !isHomePage && a.weeklow - b.weeklow,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "High",
      dataIndex: "high",
      key: "high",
      align: "center",
      sorter: (a, b) => !isHomePage && a.high - b.high,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "Low",
      dataIndex: "low",
      key: "low",
      align: "center",
      sorter: (a, b) => !isHomePage && a.low - b.low,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "open",
      align: "center",
      sorter: (a, b) => !isHomePage && a.open - b.open,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "Total Volume",
      dataIndex: "volume",
      key: "volume",
      align: "center",
      sorter: (a, b) => !isHomePage && a.volume - b.volume,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
    {
      title: "Total Turnover",
      dataIndex: "turnover",
      key: "turnover",
      align: "center",
      sorter: (a, b) => !isHomePage && a.turnover - b.turnover,
      render: (text) => <div className="text-center"> {formatMoney(text)}</div>,
    },
  ];

  const styles = `
  @media (min-width: 640px) {
    .table-responsive td, .table-responsive th {
      font-size: 26px;
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item,
    .ant-pagination-item-link {
      font-size: 20px;
      margint-top:10px /* Adjust the font size as per your requirement */
    }
  }

  @media (min-width: 1024px) {
    .table-responsive td, .table-responsive th {
      font-size: 14px;
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item,
    .ant-pagination-item-link {
      font-size: 14px;
      margint-top:10px /* Adjust the font size as per your requirement */
    }
  }   
`;

  // const handleTableChange = (sorter) => {
  //   console.log(sorter);
  //   if (sorter.columnKey === "ltp") {
  //     if (!sorter.order) {
  //       setSortOrder("");
  //     } else {
  //       setSortOrder(sorter.order);
  //     }
  //   }
  // };

  return (
    <>
      <style>{styles}</style>
      <Table
        size="small"
        rowClassName={(record, index) => {
          if (record.schange > 0)
            return "background-color-green text-white font-bold";
          else if (record.schange)
            return "background-color-red text-white font-bold";
          else return "background-color-blue text-white font-bold";
        }}
        className="table-responsive"
        pagination={false}
        columns={columns}
        dataSource={data}
        // onChange={handleTableChange}
        scroll={{ x: true }}
      />
    </>
  );
};

export default MarketTable;
