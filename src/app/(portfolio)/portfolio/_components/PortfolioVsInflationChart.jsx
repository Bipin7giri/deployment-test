"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";

const PortfolioVsInflationChart = ({ data, height }) => {
  const xAxisData = data?.map((item) => {
    const date = new Date(item.date);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  });

  const option = {
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    legend: {},
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100000,
      },
      {
        start: 0,
        end: 100000, // Adjust this value for a more appropriate zoom range
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const date = new Date(params[0].name);
        const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
        const otherValue = params[0].value;
        const nepseValue = params[1].value;

        return `${formattedDate}<br />Difference: ${otherValue}<br />Inflation: ${nepseValue}`;
      },
    },
    series: [
      {
        name: "Difference",
        type: "line",
        smooth: true,
        data: data?.map((item) => item.difference),
      },
      {
        name: "Inflation",
        type: "line",
        smooth: true,
        data: data?.map((item) => item.inflation),
      },
    ],
  };

  return (
    <div>
      <ReactEcharts
        style={{ height: height, width: "100%", marginRight: 40 }}
        option={option}
        key={JSON.stringify(option)}
      />
    </div>
  );
};

export default PortfolioVsInflationChart;
