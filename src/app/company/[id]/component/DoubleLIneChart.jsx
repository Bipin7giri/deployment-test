import React from "react";
import ReactEcharts from "echarts-for-react";

const DoubleLineChart = ({ lineData1, lineData2 }) => {
  const lineData2Values = lineData2?.map((obj) => Object.values(obj)[0]);

  const option = {
    // title: {
    //   text: 'Market Cap and Revenue',
    //   left: 'center'
    // },
    grid3D: {}, // Add grid3D configuration for 3D look
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    legend: {
      data: ['Market Cap', 'Revenue'],
      left: 10
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        // prettier-ignore
        data: lineData1?.years
      }
    ],
    yAxis: [
      {
        name: 'Market Cap',
        type: 'value',
        axisLine: { // Add axis line configuration for 3D look
          lineStyle: {
            color: '#999'
          }
        },
        axisPointer: { // Add axis pointer configuration for 3D look
          show: true
        }
      },
      {
        name: 'Revenue',
        nameLocation: 'start',
        alignTicks: true,
        type: 'value',
        inverse: true,
        axisLine: { // Add axis line configuration for 3D look
          lineStyle: {
            color: '#999'
          }
        },
        axisPointer: { // Add axis pointer configuration for 3D look
          show: true
        }
      }
    ],
    series: [
      {
        name: 'Market Cap',
        type: 'line',
        lineStyle: {
          width: 1,
          color: 'blue', // Set the color of the line
          smooth: true // Make the line smooth
        },
        emphasis: {
          focus: 'series'
        },
        data: lineData1?.datas
      },
      {
        name: 'Revenue',
        type: 'line',
        yAxisIndex: 1,
        lineStyle: {
          width: 1,
          color: 'green', // Set the color of the line
          smooth: true // Make the line smooth
        },
        emphasis: {
          focus: 'series'
        },
        data: lineData2Values
      }
    ]
  };
  
  
  

  return (
    <div style={{ height: "240px", width: "100%" }}>
      <ReactEcharts option={option} />
    </div>
  );
};

export default DoubleLineChart;
