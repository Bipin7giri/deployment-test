import { Table } from "antd";
import React, { useEffect, useState } from "react";
import request from "../../../../api/request";
import axios from "axios";

export default function Matchingtable({ symbol, toDate, fromDate, title }) {
  const [tableData, settableData] = useState([]);
  const [notFound, setnotFound] = useState(false);
  const getTableSymbolData = async () => {
    const response = await request({
      method: "get",
      url: `/floorsheet/get_by_matchingBrokerName_sym/${symbol}`,
    });

    if (response?.data?.data && response?.data?.data.length > 0) {
      const updData = response?.data?.data?.map((data, index) => ({
        ...data,
        sno: index + 1,
      }));
      settableData(updData);
    } else {
      setnotFound(true);
    }
  };
  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      sorter: (a, b) => a.sno - b.sno,
      render: (text, record, index) => (
        <div className="text-center">{text}</div>
      ),
    },

    {
      title: "Broker ",
      dataIndex: "buyerMemberId",
      key: "buyerMemberId",
      sorter: (a, b) => a.buyerMemberId - b.buyerMemberId,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "totalContractQuantity",
      key: "totalContractQuantity",
      sorter: (a, b) => a.sellQuantity - b.sellQuantity,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Amount",
      dataIndex: "totalContractAmount",
      key: "totalContractAmount",
      sorter: (a, b) => a.holdingDifference - b.holdingDifference,
      render: (text) => <div className="text-center">{text?.toFixed(2)}</div>,
    },
    {
      title: "Average Price",
      dataIndex: "averagePrice",
      key: "averagePrice",
      sorter: (a, b) => a.holdingDifference - b.holdingDifference,
      render: (text) => <div className="text-center">{text?.toFixed(2)}</div>,
    },
  ];
  const getTableDataWithDates = async () => {
    const response = await request({
      method: "post",
      url: `/broker/broker_hystoric_matching_by_sym`,
      data: {
        symbol,
        toDate,
        fromDate,
      },
    });

    if (response?.data?.data && response?.data?.data.length > 0) {
      const updData = response?.data?.data?.map((data, index) => ({
        ...data,
        sno: index + 1,
      }));
      settableData(updData);
    } else {
      setnotFound(true);
    }
  };
  useEffect(() => {
    if (toDate && fromDate) {
      getTableDataWithDates();
    } else {
      getTableSymbolData();
    }
  }, [symbol, fromDate, toDate]);

  return (
    <div className="px-[8%]">
      {tableData && tableData.length > 0 ? (
        <Table dataSource={tableData} columns={columns} className="mt-5" />
      ) : (
        <div className="mt-5">
          {notFound && (
            <Table dataSource={[]} columns={[{ title: "Broker" }]} />
          )}
        </div>
      )}
    </div>
  );
}
