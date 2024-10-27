"use client";
import { Table } from "antd";
import React from "react";
import "../../../../public/assets/style/table.css";
import Link from "next/link";
import { formatMoney } from "@/utils/formatMoney";

const TechnicalTable = ({ data }) => {
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 120,
      // fixed: "left",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text) => (
        <div className="text-center font-semibold">
          <Link href={`/company/${text}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "LTP",
      dataIndex: "lastTradedPrice",
      key: "lastTradedPrice",
      width: 120,
      sorter: (a, b) => a.lastTradedPrice - b.lastTradedPrice,
      render: (text, record) => (
        <div
          className={`text-center font-semibold ${
            record?.perChange >= 0 ? "text-success" : "text-danger"
          }`}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Price Change",
      dataIndex: "schange",
      key: "schange",
      width: 120,
      sorter: (a, b) => a.schange - b.schange,
      render: (text, record) => (
        <div
          className={`text-center font-semibold ${
            record?.perChange >= 0 ? "text-success" : "text-danger"
          }`}
        >
          {text}
        </div>
      ),
    },
    {
      title: "% Change",
      dataIndex: "perChange",
      key: "perChange",
      width: 120,
      sorter: (a, b) => a.perChange - b.perChange,
      render: (text, record) => (
        <div
          className={`text-center font-semibold ${
            record?.perChange >= 0 ? "text-success" : "text-danger"
          }`}
        >
          {text?.toFixed(2)} %
        </div>
      ),
    },
    // {
    //   title: "EMA",
    //   dataIndex: "ema",
    //   key: "ema",
    //   width: 120,
    //   sorter: (a, b) => a.ema - b.ema,
    //   render: (text) => <div className="text-center font-semibold">{text}</div>,
    // },
    {
      title: "RSI",
      dataIndex: "rsi",
      key: "rsi",
      width: 120,
      sorter: (a, b) => a.rsi - b.rsi,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: "MACD",
      dataIndex: "macd",
      key: "macd",
      width: 120,
      sorter: (a, b) => a.macd - b.macd,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: "Bband",
      dataIndex: "bband",
      key: "bband",
      width: 120,
      // sorter: (a, b) => a.bband_upper - b.bband_upper,
      render: (text) => (
        <div className="flex justify-center">
          <div
            className={`text-center text-white rounded-xl px-3 font-semibold ${
              text !== "Bullish"
                ? text === "Bearish"
                  ? "bg-danger"
                  : "bg-info"
                : "bg-success"
            }`}
          >
            {text}
          </div>
        </div>
      ),
    },
    {
      title: "Bband Upper",
      dataIndex: "bband_upper",
      key: "bband_upper",
      width: 120,
      sorter: (a, b) => a.bband_upper - b.bband_upper,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: "Bband Lower",
      dataIndex: "bband_lower",
      key: "bband_lower",
      width: 120,
      sorter: (a, b) => a.bband_lower - b.bband_lower,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: "Stoch RSI",
      dataIndex: "stochRSI",
      key: "stochRSI",
      width: 120,
      sorter: (a, b) => a.stochRSI - b.stochRSI,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: `Greed/Fear Percentage`,
      dataIndex: "percent",
      key: "percent",
      width: 120,
      sorter: (a, b) => a.percent - b.percent,
      render: (text) => (
        <div className="text-center font-semibold">{text} %</div>
      ),
    },
    {
      title: "Technical Summary",
      dataIndex: "technical_summary",
      key: "technical_summary",
      width: 120,
      // sorter: (a, b) => a.entryRisk - b.entryRisk,
      render: (text) => (
        <div className="flex justify-center">
          <div
            className={`text-center text-white rounded-xl px-3 font-semibold ${
              text !== "Greed"
                ? text === "Fear"
                  ? "bg-danger"
                  : "bg-info"
                : "bg-success"
            }`}
          >
            {text}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        size="small"
        className="table-responsive"
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
      />
    </>
  );
};

export default TechnicalTable;
