import { Table } from "antd";
import Link from "next/link";
import React from "react";

const TrendingStocksTable = ({ selectedTab, data }) => {
  const columns = [
    {
      title: "Company Name",
      dataIndex: "securityName",
      key: "securityName",
      sorter: (a, b) => a.securityName.localeCompare(b.securityName),
      width: 120,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 120,
      fixed: "left",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text) => (
        <div className="text-center">
          <Link href={`/company/${text}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "Sector",
      dataIndex: "sectorName",
      key: "sectorName",
      width: 120,
      fixed: "left",
      sorter: (a, b) => a.sectorName.localeCompare(b.sectorName),
    },
    {
      title: "Last Traded Price",
      dataIndex: "lastTradedPrice",
      key: "lastTradedPrice",
      width: 120,
      sorter: (a, b) => a.lastTradedPrice - b.lastTradedPrice,
      render: (text) => <div className="text-center">{text}</div>,
    },

    {
      title: "Latest Day Change",
      dataIndex: "Day 1 Change",
      key: "Day 1 Change",
      width: 120,
      sorter: (a, b) => a["Day 1 Change"] - b["Day 1 Change"],
      render: (text) => <div className="text-center">{text?.toFixed(2)} %</div>,
    },
    {
      title: "Prior Day Change",
      dataIndex: "Day 2 Change",
      key: "Day 2 Change",
      width: 120,
      sorter: (a, b) => a["Day 2 Change"] - b["Day 2 Change"],
      render: (text) => <div className="text-center">{text?.toFixed(2)} %</div>,
    },
    {
      title: "Earlier Day Change",
      dataIndex: "Day 3 Change",
      key: "Day 3 Change",
      width: 120,
      sorter: (a, b) => a["Day 3 Change"] - b["Day 3 Change"],
      render: (text) => <div className="text-center">{text?.toFixed(2)} %</div>,
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

export default TrendingStocksTable;
