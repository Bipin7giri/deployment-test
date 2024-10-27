import React from "react";
import { Table } from "antd";

const ScreenerTable = ({ historicalData }) => {
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
  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      width: 80,
      fixed: "left",
      sorter: (a, b) => a.sno - b.sno,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 120,
      fixed: "left",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Initial Price",
      dataIndex: "initial_price",
      key: "initial_price",
      width: 120,
      sorter: (a, b) => a.initial_price - b.initial_price,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Closing Price",
      dataIndex: "closing_price",
      key: "closing_price",
      width: 120,
      sorter: (a, b) => a.closing_price - b.closing_price,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "High",
      dataIndex: "high",
      key: "high",
      width: 120,
      sorter: (a, b) => a.high - b.high,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Low",
      dataIndex: "low",
      key: "low",
      width: 120,
      sorter: (a, b) => a.low - b.low,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Turnover",
      dataIndex: "turnover",
      key: "turnover",
      width: 120,
      sorter: (a, b) => a.turnover - b.turnover,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      width: 120,
      sorter: (a, b) => a.volume - b.volume,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "No. of Transactions",
      dataIndex: "no_of_transactions",
      key: "no_of_transactions",
      width: 120,
      sorter: (a, b) => a.no_of_transactions - b.no_of_transactions,
      render: (text) => <div className="text-center">{text}</div>,
    },
  ];
  return (
    <>
      <style>{styles}</style>
      <Table
        className="table-responsive"
        scroll={{ x: true }}
        dataSource={historicalData}
        columns={columns}
      />
    </>
  );
};

export default ScreenerTable;
