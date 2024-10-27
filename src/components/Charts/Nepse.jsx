import React from "react";
import ReactEcharts from "echarts-for-react";

const Nepse = ({ data, height, fontSize, extraInfo, isCalculatedChart }) => {
  const processedData = data?.map((item) => ({
    name: item.t * 1000 + 24 * 60 * 60 * 1000,
    value: [item.t * 1000 + 24 * 60 * 60 * 1000, item.c],
  }));

  const lastDataPoint =
    processedData?.length > 0
      ? processedData[processedData?.length - 75]
      : null;

  // Determine color based on extraInfo.schange
  const isPriceGreater = data[data.length - 1]?.c > data[0]?.c;
  let lineColor, pointColor, borderColor;
  if (isPriceGreater) {
    lineColor = pointColor = borderColor = "green";
  } else {
    lineColor = pointColor = borderColor = "red";
  }

  const option = {
    tooltip: {
      show: isCalculatedChart ? false : true,
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "40%"];
      },
    },
    xAxis: {
      show: isCalculatedChart ? false : true,
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      show: isCalculatedChart ? false : true,
      type: "value",
      axisLabel: {
        fontSize: fontSize,
      },
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false,
    },
    series: [
      {
        data: processedData,
        type: "line",
        connectNulls: true,
        lineStyle: {
          color: lineColor, // Set line color based on extraInfo.schange
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: lineColor },
              { offset: 1, color: "white" },
            ],
          },
        },
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: pointColor, // Set point color based on extraInfo.schange
          borderColor: borderColor, // Set point border color based on extraInfo.schange
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

export default Nepse;
