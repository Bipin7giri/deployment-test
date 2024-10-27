"use client";
import { Table } from "antd";
import Link from "next/link";
import React from "react";
import "../../../../../public/assets/style/table.css";

const PromoterShareTable = ({ data, isLocked }) => {
  console.log(data)
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
      // fixed: "left",
      width: 100,
      //   sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <span>{text}</span>
            </div>
          </>
        );
      },
    },
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
            <div className="text-center">
              <Link href={`/company/${record.symbol}`}>{record?.symbol}</Link>
            </div>
          </>
        );
      },
    },
    {
      title: "Unlocked Date",
      dataIndex: "period",
      key: "period",
      align: "center",
      sorter: (a, b) => {
        return a["period"] - b["period"];
      },
      render: (text, record) => (
        <div className="text-center">
          <span className={`font-semibold `}>{text}</span>
        </div>
      ),
    },
    isLocked && {
      title: "Remaining Days",
      dataIndex: "remainingDay",
      key: "remainingDay",
      align: "center",
      sorter: (a, b) => {
        return a["remainingDay"] - b["remainingDay"];
      },
      render: (text, record) => (
        <div className="text-center">
          <span className={`font-semibold `}>{text} Days</span>
        </div>
      ),
    },
  ].filter(Boolean);;
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

export default PromoterShareTable;
