import { Table } from "antd";
import Link from "next/link";
import React from "react";

const FearGreedTable = ({ selectedTab, data }) => {
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 120,
      fixed: "left",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text) => (
        <div className="text-center font-semibold">
          <Link href={`/company/${text}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "Last Traded Price",
      dataIndex: "lastTradedPrice",
      key: "lastTradedPrice",
      width: 120,
      sorter: (a, b) => a.lastTradedPrice - b.lastTradedPrice,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: "Price Change",
      dataIndex: "schange",
      key: "schange",
      width: 120,
      sorter: (a, b) => a.schange - b.schange,
      render: (text) => <div className="text-center font-semibold">{text}</div>,
    },
    {
      title: "% Change",
      dataIndex: "perChange",
      key: "perChange",
      width: 120,
      sorter: (a, b) => a.perChange - b.perChange,
      render: (text) => (
        <div className="text-center font-semibold">{text?.toFixed(2)} %</div>
      ),
    },
    {
      title: `${
        selectedTab === "Top Greed"
          ? "Greed"
          : selectedTab === "Top Fear"
          ? "Fear"
          : "Neutral"
      } Percentage`,
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
      render: (text) => <div className="text-center font-semibold">{text}</div>,
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

    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table {
      line-height: 0.971429;
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
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table {
      line-height: 0.91429;
    }
  }
`;
  return (
    <>
      <style>{styles}</style>
      <Table
        columns={columns}
        className="table-responsive"
        pagination={false}
        dataSource={data}
      />
    </>
  );
};

export default FearGreedTable;
