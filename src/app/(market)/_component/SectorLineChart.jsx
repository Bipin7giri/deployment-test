"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";

const SectorLineChart = ({
  otherChartData,
  nepseChartData,
  height,
  fontSize,
  sector,
}) => {
  let xAxisData = otherChartData?.map((item, id) => {
    const date = new Date(item?.t * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
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
      // Add the tooltip configuration
      trigger: "axis", // Display tooltip for each data item along the axis
      formatter: function (params) {
        // Customize the tooltip content here.
        // `params` is an array containing information about each data point.
        // Here, we assume params[0] corresponds to the otherChartData and params[1] to nepseChartData
        const date = new Date(params[0].name);
        const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
        const otherValue = params[0].value;
        const nepseValue = params[1].value;

        return `${formattedDate}<br />${otherChartData?.[0]?.sector}: ${otherValue}<br />NEPSE: ${nepseValue}`;
      },
    },
    series: [
      {
        name: otherChartData?.[0]?.sector,
        type: "line",
        smooth: true,
        data: otherChartData?.map((item) => item.l),
      },
      {
        name: "NEPSE",
        type: "line",
        smooth: true,
        data: nepseChartData?.map((item) => item.l),
      },
    ],
  };

  return (
    <div>
      <h2 className="pl-[30px] text-2xl font-bold lg:text-lg uppercase pb-[20px] ">
        {sector} vs NEPSE{" "}
      </h2>
      <ReactEcharts
        style={{ height: height, width: "100%", marginRight: 40 }}
        option={option}
        key={JSON.stringify(option)}
      />
    </div>
  );
};

export default SectorLineChart;
