import React from "react";
import ReactEcharts from "echarts-for-react";

const InterestChart = ({ interestData, height, fontSize }) => {
  let data = [];
  interestData.map((item, id) => {
    return (data.push([item.month + "/" + item.year, item.average_interest_on_credit]))
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

export default InterestChart;
