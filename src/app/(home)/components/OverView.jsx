import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "@/utils/formatMoney";
import { Divider, Skeleton } from "antd";

const OverView = () => {
  const { marketLiveHomeData } = useSelector((state) => state.home);

  return (
    <div
      className="bg-secondary py-6 lg:w-[35%] shadow-md px-6 rounded-[20px] 
        "
    >
      <h4 className="text-primary font-bold text-2xl lg:text-[18px]">
        Turnovers
      </h4>
      <Divider />
      <ul className="flex flex-col gap-5 mt-3">
        {marketLiveHomeData?.marketSummary?.length > 0 ? (
          <>
            {marketLiveHomeData?.marketSummary?.map((item, id) => {
              let formattedValue = item?.ms_value;
              if (formattedValue >= 100000000000) {
                formattedValue =
                  (formattedValue / 100000000000)
                    ?.toFixed(2)
                    ?.toLocaleString("en-AE") + " Kharab";
              } else if (formattedValue >= 1000000000) {
                formattedValue =
                  (formattedValue / 1000000000)
                    ?.toFixed(2)
                    ?.toLocaleString("en-AE") + " Arba";
              } else if (formattedValue >= 10000000) {
                formattedValue =
                  (formattedValue / 10000000)
                    ?.toFixed(2)
                    ?.toLocaleString("en-AE") + " Crore";
              } else {
                formattedValue = formatMoney(formattedValue);
              }

              return (
                <>
                  <li className="flex items-center justify-between">
                    <p
                      className="text-gray-400 text-[28px] lg:text-[14px]
                                         "
                    >
                      {item?.ms_key}
                    </p>
                    <p className="text-[28px] lg:text-[14px] font-semibold  text-primary">
                      {formattedValue}
                    </p>
                  </li>
                  <div className="w-full h-[0.5px] p-0 m-0 bg-gray-300"></div>
                </>
              );
            })}
          </>
        ) : (
          <Skeleton active style={{ width: '100%' }} />
        )}
      </ul>
    </div>
  );
};

export default OverView;
