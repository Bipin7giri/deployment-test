import React from "react";
import ReactEcharts from "echarts-for-react";

const BreakDownChart = ({ lineData, isPercent }) => {
  const getTooltipFormatter = (isPercent) => {
    return (params) => {
      const year = params[0]?.axisValue;
      const data = params.map(
        (param) => param.data.toString() + (isPercent ? " %" : "")
      );
      // Customize the tooltip content based on your data structure
      const tooltipContent = `${year}<br/>${data.join("<br/>")}`;
      return tooltipContent;
    };
  };

  let formattedData = lineData?.datas?.map((item) => (item * 1)?.toFixed(2));
  const option = {
    xAxis: {
      type: "category",
      data: lineData?.years,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      formatter: getTooltipFormatter(isPercent),
    },
    series: [
      {
        data: formattedData,
        type: "line",
        smooth: true,
        lineStyle: {
          color: "black",
          type: "smooth", // Set the line type to dotted
        },
        symbol: "circle", // Set the symbol to circle
        symbolSize: 7, // Adjust the size of the dots
        itemStyle: {
          color: "black",
        },
        markPoint: {
          symbol: "circle", // Set the symbol to circle
          symbolSize: 6, // Adjust the size of the dots
          label: {
            show: false,
          },
          data: [
            {
              type: "max",
              name: "Max",
            },
            {
              type: "min",
              name: "Min",
            },
          ],
        },
      },
    ],
    grid: {
      containLabel: true,
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "8%",
    },
    yAxis3D: {
      type: "category",
    },
    xAxis3D: {
      type: "category",
    },
    zAxis3D: {
      type: "value",
    },
    grid3D: {
      viewControl: {
        // Adjust the distance and angles for the 3D view
        distance: 100,
        alpha: 30,
        beta: 20,
      },
    },
  };

  return (
    <>
      <div>
        <ReactEcharts
          style={{ height: "240px", width: "100%" }}
          option={option}
        />
      </div>
    </>
  );
};

export default BreakDownChart;
