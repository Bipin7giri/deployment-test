import React from "react";
import ReactEcharts from "echarts-for-react";

const LineChart = ({ data, title }) => {
  const propertiesToAdd = [];
  for (let year in data) {
    const properties = Object?.keys(data[year]);
    for (let prop of properties) {
      if (!propertiesToAdd?.includes(prop)) {
        propertiesToAdd?.push(prop);
      }

      if (typeof data[year][prop] === "string") {
        data[year][prop] = parseFloat(data[year][prop]);
      }
    }
  }

  for (let year in data) {
    for (let prop of propertiesToAdd) {
      if (!data[year]?.hasOwnProperty(prop)) {
        data[year][prop] = 0;
      }
    }
  }

  const names =
    data !== undefined &&
      data !== null &&
      Object?.values(data)?.[1] !== undefined
      ? Object?.keys(Object?.values(data)?.[1])
      : "";

  const seriesData = Array.isArray(names)
    ? names.map((name) => ({
      name,
      type: "line",
      data: Object.values(data)?.map((item) => item[name]),
    }))
    : [];

  const watermarkTextStyle = {
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Arial",
  };

  const watermarkGraphic = {
    type: "text",
    left: "center",
    top: "center",
    z: 100,
    style: {
      fill: watermarkTextStyle.color,
      text: "Saral Lagani",
      font: `${watermarkTextStyle.fontSize}px ${watermarkTextStyle.fontFamily}`,
    },
  };

  // Check if seriesData is empty
  if (seriesData.length === 0) {
    // Create a special series to display "No Data Found" message
    seriesData.push({
      name: "No Data Found",
      type: "bar",
      data: [0], // You can change this data value as per your requirement
      itemStyle: {
        color: "#cccccc", // Customize the color for the "No Data Found" series
      },
      label: {
        show: true,
        position: "top", // Show the label at the top of the bar
        formatter: "No Data Found", // Display the message
        textStyle: {
          color: "#000",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
    });
  }

  const option = {
    title: {
      text: title,
    },
    legend: {
      top: "30px",
      bottom: "10px",
      data: names,
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: false, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: "category",
      data: Object.keys(data),
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    series: seriesData,
    // graphic: watermarkGraphic,
  };

  return (
    <div className="bg-white px-[10px] py-[20px]">
      <ReactEcharts option={option} key={JSON.stringify(option)} />
    </div>
  );
};

export default LineChart;