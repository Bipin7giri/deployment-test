import React from "react";
import ReactEcharts from "echarts-for-react";

const PePbChart = ({ data, height, fontSize, extraInfo }) => {
  const processedData = data?.map((item) => ({
    name: item.t * 1000 + 24 * 60 * 60 * 1000,
    value: [item.t * 1000 + 24 * 60 * 60 * 1000, item.value],
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "40%"];
      },
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: fontSize,
      },
    },
    series: [
      {
        data: processedData,
        type: "line",
        connectNulls: true,
        lineStyle: {
          color: "black",  // Set line color to black
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0, 0, 0, 0)" },  // Set area color to transparent black
              { offset: 1, color: "rgba(0, 0, 0, 0)" },
            ],
          },
        },
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: "black",  // Set point color to black
          borderColor: "black",  // Set point border color to black
          borderWidth: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactEcharts style={{ height: height, width: "100%" }} option={option} />
    </div>
  );
};

export default PePbChart;
