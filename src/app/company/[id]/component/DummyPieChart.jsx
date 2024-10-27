import React from "react";
import ReactEcharts from "echarts-for-react";

const chartData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
    { value: 800, name: 'Facebook Ads' },
    { value: 1200, name: 'Tiktok Ads' },
    { value: 90, name: 'Twitter Ads' },
    { value: 170, name: 'Spam Ads' },
];

const chartOptions = {
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ["20%", "85%"],
            data: chartData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export default function DummyPieChart() {
    return (
        <div style={{ width: "500px", height: "300px" }}>
            <ReactEcharts style={{ width: "100%", height: "100%" }} option={chartOptions} />
        </div>
    );
}
