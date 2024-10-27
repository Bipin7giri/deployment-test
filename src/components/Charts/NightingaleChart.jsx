import React from "react";
import ReactEcharts from "echarts-for-react";

const NightingaleChart = ({ data }) => {
  const totalValue = Object.values(data).reduce((sum, category) => sum + category['Total Value'], 0);

  const chartData = Object.keys(data).map((sector, id) => {
    const a = (data[sector]['Total Value'] / totalValue) * 100
    return (
      { value: a, 
        name: sector, 
        itemStyle: {
        color: data[sector].sector_color 
      } }
    )
  })

  const option = {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        // dataView: { show: false},
        // restore: { show: true },
        // saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [0, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },

        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: chartData,
      }
    ]
  };

  return (
    <div>
      <ReactEcharts
        option={option}
      />
    </div>
  );
};

export default NightingaleChart;
