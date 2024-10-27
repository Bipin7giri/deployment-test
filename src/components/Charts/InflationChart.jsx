import React from "react";
import ReactEcharts from "echarts-for-react";

const InflationChart = ({ inflationData, height, fontSize }) => {
  let data = [];
  inflationData.map((item, id) => {
    return (data.push([item.month + "/" + item.year, item.inflation]))
  })

  const option = {
    xAxis: {
      type: 'category',
      data: data?.map((item) => item[0])
    },
    yAxis: {
      type: 'value'
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 20,
      },
    ],
    series: [
      {
        data: data?.map((item) => item[1]),
        type: 'line'
      }
    ]
  };
  return (
    <div>
      <ReactEcharts
        style={{ height: height, width: "100%", marginRight: 40 }}
        option={option}
      />
    </div>
  );
};

export default InflationChart;
