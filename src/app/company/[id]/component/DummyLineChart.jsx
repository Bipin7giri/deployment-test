import React from "react";
import ReactEcharts from "echarts-for-react";

const chartData = [
    820, 932, 901, 934, 1290, 1330, 1320, 123, 456, 567, 778, 666, 765
];
const colors = ["#336699", "#993366", "#669933", "#996633", "#663399"];

const chartOptions = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: ['NABIL', 'ADBL', 'SCB', 'NICA', 'BPCL', 'JBBL', 'MLBL', 'GBBL', 'NIFRA', 'AHL', 'KBL', 'PRVU']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: chartData,
        type: 'bar',
        smooth: true,
        itemStyle: {
            color: function (params) {
                // Assign the same colors to each bar based on the index
                return colors[params.dataIndex % colors.length];
            },
            emphasis: {
                color: "#3399CC", // Customize the bar color on hover
            },
        },
    }]
};

export default function DummyLineChart() {
    return (
        <div className="w-full h-[300px]">
            <ReactEcharts style={{ width: "100%", height: "100%" }} option={chartOptions} />
        </div>
    );
}
