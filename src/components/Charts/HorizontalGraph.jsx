import React from "react";
import ReactEcharts from "echarts-for-react";

const HorizontalGraph = () =>{
    const weatherIcons = {
 
    };
    const seriesLabel = {
      show: true
    };
    const option = {
      title: {
        text: ''
      },
    
      grid: {
        left: 100
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'value',
        name: '',
        axisLabel: {
          formatter: '{value}'
        }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: [],
        axisLabel: {
          formatter: function (value) {
            return '{' + value + '| }\n{value|' + value + '}';
          },
          margin: 20,
          rich: {
            value: {
              lineHeight: 30,
              align: 'center'
            },
            Sunny: {
              height: 40,
              align: 'center',
              backgroundColor: {
                image: weatherIcons.Sunny
              }
            },
          }
        }
      },
      series: [
        {
          name: 'City Alpha',
          type: 'bar',
          data: [165],
          label: seriesLabel,
          markPoint: {
            symbolSize: 1,
           
          }
        },
        {
          name: 'City Beta',
          type: 'bar',
          label: seriesLabel,
          data: [150,]
        },
        {
          name: 'City Gamma',
          type: 'bar',
          label: seriesLabel,
          data: [220]
        }
      ]
    };

  return (
    <div>
      <ReactEcharts
        style={{width: "80%", }}
        option={option}
      />
    </div>
  );
}
export default HorizontalGraph;