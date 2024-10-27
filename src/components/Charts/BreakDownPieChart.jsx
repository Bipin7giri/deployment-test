import React from "react";
import ReactEcharts from "echarts-for-react";

const BreakDownPieChart = ({ chartData }) => {
  // Limit the number of data points to display
  const maxDataPointsToShow = 10;
  const limitedData = chartData?.slice(0, maxDataPointsToShow);

  const option = {
    series: [
      {
        // name: "Access From",
        type: "pie",
        radius: ["20%", "85%"],
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)", // Display series name, label, value, and percentage in the tooltip
    },
    color: [
      "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
      "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
      "#AED581", "#DCE775", "#FFF176", "#FFD54F", "#FFB74D",
      "#FF8A65", "#A1887F", "#E0E0E0", "#90A4AE", "#B0BEC5",
      "#F48FB1", "#FFAB91", "#BCAAA4", "#9E9D24", "#7CB342"
    ],
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <ReactEcharts style={{ width: "100%", height: "100%" }} option={option} />
    </div>
  );
};

export default BreakDownPieChart;
