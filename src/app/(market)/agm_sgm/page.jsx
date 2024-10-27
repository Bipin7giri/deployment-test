"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import action from "../_redux/actions";
import { Input, Popover, Skeleton, Table } from "antd";
import Link from "next/link";
const { Search } = Input;

const AgmSgm = () => {
  const dispatch = useDispatch();

  const { loading, agmSgmData } = useSelector((state) => state.market);
  const [agmSgm, setAgmSgm] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(action.getAgmSgm());
  }, []);

  useEffect(() => {
    if (
      agmSgmData !== undefined &&
      agmSgmData !== null &&
      agmSgmData?.data?.length > 0
    ) {
      const newAgmSgmData = agmSgmData?.data
        ?.filter((data) => {
          const symbolMatches = data["symbol"]
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase());
          return symbolMatches !== undefined ? symbolMatches : data;
        })
        ?.map((item, id) => {
          return {
            sno: id + 1,
            symbol: item?.symbol,
            company: item?.companyName,
            sector: item?.sectorName,
            agm: item?.agm,
            date: item?.date,
            venue: item?.venue,
            agenda: item?.agenda,
          };
        });
      setAgmSgm(newAgmSgmData);
    }
  }, [agmSgmData, searchText]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 50,
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
      width: 100,
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
      width: 230,
      sorter: (a, b) => a.company.localeCompare(b.company),
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 130,
      sorter: (a, b) => a.sector.localeCompare(b.sector),
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "AGM",
      dataIndex: "agm",
      key: "agm",
      width: 150,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.agm.localeCompare(b.agm),
      render: (text, record) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (text) => <div className="text-center"> {text}</div>,
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.venue.localeCompare(b.venue),
      render: (text) => <div className="text-center"> {text}</div>,
    },
    {
      title: "Agenda",
      dataIndex: "agenda",
      key: "agenda",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.agenda.localeCompare(b.agenda),
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

  return (
    <>
      <div className=" bg-[#f4f6f9cb] xl:mt-0 lg:mt-0 mt-[160px]">
        <div className="w-full xl:container lg:container py-[20px] px-10 pb-10 mx-auto pl-10">
          <div className="flex justify-end items-center pb-[20px]">
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
                  pagination={true}
                  columns={columns}
                  dataSource={agmSgm}
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

export default AgmSgm;
