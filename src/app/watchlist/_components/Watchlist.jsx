"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TiTick } from "react-icons/ti";
import { Modal, message, Popconfirm, Table, Popover } from "antd";
import { Helmet } from "react-helmet";
import portfolioAction from "@/app/(portfolio)//portfolio/_redux/action";
import watchListActions from "../_redux/actions";
import { formatMoney } from "@/utils/formatMoney";
import Link from "next/link";
import AlertButton from "@/app/company/[id]/component/AlertButton";

const Watchlist = () => {
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
    :where(.css-dev-only-do-not-override-12jzuas).ant-popover {
      font-size: 24px;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-modal .ant-modal-close-x {
      font-size: 28px;
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
    :where(.css-dev-only-do-not-override-12jzuas).ant-popover {
      font-size: 14px;
    }
    :where(.css-dev-only-do-not-override-12jzuas).ant-modal .ant-modal-close-x {
      font-size: 16px;
    }
  }  
`;

  const buttonClassName =
    "border-[1px] border-primary flex gap-1 h-[33px]  rounded lg:px-2 lg:py-2 px-2 py-6 text-primary hover:bg-text-primary";

  const [refreshData, setRefreshData] = useState(false);
  const confirm = (id) => {
    dispatch(watchListActions.deleteWatchList(id));
    setRefreshData(!refreshData);
    message.success("Deleted Sucessfully");
  };
  const cancel = (e) => {
    message.error("Didn't deleted");
  };
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companies } = useSelector((state) => state.home);
  const { myWatchList } = useSelector((state) => state.watchList);
  const { currentUser } = useSelector((state) => state.auth);

  let tableData = [];
  if (myWatchList !== undefined) {
    let tempWatchList = [...myWatchList];
    tableData = tempWatchList?.sort((a, b) =>
      a?.symbol.localeCompare(b?.symbol)
    );
  }

  // for active company listed in StockMarket

  useEffect(() => {
    dispatch(portfolioAction.getActiveCompanyName());
  }, []);

  const { activeStockCompany } = useSelector((state) => state.portfolio);

  let options = [];
  if (activeStockCompany?.activeStock !== undefined) {
    options = activeStockCompany?.activeStock?.map((item, id) => {
      return item;
      // { label: item.companyName + " " + `(${item.symbol})`, value: item.symbol }
      // item.companyName + " " + `(${item.symbol})`
    });
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [disabledRows, setDisabledRows] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [sortOption, setSortOption] = useState("symbol"); // Default sorting by symbol

  let tempSearchData = [];

  const addWatchList = (data) => {
    if (!tableData.some((item) => item.symbol === data.symbol)) {
      setSymbol(data?.symbol);
      const watchListData = {
        user_id: currentUser,
        symbol: data?.symbol,
        sector: data?.sectorName,
        name: data?.companyName,
      };
      message.success(`${data?.symbol} has been added to Watchlist!`);
      dispatch(watchListActions.addWatchList(watchListData));
      setRefreshData(!refreshData);
      setDisabledRows([...disabledRows, data.symbol]);
    } else {
      message.error(`${data?.symbol} has already been added to Watchlist!`);
    }
  };

  const alreadyAdded = (data) => {
    message.error(` ${data?.symbol} has been already added to Watchlist!`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    companies?.map((companyData) => {
      tempSearchData.push(companyData);
    });
    setSearchData([...tempSearchData]);
  }, [companies, symbol]);
  //  table Data
  const columns = [
    // {
    //   title: "S.No",
    //   dataIndex: "sno",
    //   key: "sno",
    //   fixed: "right",
    //   responsive: ["md"],
    //   style: { fontSize: "76px" },
    //   width: 100,
    //   render: (text) => <div className="text-center">{text}</div>,
    // },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      fixed: "right",
      responsive: ["md"],
      style: { fontSize: "76px" },
      width: 100,
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
      title: "LTP",
      dataIndex: "ltp",
      key: "ltp",
      width: 200,
      responsive: ["md"],
      style: { fontSize: "76px" },
      render: (text) => (
        <div className="text-center">Rs. {formatMoney(text)}</div>
      ),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      render: (text, record) => (
        <div
          className={`font-semibold ${
            record?.change > 0
              ? "text-green-700"
              : record?.schange === 0
              ? "text-info"
              : "text-danger"
          } text-center`}
        >
          Rs. {formatMoney(text)}
        </div>
      ),
    },
    {
      title: "Previous Close",
      dataIndex: "previousPrice",
      key: "previousPrice",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      render: (text) => (
        <div className="text-center">Rs. {formatMoney(text)}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "previousPrice",
      key: "previousPrice",
      width: 100,
      responsive: ["md"],
      style: { fontSize: "76px" },
      render: (text, record) => {
        return (
          <>
            <div className="flex justify-center items-center gap-4">
              <Popconfirm
                title="Delete the stock"
                description={`Are you sure to delete ${record?.symbol}?`}
                onConfirm={() => {
                  confirm(record.id);
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button>
                  <svg
                    className="cursor-pointer lg:w-4 lg:h-4 w-7 h-7"
                    viewBox="0 0 12 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.857143 13.3333C0.857143 14.25 1.62857 15 2.57143 15H9.42857C10.3714 15 11.1429 14.25 11.1429 13.3333V3.33333H0.857143V13.3333ZM12 0.833333H9L8.14286 0H3.85714L3 0.833333H0V2.5H12V0.833333Z"
                      fill="#E61616"
                    />
                  </svg>
                </button>
              </Popconfirm>
              {/* <AlertButton
                symbol={record?.symbol}
                buttonClassName={buttonClassName}
              /> */}
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      dispatch(watchListActions.getWatchList({ user_id: currentUser }));
    }, 1000);
  }, [refreshData, currentUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Watchlist | Saral Lagani</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta
          property="og:title"
          content="Keep An Eye On Your Favorite Stock"
        />
        <meta
          property="og:description"
          content="A watchlist that help you keep track of the stock from NEPSE that you want. It help you to find your stock quickly and easily"
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>

      <div className="lg:container   lg:w-full mt-40 lg:px-10 lg:mx-auto px-8  py-5  lg:min-h-[80vh] lg:mt-0  mx-auto">
        <div className="flex justify-between w-full items-center">
          <div>
            <h3
              style={{ fontFamily: "Poppins" }}
              className="lg:text-[18px] text-4xl font-[600]"
            >
              WatchList
            </h3>
          </div>
          <div>
            <div>
              <button
                onClick={showModal}
                className=" bg-gray-900 text-3xl lg:text-sm  duration-200 transition ease-in-out delay-150  
         text-secondary  lg:p-[8px] rounded-lg p-[14px]  font-poppins ho"
              >
                <span className="font-semibold  text-md px-1"> +</span> Add New
                Stock
              </button>
              <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                width={800}
                footer={[]}
              >
                <div className="py-8  h-[60vh] lg:max-h-[460px] overflow-hidden">
                  <div className="flex justify-center">
                    <div className="items-center xl:w-[85%] w-[90%] mt-3  py-1 px-2 bg-secondary    rounded-md border  border-gray-300 mb-[15px]">
                      <input
                        className="lg:text-[14px] text-2xl p-2 lg:p-0 w-full  text-gray-700 rounded-full focus:outline-none"
                        type="text"
                        placeholder="Stock You Want in Watchlist"
                        value={searchText}
                        onChange={handleSearchTextChange}
                      />
                    </div>
                  </div>
                  <div className="lg:px-10 px-4">
                    <ul className="lg:h-[40vh] h-[60vh] px-5 overflow-y-auto">
                      {options.length > 0 &&
                        options
                          ?.filter(
                            (data) =>
                              data.symbol
                                ?.toLowerCase()
                                ?.includes(searchText.toLowerCase()) ||
                              data.companyName
                                ?.toLowerCase()
                                ?.includes(searchText.toLowerCase())
                          )
                          ?.sort((a, b) => {
                            // Compare the sortOption value to determine the sorting logic
                            if (sortOption === "symbol") {
                              return a?.symbol.localeCompare(b?.symbol); // Sort by symbol
                            } else if (sortOption === "companyName") {
                              return a?.companyName?.localeCompare(
                                b?.companyName
                              ); // Sort by company name
                            }
                          })
                          ?.map((data) => {
                            const isDisabled = myWatchList?.some(
                              (item) => item?.symbol === data?.symbol
                            );
                            return (
                              <li className="py-4" key={data.symbol}>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span
                                      className="font-semibold text-black text-2xl lg:text-[14px] cursor-pointer"
                                      onClick={() => {
                                        addWatchList(data);
                                      }}
                                    >
                                      {data.symbol}
                                    </span>
                                  </div>
                                  <div className="px-8 ">
                                    <span
                                      className="text-[#464F60]  text-2xl lg:text-[14px] cursor-pointer"
                                      onClick={() => {
                                        addWatchList(data);
                                      }}
                                    >
                                      {data.companyName}
                                    </span>
                                  </div>
                                  <div>
                                    {isDisabled ? (
                                      <span
                                        className="font-bold flex justify-end cursor-pointer text-xl"
                                        onClick={() => {
                                          alreadyAdded(data);
                                        }}
                                      >
                                        <TiTick
                                          // size={20}
                                          className="p-[5px]  text-4xl lg:text-lg text-[#fff] bg-success-2 rounded-3xl"
                                        />
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() => {
                                          addWatchList(data);
                                        }}
                                        className="font-bold cursor-pointer text-4xl lg:text-lg "
                                      >
                                        +
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                    </ul>
                  </div>
                </div>
              </Modal>
            </div>
            {/* <AddWatchListModal setRefreshData={setRefreshData} /> */}
          </div>
        </div>
        <div className="my-10">
          {myWatchList?.length > 0 && (
            <>
              <style>{styles}</style>
              <Table
                pagination={true}
                className="table-responsive"
                columns={columns}
                dataSource={tableData}
                scroll={{ x: true }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
