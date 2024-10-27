import React from "react";
import ReactEcharts from "echarts-for-react";

const BarChart = ({ deposit, loan, legend }) => {

  const xAsisYear = deposit?.map((obj) => Object.keys(obj)[0]);
  const removeRedundantYears = (array) => {
    const years = [];
    const data = [];
    array?.forEach((obj) => {
      const year = Object.keys(obj)[0];
      const value = Object.values(obj)[0];

      if (!years.includes(year)) {
        years.push(year);
        data.push(value);
      }
    });
    return { years, data };
  };

  const depositData = removeRedundantYears(deposit);
  const loanData = removeRedundantYears(loan);

  const { years } = depositData;
  const { data: l } = loanData;
  const data1 = [];
  const data2 = [];

  years.forEach((year) => {
    const depositValue = deposit?.find((obj) => Object.keys(obj)[0] === year);
    const loanValue = loan?.find((obj) => Object.keys(obj)[0] === year);

    if (depositValue && loanValue) {
      data1.push(Object.values(depositValue)[0]);
      data2.push(Object.values(loanValue)[0]);
    }
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legend
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        magicType: { show: true, type: ['line', 'bar',] },
        // restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: xAsisYear
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: legend[0],
        type: 'bar',
        barGap: 0,
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: data1
      },
      {
        name: legend[1],
        type: 'bar',
        // label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: data2
      },

    ],
    color: [
      " #0079FF",
      "#00DFA2"
    ],
    grid: {
      containLabel: true,
      left: "10%",
      right: "10%",
      bottom: "3%",
      top: "18%",
    },
    yAxis3D: {
      type: "category",
    },
    xAxis3D: {
      type: "category",
    },
    zAxis3D: {
      type: "value",
    },
    grid3D: {
      viewControl: {
        // Adjust the distance and angles for the 3D view
        distance: 100,
        alpha: 30,
        beta: 20,
      },
    },
  };


  return (
    <>
      <ReactEcharts option={option} />
    </>
  );
};

export default BarChart;
