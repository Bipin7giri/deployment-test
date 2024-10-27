import React from "react";
import ReactEcharts from "echarts-for-react";

const CircleChart = ({ chartData }) => {
  let lastIndex = chartData[0]?.data?.data?.length;
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 10,
      left: "center",
      textStyle: {
        fontSize: 11, // adjust the font size
      },
      data: ["India", "China", "Other countries"],
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value:
              chartData[0]?.data?.data[chartData[0]?.data?.data?.length - 1]
                ?.value,
            name: "India",
          },
          {
            value:
              chartData[1]?.data?.data[chartData[1]?.data?.data?.length - 1]
                ?.value,
            name: "China",
          },
          {
            value:
              chartData[2]?.data?.data[chartData[2]?.data?.data?.length - 1]
                ?.value,
            name: "Other countries",
          },
        ],
      },
    ],
  };
  return (
    <div>
      <div className="lg:w-[200px] lg:h-[100px] lg:mt-[-30px]" >
        <ReactEcharts option={option} />
      </div>
    </div>
  );
};

export default CircleChart;
