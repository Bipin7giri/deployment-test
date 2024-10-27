import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import CompanyDataChart from "../companyDataChart";
import { formatMoney } from "../../../../../utils/formatMoney";
import { highlightsItem } from "../../../../../utils/higlightsItem";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import stockCompareAction from "../../../.././(tools)/stock-compare/_redux/action";
import { MdOutlineShowChart } from "react-icons/md";
import { useRouter } from "next/navigation";

const BalanceSheet = ({
  data,
  isPercentage,
  isRatio,
  quater,
  isIncome,
  isAnnualy,
  ratioQuater,
  isfinancial,
  isRatioQuater,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { company } = useSelector((state) => state.company);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);
  const [isChartHover, setIsChartHover] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const highlightsContent = highlightsItem;
  const styles = `
  @media (min-width: 640px) {
    .table-responsive td, .table -responsive th {
        font-size: 20px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 20px;
        margint-top:10px /* Adjust the font size as per your requirement */
      }
      :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-title, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-footer, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small tfoot>tr>td {
        padding: 2px 8px;
    }
    }
    @media (max-width: 640px) {
      .table-responsive td, .table -responsive th {
        font-size: 26px !important;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 26px;
        margint-top:10px /* Adjust the font size as per your requirement */
      }
      :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-title, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-footer, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small tfoot>tr>td {
        padding: 2px 8px;
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
      :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-title, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-footer, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-small tfoot>tr>td {
        padding: 2px 8px;
    }
    }
  `;

  let columns = [];
  if (data?.length === 0) {
    return;
  }
  let finalList = [];
  const tableData = () => {
    let dataObj = data?.report_obj;
    let years = Object?.keys(dataObj);
    if (years && Array?.isArray(years)) {
      years?.sort((a, b) => {
        const yearA = parseInt(a.split("/")[0]);
        const yearB = parseInt(b.split("/")[0]);
        return yearA - yearB;
      });
    }
    let particularList = dataObj[years[years.length - 1]];
    if (isPercentage)
      particularList = particularList.flatMap((element) => [
        element,
        { skey: "Growth" },
      ]);
    for (let i = 0; i < particularList?.length; i++) {
      let obj = {};
      obj = {
        Particulars: particularList[i][`skey`],
        key: i,
        description: [],
      };
      for (let j = 0; j < years?.length; j++) {
        let lastYear = dataObj[years[j - 1]] || null;
        let thisYear = dataObj[years[j]];
        if (obj.Particulars === "Growth") {
          let lastYearValue = 0;
          let thisyearValue = 0;
          if (lastYear) {
            thisyearValue = thisYear
              .filter(
                (element) => element[`skey`] == particularList[i - 1][`skey`]
              )
              .map((ele) => {
                if (ele["skey"] === "Total Loan Loss Provision To NPL") {
                  return ele[`value`] + "%";
                } else {
                  return ele[`value`];
                }
              })[0];
            lastYearValue = lastYear
              .filter(
                (element) => element[`skey`] == particularList[i - 1][`skey`]
              )
              .map((ele) => {
                if (ele["skey"] === "Total Loan Loss Provision To NPL") {
                  return ele[`value`] + "%";
                } else {
                  return ele[`value`];
                }
              })[0];
          }
          let percentNum =
            ((thisyearValue - lastYearValue) / lastYearValue) * 100;
          obj[years[j]] = isNaN(percentNum) ? "-" : percentNum?.toFixed(2);
        } else {
          obj[years[j]] = thisYear
            .filter((element) => element[`skey`] == particularList[i][`skey`])
            .map((ele) => {
              return ele[`value`];
            })[0];
        }
      }
      finalList.push(obj);
    }
    let hideColumnNumber = isRatio ? years?.length - 3 : years?.length - 3;
    for (let i = years?.length - 1; i >= 0; i--) {
      columns.push({
        title: years[i],
        dataIndex: years[i],
        // fixed: "right",
        align: "center",
        className: "right-align",
        render: (text, index) => (
          <>
            <div
              className={` ${i > 4 && "w-[100px]"} ${
                i < hideColumnNumber
                  ? `${isLoggedIn ? " " : "blur-column"}`
                  : ""
              } 
              ${
                index.Particulars.props.children[0] == "Growth" && isPercentage
                  ? text > 0
                    ? "text-green-800"
                    : "text-red-800"
                  : "text-primary  "
              }`}
            >
              {index.Particulars.props.children[0] == "Growth"
                ? !isNaN(text)
                  ? text
                  : "-"
                : text}
              {index.Particulars.props.children[0] == "Growth" && !isNaN(text)
                ? " %"
                : ""}
            </div>
          </>
        ),
      });
    }
    columns.unshift({
      title: "Particulars",
      dataIndex: "Particulars",
      fixed: "left",
      width: 200,
      render: (text) => (
        <>
          <div
            className={`w-96 text-center ${
              isRatio
                ? ""
                : text?.props?.children[0].split(" ")[0] === "Net" ||
                  text?.props?.children[0]?.startsWith("Total")
                ? "font-[600]"
                : ""
            }`}
            style={{
              height: "25px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </>
      ),
    });
  };
  tableData();
  columns = [];
  finalList = [];
  tableData();
  const formattedList = finalList?.map((item) => {
    const formattedItem = {};
    Object.keys(item).forEach((key) => {
      if (key !== "Particulars" && key !== "key" && key !== "description") {
        formattedItem[key] = item[key]?.endsWith("%")
          ? item[key]
          : formatMoney(item[key]);

        if (isRatio && item?.Particulars === "Market cap") {
          formattedItem[key] = (item[key] / 1000000)?.toFixed(2) + " arba";
        }
        if (
          isRatio &&
          (item?.Particulars === "Price/Loans" ||
            item?.Particulars === "Price/Earnings" ||
            item?.Particulars === "Price/Book")
        ) {
          formattedItem[key] = item[key] + "x";
        }
      } else {
        formattedItem[key] = item[key];
      }
    });
    return formattedItem;
  });

  const handleChartIconClick = (rowData) => {
    let modifiedRowData = { ...rowData }; // Create a copy of rowData to avoid modifying the original object
    if (!isLoggedIn) {
      const lastThreeKeyValues = {};
      const keys = Object.keys(modifiedRowData);
      const lastThreeKeys = keys?.slice(-6);
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
        modifiedRowData[key] = modifiedRowData[key].replace("%", ""); // Remove the percentage symbol
      }
    }
    setSelectedRowData(modifiedRowData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const navigateSubscriptionPage = () => {
    router.push(`/subscription-plan`);
  };

  const iconAdd = formattedList.map((item) => {
    const formattedItem = {};
    Object.keys(item).forEach((key) => {
      if (key === "Particulars") {
        formattedItem[key] = (
          <span
            className={`flex justify-between ${
              highlightsContent.includes(item.Particulars) ? "font-bold" : ""
            }`}
          >
            {item[key]}
            {isLoggedIn && is_subscribed ? (
              <div className="" onClick={() => handleChartIconClick(item)}>
                <span className="ml-7 ant-table-actions flex w-[30px]">
                  <button
                    className="bg-green-600 font-bold p-1 text-secondary"
                    onClick={showModal}
                  >
                    <MdOutlineShowChart />
                  </button>
                </span>
              </div>
            ) : (
              <div className="cursor-pointer">
                <Tooltip title="Subscription Required" className="flex gap-2">
                  <button
                    className="bg-green-600 font-bold p-1 text-secondary"
                    onClick={() => {
                      navigateSubscriptionPage();
                    }}
                    onMouseOver={() => setIsChartHover(true)}
                    onMouseOut={() => setIsChartHover(false)}
                  >
                    <MdOutlineShowChart />
                  </button>
                </Tooltip>
              </div>
            )}
          </span>
        );
      } else {
        formattedItem[key] = item[key];
      }
    });
    return formattedItem;
  });

  const handleRowClick = (record) => {
    setSelectedRow(record.key);
  };

  const rowClassName = (record, index) => {
    const particular = record?.Particulars?.props?.children[0];
    if (isRatio) {
      return null;
    } else {
      if (highlightsContent.includes(particular)) {
        return "font-bold";
      }
      if (
        (typeof particular === "string" &&
          particular?.split(" ")[0] === "Net") ||
        particular.startsWith("Total")
      ) {
        return "font-bold";
      }
      return record.key === selectedRow ? "font-bold" : "";
    }
  };

  // useEffect(() => {
  //   // dispatch(
  //   //   stockCompareAction.getCompanyBySector({
  //   //     sector: company?.[0]?.sectorName,
  //   //   })
  //   // );
  // }, [company]);

  return (
    <>
      <style>
        {styles}
        {`
          .blur-column {
            filter: blur(4px); // Adjust the blur value as needed
          }
        `}
      </style>
      {!isLoggedIn && (
        <>
          <p className="text-sm font-bold text-yellow-500 flex items-center gap-2  pb-2  z-10 text-center">
            To unlock the rest of the table data, please log in using your
            credentials.
            <AiOutlineInfoCircle className="text-danger text-sm" />
          </p>
        </>
      )}
      <div>
        {
          <>
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
          </>
        }
        {isModalOpen && (
          <CompanyDataChart
            selectedRowData={selectedRowData?.Particulars}
            setSelectedRowData={setSelectedRowData}
            isAnnualy={isAnnualy}
            quater={quater}
            isRatio={isRatio}
            isIncome={isIncome}
            ratioQuater={ratioQuater}
            isfinancial={isfinancial}
            isRatioQuater={isRatioQuater}
          />
        )}
      </div>
    </>
  );
};

export default BalanceSheet;
