import React from "react";
import ReactEcharts from "echarts-for-react";

const MutualFundPieChart = ({ title, data }) => {
  // Extracting the necessary data for the chart
  let pieChartData;
  if (title === "Preffered Companies") {
    pieChartData = data?.map((item) => ({
      value: item?.total,
      name: item?.invested_symbol,
    }));
  } else if (title === "Top Holdings") {
    pieChartData = data?.map((item) => ({
      value: item?.units,
      name: item?.invested_symbol,
    }));
  } else if (title === "Preferred Sector") {
    pieChartData = data !== undefined ? (Object?.keys(data)?.map((sector) => ({
      value: data[sector],
      name: sector,
    }))) : ''
  } else {
    pieChartData = data?.map((item) => ({
      value: item?.svalue,
      name: item?.skey,
    }));
  }

  const labelFormatter = (params) => {
    const { name, value, percent } = params;
    const maxLength = 10; // Adjust the maximum length for the ellipsis based on your preference
    const shortName = name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
    return `${shortName} (${percent}%)`;
  };

  let option = {
    // title: {
    //   text: title,
    //   left: "left",
    // },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}", // Format the tooltip content to show the invested_symbol, total, and percentage
    },
    series: [
      {
        name: "Investments",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outside", // Display labels outside the pie chart
          formatter: labelFormatter, // Use the custom label formatter
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: pieChartData,
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default MutualFundPieChart;
