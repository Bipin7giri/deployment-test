import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts?.init(chartRef?.current);

    const keys = Object?.keys(data)?.filter((key) => key !== 'Particulars' && key !== 'key' && key !== 'description');

    const options = {
      title: {
        text: data?.Particulars,
      },
      legend: {
        data: keys,
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: false, readOnly: false },
          // magicType: { show: true, type: ['line', 'bar'] },
          // restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisLabel: {
          rotate: keys?.length > 5 ? 45 : 0, // Rotate the x-axis labels by 45 degrees if there are more than 7 keys
        },
      },
      yAxis: {
        type: 'value',
      },
      tooltip: { // Add tooltip configuration
        trigger: 'axis',
        axisPointer: {
          type: 'shadow', // Display a shadow to indicate the hover position
        },
      },
      series: [
        {
          type: 'bar',
          name: data?.Particulars,
          data: keys?.map((key) => {
            const value = data[key];
            if (value?.includes('%')) {
              // Remove the percentage symbol from the value
              return Number(value?.replace('%', ''));
            }
            return Number(value);
          }),
          itemStyle: {
            color: (params) => {
              // Generate colors from a color palette
              const colorPalette = [
                '#61a0a8',
                '#7e9a49',
                '#b7c7a7',
                '#c4ccd3',
                '#c1a1d1',
                '#d48265',
                '#91c7ae',
                '#749f83',
                '#ca8622',
                '#6e7074',
                '#546570',
                '#c23531',
                '#ca8622',
                '#91c7ae',
                '#bda29a',
                '#6e7074',
                '#c4ccd3',
                '#61a0a8',
                '#7e9a49',
                '#b7c7a7',
              ];
              return colorPalette[params?.dataIndex % colorPalette?.length];
            },
          },
        },
      ],
      backgroundColor: '#fff',
    };

    chart?.setOption(options);

    return () => {
      chart?.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ flex: '1', height: '400px', marginBottom: '20px' }} className='bg-secondary    px-[10px] py-[20px]' />;
};

export default BarChart;
