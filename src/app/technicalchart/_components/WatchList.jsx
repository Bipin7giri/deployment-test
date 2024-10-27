"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import watchListActions from "@/app/watchlist/_redux/actions";
import { Skeleton } from "antd";
import { Modal, message, Popconfirm, Table, Popover } from "antd";
import portfolioAction from "@/app/(portfolio)/portfolio/_redux/action";
import { TiTick } from "react-icons/ti";
import { formatMoney } from "@/utils/formatMoney";
import { useRouter } from "next/navigation";
function WatchList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const { activeStockCompany } = useSelector((state) => state.portfolio);
  const { loading, myWatchList } = useSelector((state) => state.watchList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [symbol, setSymbol] = useState("");
  const [disabledRows, setDisabledRows] = useState([]);
  const [sortOption, setSortOption] = useState("symbol"); // Default sorting by symbol
  const [refreshData, setRefreshData] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  let tableData = [];
  if (myWatchList !== undefined) {
    let tempWatchList = [...myWatchList];
    tableData = tempWatchList?.sort((a, b) =>
      a?.symbol.localeCompare(b?.symbol)
    );
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(watchListActions.getWatchList({ user_id: currentUser }));
    }, 1000);
  }, [refreshData, currentUser]);

  const handleSymbolClick = (symbol) => {
    router.push(`/technicalchart?symbol=${symbol}`);
  };
  useEffect(() => {
    dispatch(portfolioAction.getActiveCompanyName());
  }, []);
  let options = [];
  if (activeStockCompany?.activeStock !== undefined) {
    options = activeStockCompany?.activeStock?.map((item, id) => {
      return item;
      // { label: item.companyName + " " + `(${item.symbol})`, value: item.symbol }
      // item.companyName + " " + `(${item.symbol})`
    });
  }

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

  return (
    <>
      {isLoggedIn ? (
        <div className="bg-[#fff] sm:mb-[32px] mb-[16px] xl:px-[10px] sm:px-[30px] py-[10px] rounded-[20px]">
          <div className="flex justify-between py-[10px] px-[16px]">
            <h4 className="font-[600] capitalize lg:text-[18px] text-[28px]">
              Watch List
            </h4>
            <div>
              <svg
                onClick={() => showModal()}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_986_2050)">
                  <path
                    d="M16.9284 11.1441H12.8569V7.07268C12.8569 6.95483 12.7605 6.8584 12.6426 6.8584H11.3569C11.2391 6.8584 11.1426 6.95483 11.1426 7.07268V11.1441H7.07122C6.95336 11.1441 6.85693 11.2405 6.85693 11.3584V12.6441C6.85693 12.762 6.95336 12.8584 7.07122 12.8584H11.1426V16.9298C11.1426 17.0477 11.2391 17.1441 11.3569 17.1441H12.6426C12.7605 17.1441 12.8569 17.0477 12.8569 16.9298V12.8584H16.9284C17.0462 12.8584 17.1427 12.762 17.1427 12.6441V11.3584C17.1427 11.2405 17.0462 11.1441 16.9284 11.1441Z"
                    fill="black"
                    fill-opacity="0.85"
                  />
                  <path
                    d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM12 21.9643C6.49821 21.9643 2.03571 17.5018 2.03571 12C2.03571 6.49821 6.49821 2.03571 12 2.03571C17.5018 2.03571 21.9643 6.49821 21.9643 12C21.9643 17.5018 17.5018 21.9643 12 21.9643Z"
                    fill="black"
                    fill-opacity="0.85"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_986_2050">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div>
            <table className="table w-[100%] mt-[6px]">
              <thead>
                <tr>
                  <th className="px-2 lg:text-[12px] text-[24px] py-2">
                    Symbol
                  </th>
                  <th className="px-2 lg:text-[12px] text-[24px] py-2">LTP</th>
                  <th className="px-2 lg:text-[12px] text-[24px] py-2">
                    Change
                  </th>
                  <th className="px-2 lg:text-[12px] text-[24px] py-2">
                    Previous Close
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Skeleton />
                ) : tableData?.length > 0 ? (
                  <>
                    {tableData?.map((item, id) => (
                      <tr
                        className={
                          (id + 1) % 2 === 0
                            ? "text-center text-[24px] lg:text-sm"
                            : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td
                          className="text-center py-2 hover:cursor-pointer hover:underline hover:text-info"
                          onClick={() => {
                            handleSymbolClick(item?.symbol);
                          }}
                        >
                          {item?.symbol}
                        </td>
                        <td className="px-4 py-2">
                          Rs.{formatMoney(item?.ltp)}
                        </td>
                        <td
                          className={`px-4 py-2 ${item?.change > 0
                            ? "text-success"
                            : item?.change < 0
                              ? "text-danger"
                              : "text-info"
                            }`}
                        >
                          Rs.{formatMoney(item?.change)}
                        </td>
                        <td className="px-4 py-2">
                          Rs.{formatMoney(item?.previousPrice)}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr className="text-center">
                    <td colSpan="3">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* modal for adding the watchlist */}
          <div>
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
                {/* items */}
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
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-center text-xl">Watchlist</h1>
          <table className="table w-[100%] mt-[6px]">
            <thead>
              <tr>
                <th className="px-2 lg:text-[12px] text-[24px] py-2">Symbol</th>
                <th className="px-2 lg:text-[12px] text-[24px] py-2">LTP</th>
                <th className="px-2 lg:text-[12px] text-[24px] py-2">Chnage</th>
                <th className="px-2 lg:text-[12px] text-[24px] py-2">
                  Previous Close
                </th>
              </tr>
            </thead>
          </table>
          <button
            className=" w-[100px] rounded-md shadow-md  bg-green-400 py-1 px-3 font-medium text-[18px] text-center mt-10 "
            onClick={() => router.push("/login")}
          >
            {" "}
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default WatchList;
