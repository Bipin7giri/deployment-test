"use client";
import { formatMoney } from "@/utils/formatMoney";
import Link from "next/link";
import React from "react";
import "../../../../../public/assets/style/table.css";
import { Table } from "antd";

const SaralPickTable = ({ data }) => {
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      // fixed: "left",
      width: 100,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, record) => {
        return (
          <>
            <div className="text-center font-semibold">
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
      dataIndex: "lastTradedPrice",
      key: "lastTradedPrice",
      align: "center",
      sorter: (a, b) => {
        return a["lastTradedPrice"] - b["lastTradedPrice"];
      },
      render: (text, record) => (
        <div className="text-center font-semibold">
          <span className={`font-semibold `}>{formatMoney(text)}</span>
        </div>
      ),
    },
    {
      title: "Price Change",
      dataIndex: "schange",
      key: "schange",
      align: "center",
      sorter: (a, b) => a.schange - b.schange,
      render: (text, record) => (
        <div className="text-center font-semibold">
          <span>{formatMoney(text)}</span>
        </div>
      ),
    },
    {
      title: "Percentage Change",
      dataIndex: "perChange",
      key: "perChange",
      align: "center",
      sorter: (a, b) => a.perChange - b.perChange,
      render: (text) => (
        <div className="text-center font-semibold"> {text?.toFixed(2)} %</div>
      ),
    },
    {
      title: "Previous Price",
      dataIndex: "previousPrice",
      key: "previousPrice",
      align: "center",
      sorter: (a, b) => a.previousPrice - b.previousPrice,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
    {
      title: "Open",
      dataIndex: "openPrice",
      key: "openPrice",
      align: "center",
      sorter: (a, b) => a.openPrice - b.openPrice,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
    {
      title: "High",
      dataIndex: "highPrice",
      key: "highPrice",
      align: "center",
      sorter: (a, b) => a.highPrice - b.highPrice,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
    {
      title: "Low",
      dataIndex: "lowPrice",
      key: "lowPrice",
      align: "center",
      sorter: (a, b) => a.lowPrice - b.lowPrice,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
  ];
  return (
    <div>
      <Table
        size="small"
        className="table-responsive"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default SaralPickTable;
