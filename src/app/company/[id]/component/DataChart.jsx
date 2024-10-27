import React from 'react'
import ReactEcharts from "echarts-for-react";
import { useEffect } from 'react';

const DataChart = ({ rowData, column }) => {

  useEffect(() => {

  }, [rowData, column])

  const option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: column ? column : 'loading',
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: rowData?.map(number => number.replace(/,/g, "")) ? rowData.map(number => number.replace(/,/g, "")) : '',
      },
    ]
  };


  return (
    <>
      <ReactEcharts option={option} />
    </>
  )
}

export default DataChart