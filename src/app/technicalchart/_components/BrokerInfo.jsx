"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../broker/[id]/_redux/action";

import { setBrokerChooseSymbol } from "../../broker/[id]/_redux/brokerSlice";
import comingSoon from "@/assets/img/comingSoon.png";
import { formatMoney } from "@/utils/formatMoney";
import { disabledCompanies } from "@/utils/disableCompanies";
import TableLoader from "@/components/TableLoader";
import { useParams } from "next/navigation";
const BrokerTable = ({
  title,
  brokerData,
  loading,
  choosedTechnicalSymbol,
}) => (
  <div className="bg-[#fff] sm:mb-[32px] mb-[16px] xl:px-[10px] sm:px-[30px] py-[10px] rounded-[20px]">
    <div className="flex justify-between py-[10px] px-[16px]">
      <h4 className="font-[600] capitalize lg:text-[18px] text-[28px]">
        {title}
      </h4>
    </div>
    <div>
      <table className="table w-[100%] mt-[6px]">
        <thead>
          <tr>
            <th className="px-2 lg:text-[12px] text-[24px] py-2">Broker No</th>
            <th className="px-2 lg:text-[12px] text-[24px] py-2">
              Contract Quantity
            </th>
            <th className="px-2 lg:text-[12px] text-[24px] py-2">
              Contract Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {choosedTechnicalSymbol === "1" ? (
            <>
              {brokerData?.data?.length > 0 ? (
                <>
                  {brokerData?.data
                    ?.slice(0, 5)
                    ?.sort((a, b) => b.contractQuantity - a.contractQuantity)
                    ?.map((item, id) => (
                      <tr
                        className={
                          (id + 1) % 2 === 0
                            ? "text-center text-[24px] lg:text-sm"
                            : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td className="text-center py-2">
                          {item?.buyerMemberId || item?.sellerMemberId}
                        </td>
                        <td className="px-4 py-2">
                          {formatMoney(item?.contractQuantity)}
                        </td>
                        <td className="px-4 py-2 text-GreenSuccess">
                          {formatMoney(item?.contractAmount)}
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <tr className="text-center">
                  <td colSpan="3">No data available</td>
                </tr>
              )}
            </>
          ) : (
            <>
              {brokerData?.length > 0 ? (
                <>
                  {brokerData
                    ?.slice(0, 5)
                    ?.sort((a, b) => b.contractQuantity - a.contractQuantity)
                    ?.map((item, id) => (
                      <tr
                        className={
                          (id + 1) % 2 === 0
                            ? "text-center text-[24px] lg:text-sm"
                            : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                        }
                        key={item.id}
                      >
                        <td className="text-center py-2">
                          {item?.buyerMemberId || item?.sellerMemberId}
                        </td>
                        <td className="px-4 py-2">
                          {formatMoney(item?.contractQuantity)}
                        </td>
                        <td className="px-4 py-2 text-GreenSuccess">
                          {formatMoney(item?.totalAmount)}
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <tr className="text-center">
                  <td colSpan="3">No data available</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const BrokerInfo = () => {
  const dispatch = useDispatch();
  let { symbol } = useParams();
  const {
    topSellingBroker,
    topBuyingBrokers,
    loading,
    brokerBreakDownTopFiveSymbol,
    brokerChooseSymbol,
  } = useSelector((state) => state.broker);
  const {
    choosedTechnicalSymbol,
    previousTechnicalSymbol,
    choosedTechnicalSector,
  } = useSelector((state) => state.market);

  useEffect(() => {
    if (brokerChooseSymbol !== choosedTechnicalSymbol) {
      if (choosedTechnicalSymbol === "1") {
        if (
          topSellingBroker !== undefined &&
          topSellingBroker !== null &&
          topBuyingBrokers !== undefined &&
          topBuyingBrokers !== null
        ) {
          if (
            topSellingBroker?.length === 0 &&
            topBuyingBrokers?.length === 0
          ) {
            dispatch(actions.getTopSellingBrokerName());
            dispatch(actions.getTopBuyingBrokerName());
          }
        }
      } else {
        dispatch(
          actions.getBrokerBreakDownTopFiveSymbol({
            companySymbol: choosedTechnicalSymbol
              ? choosedTechnicalSymbol
              : symbol,
          })
        );
      }
    }
  }, [choosedTechnicalSymbol, symbol]);

  useEffect(() => {
    dispatch(
      setBrokerChooseSymbol(
        choosedTechnicalSymbol ? choosedTechnicalSymbol : symbol
      )
    );
  }, [symbol]);

  return (
    <>
      {loading && (
        <div className="w-full">
          {" "}
          <TableLoader />{" "}
        </div>
      )}
      {disabledCompanies.includes(symbol) ? (
        <>
          <div className="mt-[100px] text-center">
            <img src={comingSoon} alt="coming soon" />
            <h1 className="text-[20px] font-[500]">Coming Soon..!</h1>
          </div>
        </>
      ) : (
        <>
          <BrokerTable
            title="Top Buyers"
            brokerData={
              choosedTechnicalSymbol === "1"
                ? topSellingBroker
                : brokerBreakDownTopFiveSymbol?.data?.topBuyer
            }
            loading={loading}
            choosedTechnicalSymbol={choosedTechnicalSymbol}
          />
          <BrokerTable
            title="Top Sellers"
            brokerData={
              choosedTechnicalSymbol === "1"
                ? topSellingBroker
                : brokerBreakDownTopFiveSymbol?.data?.topseller
            }
            loading={loading}
            choosedTechnicalSymbol={choosedTechnicalSymbol}
          />
        </>
      )}
    </>
  );
};

export default BrokerInfo;
