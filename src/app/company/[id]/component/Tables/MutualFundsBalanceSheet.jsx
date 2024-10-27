import { useState, useEffect } from "react";
import { formatMoney } from "../../../../../utils/formatMoney";
import { highlightsItem } from "../../../../../utils/higlightsItem";
import { useSelector } from "react-redux";
import { Table } from "antd";
import MutualFinancialChart from "../MutualFunds/MutualFinancialChart";

const MutualFundsBalanceSheet = ({ data }) => {
  const highlightsContent = highlightsItem;
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Convert the data object to an array of entries
  const dataArray = Object?.entries(data);

  // Sort the array in descending order based on the month and year
  dataArray?.sort((a, b) => {
    const [monthA, yearA] = a[0]?.split("/");
    const [monthB, yearB] = b[0]?.split("/");

    // Compare years first
    const yearComparison = parseInt(yearA) - parseInt(yearB);

    // If years are the same, compare months
    if (yearComparison === 0) {
      return parseInt(monthA) - parseInt(monthB);
    }

    return yearComparison;
  });

  // Convert the sorted array back to an object
  const sortedData = Object?.fromEntries(dataArray);

  const [columns, setColumns] = useState([]);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    const tableData = () => {
      try {
        if (Object?.keys(sortedData)?.length > 0) {
          let MFYears = Object?.keys(sortedData);
          let particularList = sortedData[MFYears[0]];
          let newList = [];
          for (let i = 0; i < particularList?.length; i++) {
            let obj = {
              Particulars: particularList[i]["skey"],
              key: i,
              description: [],
            };

            for (let j = 0; j < MFYears?.length; j++) {
              let thisCompany = sortedData[MFYears[j]];
              obj[MFYears[j]] = thisCompany
                ?.filter(
                  (element) => element["skey"] === particularList[i]["skey"]
                )
                ?.map((ele) => {
                  return ele["value"];
                })[0];
            }
            newList.push(obj);
          }

          let newColumns = [];
          for (let i = MFYears?.length - 1; i >= 0; i--) {
            newColumns.push({
              title: MFYears[i],
              dataIndex: MFYears[i],
              align: "center",
              width: 100,
            });
          }

          newColumns.unshift({
            title: "Particulars",
            dataIndex: "Particulars",
            fixed: "left",
            width: 250,
            render: (text) => <div>{text}</div>,
          });

          setFinalList(newList);
          setColumns(newColumns);
        }
      } catch (err) {
        console.log(err);
      }
    };

    tableData();
  }, [data]);

  const styles = `
    @media (min-width: 640px) {
      .table-responsive td,
      .table-responsive th {
        font-size: 26px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 20px;
        margin-top: 10px; /* Adjust the font size as per your requirement */
      }
    }

    @media (min-width: 1024px) {
      .table-responsive td,
      .table-responsive th {
        font-size: 14px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 14px;
        margin-top: 10px; /* Adjust the font size as per your requirement */
      }
    }
  `;

  const formattedList = finalList?.map((item) => {
    const formattedItem = {};
    Object.keys(item).forEach((key) => {
      if (key !== "Particulars" && key !== "key" && key !== "description") {
        if (typeof item[key] === "string" && item[key].endsWith("%")) {
          formattedItem[key] = item[key];
        } else {
          formattedItem[key] = formatMoney(item[key]);

          if (item?.Particulars === "Market cap") {
            formattedItem[key] = (item[key] / 1000000)?.toFixed(2) + " arba";
          }
        }
      } else {
        formattedItem[key] = item[key];
      }
    });
    return formattedItem;
  });

  const [selectedRowData, setSelectedRowData] = useState();
  const handleChartIconClick = (rowData) => {
    let modifiedRowData = { ...rowData };
    if (!isLoggedIn) {
      const lastThreeKeyValues = {};
      const keys = Object.keys(modifiedRowData);
      const lastThreeKeys = keys.slice(-6);
      for (const key of lastThreeKeys) {
        lastThreeKeyValues[key] = modifiedRowData[key];
      }
      modifiedRowData = { ...lastThreeKeyValues };
    }

    for (const key in modifiedRowData) {
      if (
        typeof modifiedRowData[key] === "string" &&
        modifiedRowData[key].endsWith("%")
      ) {
        modifiedRowData[key] = modifiedRowData[key].replace("%", "");
      }
    }
    setSelectedRowData(modifiedRowData);
  };

  const iconAdd = formattedList.map((item) => {
    const formattedItem = {};
    Object.keys(item).forEach((key) => {
      if (key === "Particulars") {
        formattedItem[key] = (
          <span
            className={`flex justify-between ${highlightsContent.includes(item.Particulars) ? "font-bold" : ""
              }`}
          >
            {item[key]}
            <div onClick={() => handleChartIconClick(item)}>
              <MutualFinancialChart data={selectedRowData} />
            </div>
          </span>
        );
      } else {
        formattedItem[key] = item[key];
      }
    });
    return formattedItem;
  });

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRow(record.key);
  };

  const rowClassName = (record, index) => {
    const particular = record?.Particulars?.props?.children[0];
    if (highlightsContent.includes(particular)) {
      return "font-bold";
    }
    if (
      (typeof particular === "string" && particular?.split(" ")[0] === "Net") ||
      particular.startsWith("Total")
    ) {
      return "font-bold";
    }
    return record.key === selectedRow ? "font-bold" : "";
  };

  return (
    <>
      <div className="py-10">
        <div className="bg-secondary shadow-md rounded-lg p-5">
          <style>{styles}</style>
          <Table
            size="small"
            className="table-responsive"
            columns={columns}
            dataSource={iconAdd}
            rowClassName={rowClassName}
            pagination={false}
            scroll={{ x: true }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      </div>
    </>
  );
};

export default MutualFundsBalanceSheet;
