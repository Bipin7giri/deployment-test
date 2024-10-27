import React from "react";
import { formatMoney } from "../../../utils/formatMoney";

export default function HomeBrokerInfo({ data }) {
  return (
    <>
      {data?.length > 0 ? (
        data?.slice(0, 2)?.map((item, id) => {
          let memberId = item?.sellerBrokerName
            ? item?.sellerMemberId
            : item?.buyerMemberId;
          return (
            <>
              <div className="lg:px-5 px-10 lg:mt-0 mt-[10px] flex gap-3 items-start">
                <div className="w-[10%]">
                  <img
                    className="lg:w-10 lg:h-10 w-24 h-24 rounded-full object-cover"
                    src={`https://peridotnepal.xyz/broker_logo/${parseInt(
                      memberId
                    )}.webp`}
                    alt={
                      item?.sellerBrokerName
                        ? item?.sellerBrokerName
                        : item?.buyerBrokerName
                    }
                  />
                </div>
                <div className="w-[90%]">
                  <h4 className="text-[26px] lg:text-[16px] uppercase font-[600]">
                    {item?.sellerBrokerName
                      ? item?.sellerBrokerName
                      : item?.buyerBrokerName}
                  </h4>
                  <div className="grid py-2 text-3xl lg:text-sm grid-cols-3 lg:mb-[20px] mb-[50px]">
                    <div className="flex flex-col">
                      <span>Member Id:</span>
                      <span className="font-[500]">
                        {item?.sellerBrokerName
                          ? item?.sellerMemberId
                          : item?.buyerMemberId}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>Total Amount:</span>
                      <span className="font-[500]">
                        {item?.sellerBrokerName
                          ? formatMoney(item?.totalAmount?.toFixed(2))
                          : formatMoney(item?.totalAmount?.toFixed(2))}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>Total Quantity: </span>
                      <span className="font-[500]">
                        {item?.sellerBrokerName
                          ? formatMoney(item?.totalQuantity?.toFixed(2))
                          : formatMoney(item?.totalQuantity?.toFixed(2))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div className="text-[26px] lg:text-[16px] capitalize italic font-[600] text-center">
          No Data Found
        </div>
      )}
    </>
  );
}
