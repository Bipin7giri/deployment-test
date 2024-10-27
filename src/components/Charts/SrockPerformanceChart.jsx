import React from "react";
import ReactEcharts from "echarts-for-react";

const StockPerformanceChart = ({ chartData, height, fontSize }) => {
  const months = chartData?.inflation?.inflation?.map((item) => item?.month); // Extract months from interest data
  const years = chartData?.inflation?.inflation?.map((item) => item?.year); // Extract years from interest data
  const xAxisData = months?.map((month, index) => `${years[index]}-${month}`);
  const option = {
    textStyle: {
      fontSize: fontSize,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Interest", "Inflation"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData, // Update with dynamically generated dates
      axisLabel: {
        textStyle: {
          fontSize: fontSize,
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: fontSize,
        },
      },
    },
    series: [
      {
        name: "Interest",
        type: "line",
        smooth: true,
        data: chartData?.interest?.interest?.map(
          (item) => item.average_interest_on_credit
        ), // update with the interest data
      },
      {
        name: "Inflation",
        type: "line",
        smooth: true,
        data: chartData?.inflation?.inflation?.map((item) => item?.inflation), // update with the inflation data
      },
    ],
  };
  return (
    <div>
      <ReactEcharts
        style={{ height: height, width: "100%", marginRight: 40 }}
        option={option}
      />
    </div>
  );
};

export default StockPerformanceChart;
