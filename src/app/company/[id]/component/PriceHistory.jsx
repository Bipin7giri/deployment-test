import React, { useEffect } from "react";
import request from "../../../../api/request";
import { useState } from "react";
import { Skeleton, Table } from "antd";
import moment from "moment";

function PriceHistory({ symbol }) {
  const [allData, setallData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getData = async () => {
    try {
      setisLoading(true);
      const currentYear = new Date().getFullYear();
      const januaryFirst = new Date(currentYear, 0, 1);
      const januaryFirstTimestamp = januaryFirst.getTime();
      const response = await request({
        url: `company/get_company_graph_range/${symbol}/${januaryFirstTimestamp / 1000
          }`,
        method: "get",
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
      const newData = response?.data?.data
        ?.sort((a, b) => new Date(b.t) - new Date(a.t))
        ?.map((da, index) => ({
          ...da,
          Sno: index + 1,
        }));
      setallData(newData);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "S.no",
      dataIndex: "Sno",
      key: "Sno",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.Sno - b.Sno,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Open",
      dataIndex: "o",
      key: "o",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.o - b.o,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Close",
      dataIndex: "c",
      key: "c",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.c - b.c,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "High",
      dataIndex: "h",
      key: "h",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.h - b.h,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Low",
      dataIndex: "l",
      key: "l",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.l - b.l,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Date",
      dataIndex: "t",
      key: "t",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.t - b.t,
      render: (text) => (
        <div className="text-center">
          {moment(text * 1000).format("YYYY/MM/DD")}
        </div>
      ),
    },
  ];

  return (
    <div>
      {isLoading && (
        <div className="lg:w-[100%]">
          <Skeleton active />
        </div>
      )}
      {allData?.length > 0 && !isLoading && (
        <Table columns={columns} dataSource={allData} />
      )}
    </div>
  );
}

export default PriceHistory;
