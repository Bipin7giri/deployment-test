"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import marketActions from "../_redux/actions";
import { Pagination, Popover, Skeleton, Table } from "antd";
import { formatMoney } from "../../../utils/formatMoney";
import { Helmet } from "react-helmet";
import Link from "next/link";
const pageSize = 10;

const Floorsheet = () => {
  const dispatch = useDispatch();
  const { floorsheetData, loading } = useSelector((state) => state.market);
  const [currentPage, setCurrentPage] = useState(1);

  let floorSheetData = [];
  let cPage;
  let iPerPage;
  let tPageSize;

  if (floorsheetData?.floorsheet !== undefined) {
    let data = { ...floorsheetData?.floorsheet?.pagination };
    cPage = data?.currentPage;
    iPerPage = data?.itemPerPage;
    tPageSize = data?.totalPageSize;

    floorSheetData = floorsheetData?.floorsheet?.dataList.map((item, id) => {
      return {
        key: id + 1,
        sno: id + 1,
        symbol: item.symbol,
        buyerMemberId: item.buyerMemberId,
        sellerMemberId: item.sellerMemberId,
        contractQuantity: item?.contractQuantity,
        contractRate: item?.contractRate,
        contractAmount: item.contractAmount,
      };
    });
  }

  useEffect(() => {
    dispatch({
      type: marketActions.GET_FLOORSHEET_DATA,
      payload: { page: currentPage, pageSize: pageSize },
    });
  }, [cPage, iPerPage, currentPage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const columns = [
    // {
    //   title: "S.No",
    //   dataIndex: "sno",
    //   key: "sno",
    //   fixed: "right",
    //   style: { fontSize: "76px" },
    //   fixed: "left",
    //   // sorter: (a, b) => a.sno - b.sno,
    //   render: (text, record, index) => <div className="text-center">{record.sno}</div>,
    // },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      style: { fontSize: "76px" },
      fixed: "left",
      sorter: (a, b) => a.symbol - b.symbol,
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
      title: "Buyer",
      dataIndex: "buyerMemberId",
      key: "buyerMemberId",
      style: { fontSize: "76px" },
      sorter: (a, b) => a.buyerMemberId - b.buyerMemberId,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Seller",
      dataIndex: "sellerMemberId",
      key: "sellerMemberId",
      style: { fontSize: "76px" },
      sorter: (a, b) => a.sellerMemberId - b.sellerMemberId,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "contractQuantity",
      key: "contractQuantity",
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractQuantity - b.contractQuantity,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Rate (Rs)",
      dataIndex: "contractRate",
      key: "contractRate",
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractRate - b.contractRate,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Amount (RS)",
      dataIndex: "contractAmount",
      key: "contractAmount",
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractAmount - b.contractAmount,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        {/* <meta property="og:image" content=https://peridotnepal.xyz/company_logo/sarallagani.webp /> */}
        <meta
          property="og:title"
          content="Check The Floorsheet Of The Latest Transaction In NEPSE"
        />
        <meta
          property="og:description"
          content="Check The Detail Transaction of each and every stock in NEPSE. Check The Quantity, Seller Broker, Buyer Broker, Quantity Rate and More"
        />
        <title>Floorsheet | Saral Lagani</title>
      </Helmet>
      <div className="lg:px-48 px:[100px] lg:py-12 pt-[250px]">
        <div className="bg-[#F4F6F9]">
          {loading ? (
            <div className=" w-full  sm:mx-28  px-8 lg:px-0  lg:mx-auto  flex lg:flex-col flex-col gap-5  py-5  justify-between ">
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
            <div className="px-[26px] lg:px-[0px] py-[40px] lg:py-[0px]">
              <style>{styles}</style>
              <Table
                size="small"
                className="table-responsive"
                dataSource={floorSheetData}
                columns={columns}
                loading={loading}
                pagination={false}
              />
              <div className="custom-pagination">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={tPageSize}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Floorsheet;
