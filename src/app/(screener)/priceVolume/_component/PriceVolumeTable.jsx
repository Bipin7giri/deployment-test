import { formatMoney } from "@/utils/formatMoney";
import { Table } from "antd";
import Link from "next/link";
import React from "react";
import "../../../../../public/assets/style/table.css";

const PriceVolumeTable = ({ data }) => {
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
          <span>{formatMoney(text)}</span>
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
      title: "Volume (Today)",
      dataIndex: "newVolume",
      key: "newVolume",
      align: "center",
      sorter: (a, b) => a.newVolume - b.newVolume,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
    {
      title: "Previous Volume",
      dataIndex: "oldVolume",
      key: "oldVolume",
      align: "center",
      sorter: (a, b) => a.oldVolume - b.oldVolume,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
    {
      title: "Volume Change",
      dataIndex: "volumediff",
      key: "volumediff",
      align: "center",
      sorter: (a, b) => a.volumediff - b.volumediff,
      render: (text) => (
        <div className="text-center font-semibold"> {formatMoney(text)}</div>
      ),
    },
    {
      title: "Volume Change (%)",
      dataIndex: "volumePerChange",
      key: "volumePerChange",
      align: "center",
      sorter: (a, b) => a.perChange - b.perChange,
      render: (text, record) => (
        <div className="text-center font-semibold">
          <span>{text?.toFixed(2)} %</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        size="small"
        className="table-responsive"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

export default PriceVolumeTable;
