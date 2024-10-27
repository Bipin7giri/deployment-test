import React from "react";
import ReactEcharts from "echarts-for-react";

const SingleLineChart = ({ chartData, title,height,fontSize}) => {
  const xAxisData = chartData?.data?.data?.map((item) => item?.year); // Extract months from interest data
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [title],
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
        fontSize:fontSize, // Change the font size here
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize:fontSize, // Change the font size here
      },
    },
    series: [
      {
        name: title,
        type: "line",
        smooth: true,
        data: chartData?.data?.data?.map((item) => item?.value), // update with the interest data
      },
    ],
  };

  return (
    <div>
      <ReactEcharts 
      // style={{ height:height, width: "100%"}}
       option={option} />
    </div>
  );
};

export default SingleLineChart;
