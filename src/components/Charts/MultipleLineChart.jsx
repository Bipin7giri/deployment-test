import React from "react";
import ReactEcharts from "echarts-for-react";

const MultipleLineChart = ({ chartData, title }) => {
  const xAxisData = chartData[0]?.data?.data?.map((item) => item?.year); // Extract months from interest data
  const option = {
    tooltip: {
      trigger: "axis",
    },
    // title: {
    //   text: `${title.titleOne} and ${title.titleTwo}`,
    // },
    legend: {
      data: [title.titleTwo, title.titleOne],
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
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: title.titleOne,
        type: "line",
        smooth: true,
        data: chartData[0]?.data?.data?.map((item) => item?.value), // update with the interest data
      },
      {
        name: title.titleTwo,
        type: "line",
        smooth: true,
        data: chartData[1]?.data?.data?.map((item) => item?.value), // update with the inflation data
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default MultipleLineChart;
