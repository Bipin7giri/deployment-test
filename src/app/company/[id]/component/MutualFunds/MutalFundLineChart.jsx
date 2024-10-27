import React from "react";
import ReactEcharts from "echarts-for-react";

const MutualFundLineChart = ({ data, title }) => {
  // Extracting the necessary data for the chart
  const xAxisData = title && data?.length > 0 ? data?.map(item => item?.period) : data?.length > 0 && data?.map(item => item?.period);
  const seriesData = title && data?.length > 0 ?
    data?.map((item) => (item?.units !== null) ? item?.units : '-')
    : data?.length > 0 && data?.map((item) => (item?.svalue !== null ? item?.svalue : '-')); // Replace null with '-'

  let option = {
    // title: {
    //   text: title ? '' : "Net Assets Value (NAV)", // Chart title
    //   left: "left", // Title position
    // },
    xAxis: {
      type: 'category',
      data: xAxisData, // Using the extracted period data for X-axis
      splitLine: {
        show: false, // Hide the x-axis background grid lines
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false, // Hide the x-axis background grid lines
      },
    },
    tooltip: {
      trigger: "axis", // Display tooltip when hovering over data points
      formatter: (params) => {
        if (title) {
          // Format the tooltip content with symbol and units if title is provided
          const item = params[0];
          const period = item?.axisValue;
          const units = item?.data;
          return `Year ${period} : ${units} units`;
        } else {
          // Otherwise, format it with the default content
          return `Year ${params[0]?.axisValue} : Rs. ${params[0]?.data}.`;
        }
      },
    },
    series: [
      {
        data: seriesData, // Using the extracted svalue data for Y-axis
        type: 'line',
        smooth: true,
        name: data ? '' : 'Net Assets Value (NAV Rs.)', // Name for the series
        symbol: 'circle', // Symbol for data points (optional, you can choose other symbols as well)
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default MutualFundLineChart;

