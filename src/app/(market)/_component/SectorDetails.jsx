"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { formatMoney } from "../../../utils/formatMoney";
import Link from "next/link";

const SectorDetails = ({ fromWhere, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e, record) => {
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalFooter = <div className="sell-button"></div>;

  return (
    <div>
      <span>
        <a className="xl:text-xs 2xl:text-sm" onClick={(e) => handleClick(e)}>
          View More
        </a>
      </span>
      <Modal
        title={fromWhere}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="820px"
        footer={modalFooter}
        className=" capitalize"
      >
        <div className="pb-[40px]">
          {fromWhere === "gainers" ? (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="table w-[100%] table-fixed">
                  <thead className="sticky top-0 bg-[#fff]">
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      <>
                        {[...data]
                          ?.sort((a, b) => b.schange - a.schange)
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.schange)} (
                                    {item?.percentageChange}%)
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : fromWhere === "loosers" ? (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="table w-[100%] table-fixed">
                  <thead className="sticky top-0 bg-[#fff]">
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      <>
                        {[...data]
                          ?.sort((a, b) => a.schange - b.schange)
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.schange)} (
                                    {item?.percentageChange}%)
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : fromWhere === "turnover" ? (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="table w-[100%] table-fixed">
                  <thead className="sticky top-0 bg-[#fff]">
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Turnover
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      <>
                        {[...data]
                          ?.sort(
                            (a, b) => b.totalTradeValue - a.totalTradeValue
                          )
                          ?.map((item, id) => {
                            return (
                              <tr
                                className={
                                  (id + 1) % 2 === 0
                                    ? "text-center text-[24px] lg:text-sm"
                                    : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                }
                                key={item.id}
                              >
                                <td className="text-center py-2">
                                  <Link
                                    href={`/company/${item?.symbol}`}
                                    className="hover:text-BlueInfo"
                                  >
                                    {item?.symbol}
                                  </Link>
                                </td>
                                <td className=" px-4 py-2 ">
                                  {formatMoney(item?.lastTradedPrice)}
                                </td>
                                <td className=" px-4 py-2 text-GreenSuccess">
                                  {formatMoney(item?.totalTradeValue)}
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="table w-[100%] table-fixed">
                  <thead className="sticky top-0 bg-[#fff]">
                    <tr>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        SYMBOL
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        LTP
                      </th>
                      <th className="px-4 lg:text-sm text-[24px] text-gray-400 py-2">
                        Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      <>
                        {[...data]
                          ?.sort(
                            (a, b) =>
                              b.totalTradeQuantity - a.totalTradeQuantity
                          )
                          ?.map((item, id) => {
                            return (
                              <>
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.lastTradedPrice)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.totalTradeQuantity)}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SectorDetails;
