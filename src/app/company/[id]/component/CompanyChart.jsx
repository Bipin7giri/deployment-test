import React, { useEffect, useState } from "react";
import { MdOutlineCandlestickChart } from "react-icons/md";
import Nepse from "../../../components/Charts/Nepse";
import CandleStickNepse from "../../../components/Charts/CandleStickNepse";
import { useDispatch, } from "react-redux";
import actions from "../redux/actions";

const CompanyChart = ({ symbol, chartData }) => {
  let companyLineChartData = [];
  for (let i = 0; i < chartData?.length; i++) {
    companyLineChartData.push({
      t: testData[i]?.t,
      c: testData[i]?.c,
    });
  }
  
  const dispatch = useDispatch();
  const [toogleNepseChart, setToggleNpeseChart] = useState(true);
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  const [timeDuration, setTimeDuration] = useState(0);
  useEffect(() => {
    // dispatch(actions.nepseLineChartData({ timeStamp: timestamp }));
  }, []);
  const handleLineChartData = (id) => {
    if (id === 0) {
    }
    if (id === 1) {
      const unixTime = Math.floor(Date.now() / 1000);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const oneWeekAgoTimeStamp = Math.floor(oneWeekAgo.getTime() / 1000);
      //   dispatch(actions.nepseLineChartData({ timeStamp: timestamp }));
      dispatch(
        actions.companyLineChart({
          start: oneWeekAgoTimeStamp,
          end: unixTime,
          symbol: symbol,
        })
      );
    }
    if (id === 2) {
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      const oneMonthAgoTimeStamp = Math.floor(oneMonthAgo.getTime() / 1000);
      dispatch(
        actions.companyLineChart({
          start: oneMonthAgoTimeStamp,
          end: timestamp,
          symbol: symbol,
        })
      );
    }
    if (id === 3) {
      const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      const threeMonthAgoTimeStamp = Math.floor(
        threeMonthsAgo.getTime() / 1000
      );

      dispatch(
        actions.companyLineChart({
          start: threeMonthAgoTimeStamp,
          end: timestamp,
          symbol: symbol,
        })
      );
    }
    if (id === 4) {
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      const oneYearAgoTimeStamp = Math.floor(oneYearAgo.getTime() / 1000);
      dispatch(
        actions.companyLineChart({
          start: oneYearAgoTimeStamp,
          end: timestamp,
          symbol: symbol,
        })
      );
    }
  };
  return (
    <>
      <div className="flex ">
        <div className="flex justify-end z-10 w-full items-center ">
          <div className="bg-[#F4F6F9] p-2 rounded-md ">
            <MdOutlineCandlestickChart
              onClick={() => {
                setToggleNpeseChart(!toogleNepseChart);
              }}
              className="text-gray-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          {toogleNepseChart ? (
            <>
              {/* {nepseLineChartData !== undefined && ( */}
              <Nepse height={300} fontSize={12} data={companyLineChartData} />
              {/* )} */}
            </>
          ) : (
            <>
              <CandleStickNepse
                height={300}
                fontSize={12}
                chartData={chartData}
              />
            </>
          )}
          <div className="flex justify-center gap-5 mt-2 pb-[20px]">
            {["D", "W", "M", "Q", "Y"].map((item, id) => {
              return (
                <>
                  <div>
                    <button
                      onClick={() => {
                        setTimeDuration(id);
                        handleLineChartData(id);
                      }}
                      className={`${
                        timeDuration === id
                          ? "bg-[#3A6FF8] text-secondary  "
                          : "bg-secondary    hover:bg-[#3A6FF8] hover:text-secondary  hover:border-none text-gray-400 border border-black"
                      }  px-4 py-[2px] rounded-xl  text-xs`}
                    >
                      {item}
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyChart;
