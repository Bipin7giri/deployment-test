"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Popover } from "antd";
import api from "../../../../api/axios";
import { Resizable } from "react-resizable";
import {
  CreateFilterDropdown,
  CreateSectorDropdown,
  CreateMarketCapFilterDropdown,
} from "./CreateFilterDropdown";
import "@fontsource/ubuntu";
import actions from "../../_redux/action";
import { setScreenerFilterList } from "../../_redux/toolsSlice";
import filterIcon from "../../../../assets/icon/filter.png";
import Link from "next/link";
import TableLoader from "@/components/TableLoader";
import Image from "next/image";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const ScreenerNavButtons = ({ title, isActive, onClick, rounded }) => {
  return (
    <div>
      <button
        className={`${
          isActive
            ? "bg-[#F4F2F2] text-primary"
            : "bg-secondary text-primary   border border-black"
        } border border-gray-200 w-[400px] lg:w-auto cursor-pointer px-6 py-4 lg:px-4 lg:py-2 lg:text-sm text-4xl 
          leading-5 mr-3 ${
            rounded === "scrennerV2" ? "rounded-md" : "rounded-full"
          }  mb-4`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

const CompanyList = ({ setColumnTags, columnTags }) => {
  const dispatch = useDispatch();

  const { scrennerV2Data, loading, screenerFilterList } = useSelector(
    (state) => state.tools
  );
  const { isLoggedIn, currentUser, is_subscribed } = useSelector(
    (state) => state.auth
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenerIndicator, setScreenerIndicator] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState("eps");
  const [tableData, setTableData] = useState([]);
  const [initialTableColumn, setInitialTableColumn] = useState([
    {
      title: <span className="dragHandler cursor-move">Symbol</span>,
      dataIndex: "symbol",
      key: "symbol",
      width: 100,
      fixed: "left",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a?.symbol?.localeCompare(b?.symbol),
      render: (text, record) => {
        return (
          <>
            <Link
              href={`/company/${text}`}
              className="flex items-center text-center gap-4"
            >
              <img
                className="lg:w-10 w-18 h-18 lg:h-10 rounded-full object-contain lg:block hidden"
                src={`${
                  `https://peridotnepal.xyz/company_logo/${text}.webp`
                    ? `https://peridotnepal.xyz/company_logo/${text}.webp`
                    : "https://peridotnepal.xyz/company_logo/sarallagani.webp"
                } `}
                onError={(e) => {
                  e.target.src =
                    "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                }}
                alt={text}
              />
              <Popover content={record?.companyName}>
                <p className="truncate lg:max-w-[20ch] max-w-auto text-md font-semibold lg:block hidden">
                  {" "}
                  &nbsp; {record?.companyName}{" "}
                </p>
              </Popover>
              <p className="lg:text-sm text-xl font-semibold">{text}</p>
            </Link>
          </>
        );
      },
    },

    {
      title: <span className="dragHandler cursor-move">Sector</span>,
      dataIndex: "Sectors",
      key: "Sectors",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a?.Sectors?.localeCompare(b?.Sectors),
      filterIcon: (filtered) => (
        <div className="border border-gray-500 p-1 rounded">
          <Image
            src={filterIcon}
            alt="filter"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        </div>
      ),
      filterDropdown: (props) => CreateSectorDropdown(props, "Sectors"),
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <span className="dragHandler cursor-move">LTP</span>,
      dataIndex: "LTP",
      key: "LTP",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => {
        return a["LTP"] - b["LTP"];
      },
      filterIcon: (filtered) => (
        <div className="border border-gray-500 p-1 rounded">
          <Image
            src={filterIcon}
            alt="filter"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        </div>
      ),
      filterDropdown: (props) =>
        CreateFilterDropdown(props, "LTP", {
          isOpen: openFilterDropdownKey === "LTP",
          onOpen: () => handleFilterDropdownOpen("LTP"),
          onClose: () => setOpenFilterDropdownKey(null),
        }),
      render: (text) => (
        <div className="text-center">
          {!text ? "-" : typeof text === "number" ? text?.toFixed(2) : text}
        </div>
      ),
    },
    {
      title: (
        <span className="dragHandler cursor-move">Earnings Per Share</span>
      ),
      dataIndex: "Earnings Per Share",
      key: "Earnings Per Share",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => {
        return a["Earnings Per Share"] - b["Earnings Per Share"];
      },
      filterIcon: (filtered) => (
        <div className="border border-gray-500 p-1 rounded">
          <Image
            src={filterIcon}
            alt="filter"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        </div>
      ),
      filterDropdown: (props) =>
        CreateFilterDropdown(props, "Earnings Per Share", {
          isOpen: openFilterDropdownKey === "Earnings Per Share",
          onOpen: () => handleFilterDropdownOpen("Earnings Per Share"),
          onClose: () => setOpenFilterDropdownKey(null),
        }),
      render: (text) => (
        <div className={`text-center ${!isLoggedIn && "blur-md"}`}>
          {!text ? "-" : typeof text === "number" ? text?.toFixed(2) : text}
        </div>
      ),
    },
    {
      title: (
        <span className="dragHandler cursor-move">Book Value per Share</span>
      ),
      dataIndex: "Book Value per Share",
      key: "Book Value per Share",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => sortColumn(a, b, "Book Value per Share"),
      filterIcon: (filtered) => (
        <div className="border border-gray-500 p-1 rounded">
          <Image
            src={filterIcon}
            alt="filter"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        </div>
      ),
      filterDropdown: (props) =>
        CreateFilterDropdown(props, "Book Value per Share", {
          isOpen: openFilterDropdownKey === "Book Value per Share",
          onOpen: () => handleFilterDropdownOpen("Book Value per Share"),
          onClose: () => setOpenFilterDropdownKey(null),
        }),
      render: (text) => (
        <div className={`text-center ${!isLoggedIn && "blur-md"}`}>
          {!text ? "-" : typeof text === "number" ? text?.toFixed(2) : text}
        </div>
      ),
    },
    {
      title: <span className="dragHandler cursor-move">Return on Equity</span>,
      dataIndex: "Return on Equity",
      key: "Return on Equity",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => sortColumn(a, b, "Return on Equity"),
      filterIcon: (filtered) => (
        <div className="border border-gray-500 p-1 rounded">
          <Image
            src={filterIcon}
            alt="filter"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        </div>
      ),
      filterDropdown: (props) =>
        CreateFilterDropdown(props, "Return on Equity", {
          isOpen: openFilterDropdownKey === "Return on Equity",
          onOpen: () => handleFilterDropdownOpen("Return on Equity"),
          onClose: () => setOpenFilterDropdownKey(null),
        }),
      render: (text) => (
        <div className={`text-center ${!isLoggedIn && "blur-md"}`}>
          {!text ? "-" : typeof text === "number" ? text?.toFixed(2) : text}
        </div>
      ),
    },
    {
      title: <span className="dragHandler cursor-move">Market Cap</span>,
      dataIndex: "Market Cap",
      key: "Market Cap",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => {
        return a["Market Cap"] - b["Market Cap"];
      },
      filterIcon: (filtered) => (
        <div className="border border-gray-500 p-1 rounded">
          <Image
            src={filterIcon}
            alt="filter"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        </div>
      ),
      filterDropdown: (props) =>
        CreateMarketCapFilterDropdown(props, "Market Cap", {
          isOpen: openFilterDropdownKey === "Market Cap",
          onOpen: () => handleFilterDropdownOpen("Market Cap"),
          onClose: () => setOpenFilterDropdownKey(null),
        }),
      render: (text) => (
        <div className={`text-center ${!isLoggedIn && "blur-md"}`}>
          {!text ? "-" : typeof text === "number" ? text?.toFixed(2) : text}
        </div>
      ),
    },
  ]);

  const [openFilterDropdownKey, setOpenFilterDropdownKey] = useState(null);

  const handleFilterDropdownOpen = (key) => {
    setOpenFilterDropdownKey(key === openFilterDropdownKey ? null : key);
  };

  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        right: 500,
        left: 500,
        behavior: "smooth",
      });
    }
  };

  const getAdvanceScreenerIndicator = async () => {
    try {
      const res = await api.get("advance_screener/options");
      if (res) {
        setScreenerIndicator(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let initialFilterList = {
      sector_name: "All",
      ratio_list: [
        {
          id: 1,
          ratio_name: "LTP",
          filter_type: 0,
          table_name: "q_pro_ratios",
        },
        {
          id: 1,
          ratio_name: "Earnings Per Share",
          filter_type: 0,
          table_name: "q_pro_ratios",
        },
        {
          id: 1,
          ratio_name: "Return on Equity",
          filter_type: 0,
          table_name: "q_pro_ratios",
        },
        {
          id: 1,
          ratio_name: "Book Value per Share",
          filter_type: 0,
          table_name: "q_pro_ratios",
        },
        {
          id: 1,
          ratio_name: "Market Cap",
          filter_type: 0,
          table_name: "q_val_ratios",
        },
      ],
    };
    dispatch(setScreenerFilterList(initialFilterList));
    dispatch(actions.postScreenerV2(initialFilterList));
  }, []);

  useEffect(() => {
    const symbolData = {};

    scrennerV2Data?.data?.dataList?.forEach((item) => {
      if (!symbolData[item.symbol]) {
        symbolData[item.symbol] = {
          symbol: item.symbol,
          companyName: item.companyName,
          Sectors: item.sector,
          LTP: item.LTP,
        };
      }

      if (!symbolData[item.symbol][item.ratio_name]) {
        symbolData[item.symbol][item.ratio_name.trim()] =
          item.is_percent === 1
            ? `${(item.value * 100)?.toFixed(2)}%`
            : item.value;
      }
    });

    const formattedData = Object?.values(symbolData)?.map((item, index) => ({
      ...item,
      key: index,
    }));
    // if (formattedData?.length > 0) {

    setTableData(formattedData);
    // }
  }, [screenerFilterList, scrennerV2Data]);

  const handleButtonClick = (index, indicator) => {
    setActiveIndex(index);
    setSelectedIndicator(indicator);
  };

  const styles = `
    .ubuntu{
        font-family: "Ubuntu" !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table{
        font-family: "Ubuntu" !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas)[class^="ant-table"], :where(.css-dev-only-do-not-override-12jzuas)[class*=" ant-table"]{
        font-family: "Ubuntu" !important;
    }
    .anticon-filter {
        color: rgba(0, 0, 0, 0.29);
      }
    .ant-input{
        height: 33px;
    }
    .ant-table-thead>tr>th {
        font-weight: bold !important;
        text-align: center !important;
        border: none !important;
        background-color: #F4F2F2 !important;
        color: black !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper tfoot>tr>td{
        padding : 8px !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:first-child {
        border-start-start-radius: 0 !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:last-child {
        border-start-end-radius: 0 !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-column-sorter-up, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table-column-sorter-down {
        font-size: 9px  !important;
    }
    .ant-table-column-sorters .ant-table-column-sorter-up, .ant-table-column-sorters .ant-table-column-sorter-down {
        color: rgba(0, 0, 0, 0.29) !important;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >thead>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >thead>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >thead>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >thead>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >thead>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >tbody>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >tbody>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >tfoot>tr>th, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-content >table >tfoot>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-header >table >tfoot>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-body >table >tfoot>tr>td, :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table.ant-table-bordered >.ant-table-container >.ant-table-summary >table >tfoot>tr>td {
        border-inline-end: 1px solid #f0f0f0;
        max-width: 104px !important;
        min-width: 104px !important;
    }
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
    }   
  `;

  // const columns = ;

  useEffect(() => {
    // getAdvanceScreenerIndicator();
    setColumnTags(initialTableColumn);
  }, []);

  const sortColumn = (a, b, dataIndex) => {
    const aValue =
      typeof a[dataIndex] === "string"
        ? parseFloat(a[dataIndex])
        : a[dataIndex];
    const bValue =
      typeof b[dataIndex] === "string"
        ? parseFloat(b[dataIndex])
        : b[dataIndex];

    return aValue - bValue;
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const updatedColumns = [...columnTags];
      const item = updatedColumns?.splice(fromIndex, 1)[0];
      updatedColumns?.splice(toIndex, 0, item);
      setColumnTags(updatedColumns);
    },
    nodeSelector: "th",
    handleSelector: ".dragHandler",
    ignoreSelector: "react-resizable-handle",
  };

  const handleResize =
    (index) =>
    (e, { size }) => {
      const updatedColumns = [...columnTags];
      updatedColumns[index] = {
        ...updatedColumns[index],
        width: size.width,
      };
      setColumnTags(updatedColumns);
    };

  const updatedColumns = columnTags?.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
      {loading ? (
        <>
          <div role="status" className="animate-pulse">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <>
          {/* <div className="flex justify-between items-center ubuntu">
                        <span className="text-5xl lg:hidden text-gray-600 pb-3 pr-6 font-bold hover:text-gray-900 cursor-pointer" onClick={scrollLeft}>
                            &lt;
                        </span>
                        <div className="flex overflow-x-auto" ref={containerRef}>
                            <div className="flex lg:flex-wrap lg:gap-[1px] gap-2">
                                {screenerIndicator?.map((item, id) => (
                                    <ScreenerNavButtons
                                        key={id}
                                        title={`${item?.type}`}
                                        isActive={activeIndex === id}
                                        onClick={() => handleButtonClick(id, item.value)}
                                        rounded='scrennerV2'
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-5xl lg:hidden text-gray-600 pb-4 pl-6 font-bold hover:text-gray-900 cursor-pointer" onClick={scrollRight}>
                            &gt;
                        </span>
                    </div> */}
          <div className="my-[10px]">
            <span className="text-3xl lg:text-sm text-[#605959] font-[400]">
              {tableData?.length} result found
            </span>
          </div>
        </>
      )}

      <div className="overflow-x-auto lg:overflow-hidden">
        {loading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            <style>{styles}</style>
            {/* <ReactDragListView.DragColumn {...dragProps}> */}
            <Table
              size="small"
              className="table-responsive"
              bordered
              dataSource={tableData}
              columns={updatedColumns ? updatedColumns : columns}
              components={{
                header: {
                  cell: ResizableTitle,
                },
              }}
              scroll={{ x: true }}
            />
            {/* </ReactDragListView.DragColumn> */}
          </>
        )}
      </div>
    </>
  );
};

export default CompanyList;
