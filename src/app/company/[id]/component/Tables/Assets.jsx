import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const AssetsTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  let columns = [];
  let rawData = [];
  if (data?.length === 0) {
    return;
  }
  let finalList = [];

  const tableData = () => {
    let dataObj = data["report_obj"];
    let years = Object.keys(dataObj);
    let particularList = dataObj[years[0]];
    let dataname = data["data_name"];
    for (let i = 0; i < particularList.length; i++) {
      let obj = {};
      obj = {
        Particulars: particularList[i][`${dataname}_name`],
        key: i,
        description: [],
      };

      for (let j = 0; j < years.length; j++) {
        let thisYear = dataObj[years[j]];
        obj[years[j]] = thisYear
          .filter(
            (element) =>
              element[`${dataname}_name`] ==
              particularList[i][`${dataname}_name`]
          )
          .map((ele) => ele[`${dataname}_value`])[0]
          // .toFixed()
          ?.toLocaleString("en-IN", { style: "decimal" });
      }
      finalList.push(obj);
    }
    for (let i = finalList.length - 1; i >= 0; i--) {
      // Calculate change in ratio for each object
      const years = Object.keys(finalList[i]).filter(
        (key) => key !== "Particulers" && key !== "key" && key !== "description"
      );
      for (let j = years.length - 1; j >= 0; j--) {
        const year1 = years[j];
        const year2 = years[j + 1];
        const ratio1 = finalList[i][year1] / finalList[i][year2];
        const ratio2 = finalList[i][year2] / finalList[i][year1];
        const changeInRatio = ratio1 - 1;
        finalList[i].description.push(`
 ${changeInRatio.toFixed(2)}%`);
        finalList[i];
      }
      finalList[i].description.shift();
      finalList[i].description.push("-");
    }
    for (let i = years.length - 1; i >= 0; i--) {
      columns.push({
        title: years[i],
        dataIndex: years[i],
        // fixed: "right",
        align: "center",
      });
    }
    columns.unshift({
      title: "Particulars",
      dataIndex: "Particulars",
      align: "left",
      fixed: "left",
      width: 800,
      render: (text) => <div style={{ width: "300px" }}>{text}</div>,
    });
  };
  tableData();
  columns = [];
  finalList = [];
  // useEffect(() => {
  tableData();

  const handleExpandAll = () => {
    setExpandedRows(finalList.map((record) => record.key));
  };

  const handleCollapseAll = () => {
    setExpandedRows([]);
  };

  const expandIcon = (props) => {
    if (props.expanded) {
      return <MinusOutlined />;
    } else {
      return <PlusOutlined />;
    }
  };
  const expandedRowRender = (record) => {
    // Data source for the nested table
    const nestedTableDataSource = [
      {
        key: 1,
        name: `Nested Record for ${record.name}`,
        description: `Description for Nested Record`,
      },
    ];

    // Column configurations for the nested table
    const nestedTableColumns = [
      // ... column configurations for the nested table
    ];

    return (
      <Table
        columns={nestedTableColumns}
        dataSource={nestedTableDataSource}
        pagination={false}
        scroll={{ y: 240 }}
      />
    );
  };
  let test = [
    {
      title: "Name",
      width: 10,
    },
    {
      title: "Name",
      width: 400,
    },
    {
      title: "Name",
      width: 800,
    },
  ];
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <button onClick={handleExpandAll}>Expand All Rows</button>
        <button onClick={handleCollapseAll}>Collapse All Rows</button>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={finalList}
        pagination={false}
        scroll={{ x: true }}
      />
    </>
  );
};

export default AssetsTable;
