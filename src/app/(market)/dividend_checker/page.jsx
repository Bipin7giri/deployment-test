"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import action from "../_redux/actions";
import { Input, Popover, Select, Skeleton, Table } from "antd";
import { formatMoney } from "../../../utils/formatMoney";
import api from "../../../api/axios";
import Link from "next/link";
const { Search } = Input;

const DividendChecker = () => {
  const dispatch = useDispatch();

  const { loading, dividendChecker } = useSelector((state) => state.market);

  const [dividendData, setDividendData] = useState([]);
  const [dividendYear, setDividendYear] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [searchText, setSearchText] = useState("");

  const fetchDividendDistinctDate = async () => {
    try {
      const { data: date } = await api.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/dividendDistinctPeriod`
      );

      setDividendYear(date.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDividendDistinctDate();
  }, []);

  const filteredDividendYear = dividendYear?.filter(
    (item) => item?.year !== "069/2070" && item?.year !== "2079/80"
  );

  filteredDividendYear?.sort((a, b) => {
    const yearA = parseInt(a?.year.split("/")[0]);
    const yearB = parseInt(b?.year.split("/")[0]);

    if (yearA < yearB) return 1;
    if (yearA > yearB) return -1;

    return 0;
  });

  let options = [];
  if (filteredDividendYear !== undefined) {
    filteredDividendYear?.forEach((item) => {
      options.push({
        value: item?.year,
        label: item?.year,
      });
    });
  }

  const handleSelectedValueChange = (selectedOptions) => {
    setSelectedValue(selectedOptions);
  };

  useEffect(() => {
    if (filteredDividendYear?.[0]?.year) {
      dispatch(
        action.getDividendChecker({
          period: selectedValue ? selectedValue : options?.[0]?.value,
        })
      );
    }
  }, [selectedValue, options?.[0]?.value]);

  useEffect(() => {
    if (
      dividendChecker !== undefined &&
      dividendChecker !== null &&
      dividendChecker?.data?.length > 0
    ) {
      const newDividendData = dividendChecker?.data
        ?.filter((data) => {
          const symbolMatches = data["Symbol"]
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase());
          return symbolMatches;
        })
        ?.map((item, id) => {
          return {
            sno: id + 1,
            symbol: item?.Symbol,
            company: item?.Company,
            sector: item?.Sector,
            ltp: item?.LastTradedPrice,
            bonus: item?.BonusDividend,
            cash: item?.CashDividend,
            total: item?.TotalDividend,
            bookClose: item?.BookClose?.split("T")?.[0],
          };
        });
      setDividendData(newDividendData);
    }
  }, [dividendChecker, searchText]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.sno - b.sno,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      width: 300,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content={record?.name}>
                <Link href={`/company/${record.symbol}`}>{record?.symbol}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      width: 300,
      // sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      width: 300,
      sorter: (a, b) => a.sector.localeCompare(b.sector),
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "LTP",
      dataIndex: "ltp",
      key: "ltp",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => {
        return a["ltp"] - b["ltp"];
      },
      render: (text, record) => (
        <div className="text-center">
          <span>{formatMoney(text)}</span>
        </div>
      ),
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      key: "bonus",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.bonus - b.bonus,
      render: (text) => <div className="text-center"> {text}%</div>,
    },
    {
      title: "Cash",
      dataIndex: "cash",
      key: "cash",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.cash - b.cash,
      render: (text) => <div className="text-center"> {text?.toFixed(2)}%</div>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.total - b.total,
      render: (text) => <div className="text-center"> {text?.toFixed(2)}%</div>,
    },
    {
      title: "Book Close",
      dataIndex: "bookClose",
      key: "bookClose",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.bookClose - b.bookClose,
      render: (text) => <div className="text-center"> {text}</div>,
    },
  ];

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

  // search
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const { Option } = Select;
  return (
    <>
      <div className=" bg-[#f4f6f9cb] xl:mt-0 lg:mt-0 mt-[160px]">
        <div className="w-full xl:container lg:container py-[20px] px-10 pb-10 mx-auto pl-10">
          <div className="flex justify-between items-center pb-[20px]">
            <div className="w-full">
              <div className="relative lg:w-[30%] w-[60%] my-[20px]">
                <Select
                  mode="single"
                  size="large"
                  placeholder="Please Select The Period"
                  onChange={handleSelectedValueChange}
                  style={{ width: "100%" }}
                  defaultValue={options?.[0]?.value}
                  value={selectedValue}
                  options={options}
                  className=""
                >
                  {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <style jsx>
                  {`
                    .additional-count {
                      margin-left: 4px;
                      font-weight: 700;
                    }
                  `}
                </style>
              </div>
            </div>
            <div>
              <div className="flex-1 text-right my-[20px]">
                <Search
                  placeholder="Search Stock"
                  value={searchText}
                  onChange={handleSearchTextChange}
                  style={{
                    width: "400px",
                    "@media (min-width: 768px)": {
                      height: "50px",
                      width: "300px",
                    },
                    "@media (min-width: 1024px)": {
                      height: "24px",
                      width: "400px",
                    },
                  }}
                  className="custom-search sm:custom-search-marketLive lg:custom-search"
                />
              </div>
            </div>
          </div>
          <div className="pb-[80px]">
            {loading ? (
              <div className=" pb-10 w-full sm:mx-28 px-8 lg:px-0 lg:mx-auto flex lg:flex-col flex-col gap-5 py-5 justify-between ">
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
                <div className="lg:w-[100%]">
                  <Skeleton active />
                </div>
              </div>
            ) : (
              <>
                <style>{styles}</style>
                <Table
                  size="small"
                  className="table-responsive"
                  pagination={false}
                  columns={columns}
                  dataSource={dividendData}
                  scroll={{ x: true, y: 700 }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DividendChecker;
