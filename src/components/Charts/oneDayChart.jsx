import React from "react";
import ReactEcharts from "echarts-for-react";

const OneDayChart = () => {
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                show: false  // Hide the x-axis labels (days)
            },
            splitLine: {
                show: false  // Hide the background grid lines
            },
            axisLine: {
                show: false  // Hide the base x-axis line
            },
            axisTick: {
                show: false  // Hide the x-axis ticks
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: false  // Hide the y-axis labels (values)
            },
            splitLine: {
                show: false  // Hide the background grid lines
            },
            axisLine: {
                show: false  // Hide the y-axis line
            },
            axisTick: {
                show: false  // Hide the y-axis ticks
            }
        },
        series: [
            {
                emphasis: {
                    scale: true,
                    scaleSize: 30,
                },
                data: [100, 150, 200, 250, 300, 500, 550, 455, 502, 512, 547, 515],
                type: 'line',
                lineStyle: {
                color: 'blue',  // Customize the line 
                    width: 2,  // Customize the line width
                    type: 'solid'  // Customize the line style (solid, dashed, etc.)
                },
                symbol: 'none'  // Hide the data points (dots)
            }
        ]
    };



    return (
        <div>
            <ReactEcharts
                style={{ width: "100%", }}
                option={option} />
        </div>
    );
};

export default OneDayChart;




