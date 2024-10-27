import { Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import request from "../../../../api/request";

export default function Holdtables({ symbol, toDate, fromDate, title }) {
  const [tableData, settableData] = useState([]);
  const getTableSymbolData = async () => {
    const response = await request({
      method: "get",
      url: `/floorsheet/get_by_holdingBrokerName_sym/${symbol}`,
    });
    const updData = response?.data?.data?.map((data, index) => ({
      ...data,
      sno: index + 1,
    }));
    settableData(updData);
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
      title: "Broker",
      dataIndex: "brokerName",
      key: "brokerName",
      render: (text, record) => {
        return (
          <>
            <div className="text-center">{text}</div>
          </>
        );
      },
    },
    {
      title: "Buy Quantity",
      dataIndex: "buyQuantity",
      key: "buyQuantity",
      sorter: (a, b) => a.buyQuantity - b.buyQuantity,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Sell Quantity",
      dataIndex: "sellQuantity",
      key: "sellQuantity",
      sorter: (a, b) => a.sellQuantity - b.sellQuantity,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Holding Difference",
      dataIndex: "holdingDifference",
      key: "holdingDifference",
      sorter: (a, b) => a.holdingDifference - b.holdingDifference,
      render: (text) => <div className="text-center">{text}</div>,
    },
  ];
  const getTableDataWithDates = async () => {
    const response = await request({
      method: "post",
      url: `/broker/broker_hystoric_holding_by_sym`,
      data: {
        symbol,
        toDate,
        fromDate,
      },
    });

    const updData = response?.data?.data?.map((data, index) => ({
      ...data,
      sno: index + 1,
    }));
    settableData(updData);
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
        <div>
          <div className="my-10">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        </div>
      )}
    </div>
  );
}
