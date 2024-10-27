import React from "react";
import { Skeleton, Table } from "antd";
import { formatNumberwithComma } from "../../../../../utils/formatNumber";

const CashflowDynamicTable = ({ data }) => {
  let keys = Object.keys(data[0]);

  // Move the "particular" key to the front
  keys.unshift(keys?.splice(keys.indexOf("Particular"), 1)[0]);

  const columns = keys.map((key) => {
    if (key === "Particular") {
      return {
        title: key,
        dataIndex: key,
        width: 400,
        key: key,
        render: (da) => {
          return <span>{da}</span>;
        },
      };
    } else {
      return {
        title: key,
        dataIndex: key,
        key: key,
        render: (da) => (
          <span className="flex justify-center">
            {formatNumberwithComma(da)}
          </span>
        ),
      };
    }
  });

  return (
    <div className="mt-4">
      {data.length > 0 && columns.length > 0 ? (
        <Table dataSource={data} columns={columns} />
      ) : (
        <div className="my-10">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
    </div>
  );
};

export default CashflowDynamicTable;
