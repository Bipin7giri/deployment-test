import React from "react";
import ReactEcharts from "echarts-for-react";
const GreedFear = ({ data }) => {
  let earningPerShare;
  for (let i = 0; i < data?.length; i++) {
    if (data[i].name === "Price/Earnings") {
      earningPerShare = data[i]?.ratio_value;
    }
  }
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        radius: "50%",
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.5, "#06C755"],
              [1, "#FD5353"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 10,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "inherit",
          },
        },
        axisTick: {
          length: 2,
          lineStyle: {
            color: "inherit",
            width: 20,
          },
        },
        splitLine: {
          length: 10,
          lineStyle: {
            color: "inherit",
            width: 1,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 0,
          distance: -60,
          rotate: "tangential",
        },
        title: {
          offsetCenter: [0, "15%"],
          fontSize: 12,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [2, "-15%"],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value) + "";
          },
          color: "inherit",
        },
        data: [
          {
            value: earningPerShare || 0,
            name: "PE Ratio",
          },
        ],
      },
    ],
  };
  return (
    <>
    <ReactEcharts  option={option} />
    </>
  );
};

export default GreedFear;
