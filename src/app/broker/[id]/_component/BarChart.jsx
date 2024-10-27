import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { formatMoney } from "../../../../utils/formatMoney";

const BarChart = ({ topData, type }) => {
  const [chartOption, setChartOption] = useState(null);
  useEffect(() => {
    let BrokerNumber = [];
    let BrokerName = [];
    if (type === "buyer") {
      BrokerNumber = topData.length > 0 ? topData?.map((item) => item?.buyerMemberId) : [];
      BrokerName = topData.length > 0 ? topData?.map((item) => item?.buyerBrokerName) : [];
    } else {
      BrokerNumber = topData.length > 0 ? topData?.map((item) => item?.sellerMemberId) : [];
      BrokerName = topData.length > 0 ? topData?.map((item) => item?.sellerBrokerName) : [];
    }
    const totalAmount = topData?.map((item) => item.totalAmount);
    const units = topData?.map((item) => item.totalQuantity);
    const colors = ["#336699", "#993366", "#669933", "#996633", "#663399"];

    const option = {
      xAxis: {
        type: "category",
        data: BrokerNumber,
        axisLabel: {
          textStyle: {
            color: "#666", // Customize the x-axis label text color
          },
        },
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#666", // Customize the y-axis label text color
            },
          },
          splitLine: {
            show: false, // Hide the horizontal grid lines
          },
        },
        {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#666", // Customize the y-axis label text color
            },
          },
          splitLine: {
            show: false, // Hide the horizontal grid lines
          },
        },
      ],
      grid: {
        containLabel: true, // Make sure the labels are fully displayed
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis", // Display tooltip when hovering over any axis
        axisPointer: {
          type: "shadow", // Display tooltip as a shadow
        },
        formatter: function (params) {
          // Customize the tooltip format
          const dataIndex = params[0].dataIndex;
          const unitValue = units[dataIndex];
          const amountValue = totalAmount[dataIndex];
          return `Broker Number: ${BrokerNumber[dataIndex]}<br>Broker Name: ${BrokerName[dataIndex]}<br>Units: ${unitValue}<br>Total Amount: Rs ${formatMoney(amountValue)}`;
        },
      },
      series: [
        {
          data: totalAmount,
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
          // label: {
          //   show: true,
          //   position: "inside",
          //   rotate: 90, // Rotate the label text by 90 degrees
          //   formatter: function (params) {
          //     // Display the units value
          //     return "Rs " + formatMoney(totalAmount[params.dataIndex]);
          //   },
          //   textStyle: {
          //     color: "#fff", // Set the label text color to white
          //     fontSize: 10, // Customize the data label font size
          //     fontWeight: "bold", // Make the label text bold
          //   },
          // },
        },
      ],
    };
    setChartOption(option);
  }, [topData]);

  return (
    <div style={{ height: "300px" }} className="lg:w-[380px] 2xl:w-[500px]">
      {chartOption && <ReactEcharts option={chartOption} />}
    </div>
  );
};

export default BarChart;
