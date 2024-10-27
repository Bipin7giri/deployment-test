"use client";
import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

const indicesColumns = [
  {
    title: "Name",
    align: "left",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Value",
    align: "left",
    dataIndex: "currentValue",
    key: "currentValue",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Change",
    key: "schange",
    align: "left",
    dataIndex: "schange",
    render: (text) => (
      <a className={`${text < 0 ? "text-red-500" : "text-green-500"}`}>
        {text}
      </a>
    ),
  },
];

const NewTable = ({ title }) => {
  const { marketLiveHomeData } = useSelector((state) => state.home);
  const indicesData = marketLiveHomeData?.nepseIndex?.map((item) => {
    return {
      key: item.id,
      name: item.sindex,
      currentValue: item.currentValue,
      schange: item.schange,
    };
  });

  return (
    <>
      {title === "indices" && (
        <Table
          size="small"
          pagination={false}
          columns={indicesColumns}
          dataSource={indicesData}
        />
      )}
    </>
  );
};

export default NewTable;
