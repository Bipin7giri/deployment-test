import React from "react";
import ReactEcharts from "echarts-for-react";
import { formatMoney } from "../../../../utils/formatMoney";

const MutalFundBarChart = ({ title, data }) => {
  // Extracting the necessary data for the chart
  const xAxisData = data?.map((item) => item?.invested_symbol);
  const yAxisData = data?.map((item) => item?.total);
  const colors = ["#336699", "#993366", "#669933", "#996633", "#663399"];

  let option = {
    title: {
      text: title,
      left: "left",
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis", // Show tooltip when hovering over bars
      axisPointer: {
        type: "shadow", // Display shadow for better visibility
      },
      formatter: "{b} :  Rs.{c}", // Format tooltip content to show invested_symbol and total
    },
    series: [
        {
            data: yAxisData,
            type: "bar",
            barWidth: "40%", // Adjust the width of the bars
            itemStyle: {
                color: function (params) {
                    // Assign the same colors to each bar based on the index
                    return colors[params.dataIndex % colors.length];
                },
                emphasis: {
                    color: "#3399CC", // Customize the bar color on hover
                },
            },
            label: {
                show: true,
                position: "inside",
                rotate: 90, // Rotate the label text by 90 degrees
                formatter: function (params) {
                    // Display the units value
                    return "Rs " + formatMoney(yAxisData[params.dataIndex]);
                },
                textStyle: {
                    color: "#fff", // Set the label text color to white
                    fontSize: 10, // Customize the data label font size
                    fontWeight: "bold", // Make the label text bold
                },
            },
        },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default MutalFundBarChart;
