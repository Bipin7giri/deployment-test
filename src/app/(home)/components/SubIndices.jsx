"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Pagination, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { formatMoney } from "../../../utils/formatMoney";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import MarketTable from "@/app/(market)/_component/MarketTabel";

function SubIndices() {
  const dispatch = useDispatch();
  const {
    marketLiveHomeData,
    isMarketLiveHomeDataLoading,
    limitedLiveDataBySector,
    count,
  } = useSelector((state) => state.home);

  const [subIndicesData, setSubIndicesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const [formattedData, setFormattedData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setSubIndicesData(
      marketLiveHomeData?.subIndices?.map((item) => ({
        ...item,
      }))
    );
  }, [marketLiveHomeData]);

  useEffect(() => {
    dispatch(
      actions.getLimitedLiveDataBySector({
        page,
        sortOrder,
        sectors: [selectedSector],
      })
    );
  }, [selectedSector, page, sortOrder]);

  useEffect(() => {
    setFormattedData(
      limitedLiveDataBySector
        ?.filter((item) => item.lastTradedPrice !== null)
        ?.map((data) => {
          return {
            symbol: data.symbol,
            ltp: `${data.lastTradedPrice}`,
            schange: data?.priceChange,
            pChange: data?.percentageChange * 100,
            previousPrice: data.previousClose,
            weekhigh: data.fiftyTwoWeekHigh,
            weeklow: data.fiftyTwoWeekLow,
            high: data.highPrice,
            low: data.lowPrice,
            open: data.openPrice,
            volume: data.totalTradeQuantity,
            turnover: data.totalTradeValue,
          };
        })
    );
  }, [limitedLiveDataBySector]);

  return (
    <>
      <div className="bg-white py-6 w-full shadow-md px-6 rounded-[20px] lg:h-[450px] h-[600px] overflow-hidden">
        <h3 className="px-1 mb-2 text-gray-900 lg:text-lg text-[32px] font-semibold">
          Sub Indices
        </h3>
        {isMarketLiveHomeDataLoading && <Skeleton paragraph={{ rows: 14 }} />}
        {!isMarketLiveHomeDataLoading && subIndicesData?.length > 0 && (
          <>
            <div
              className="h-[90%] overflow-y-auto lg:block hidden"
              style={{ scrollbarWidth: "thin" }}
            >
              {subIndicesData?.map((item, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setIsModalOpen(true), setSelectedSector(item.sindex);
                    }}
                    className="flex justify-between my-6 px-1 lg:my-4 items-center cursor-pointer"
                  >
                    <div className="flex items-center">
                      <p className="lg:text-[13px] leading-none  text-[30px] font-[500]">
                        {item.sindex}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${
                          item?.perChange > 0
                            ? "text-[#08bf82]"
                            : "text-[#DC2626]"
                        } lg:text-xs text-[28px] font-[500] text-end`}
                      >
                        {item?.perChange}%
                      </p>
                      <p className="text-primary font-[500] lg:text-xs text-[28px]">
                        {formatMoney(item?.currentValue)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-[90%] overflow-y-auto lg:hidden block">
              {subIndicesData?.map((item, id) => {
                return (
                  <div
                    key={id}
                    className="flex justify-between my-6 px-1 lg:my-4 items-center cursor-move"
                  >
                    <div className="flex items-center">
                      <p className="lg:text-[13px] leading-none  text-[28px] font-[500]">
                        {item.sindex}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${
                          item?.perChange > 0
                            ? "text-[#08bf82]"
                            : "text-[#DC2626]"
                        } lg:text-xs text-[28px] font-[500] text-end`}
                      >
                        {item?.perChange}%
                      </p>
                      <p className="text-primary font-[500] lg:text-xs text-[28px]">
                        {formatMoney(item?.currentValue)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Modal
        title={selectedSector}
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width="1200px"
        footer={null}
      >
        <div className="py-4">
          <MarketTable
            data={formattedData}
            isHomePage={true}
            setSortOrder={setSortOrder}
          />
          <Pagination
            onChange={(page) => setPage(page)}
            pageSize={10}
            defaultCurrent={1}
            total={count}
          />
        </div>
      </Modal>
    </>
  );
}

export default SubIndices;
