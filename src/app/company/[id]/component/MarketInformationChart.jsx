import React from "react";
import ReactEcharts from "echarts-for-react";

const MarketInformationChart = ({ lineData }) => {
    if (!lineData) {
        return <div>Invalid data format</div>;
    }

    const years = Object?.keys(lineData);
    const symbols = Object?.keys(lineData[years[0]]);

    const seriesData = symbols?.map((symbol) => ({
        name: symbol,
        type: "line",
        smooth: true,
        data: years.map((year) => lineData[year][symbol])
    }));

    const option = {
        xAxis: {
            type: "category",
            data: years
        },
        yAxis: {
            type: "value"
        },
        legend: {
            data: symbols
        },
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                const year = params[0].axisValue;
                const tooltipLines = params.map(
                    (param) =>
                        `${param.seriesName}: ${((param.value)?.toFixed(2)) + "%" || 'N/A'}`
                );
                return `${year}<br/>${tooltipLines.join("<br/>")}`;
            }
        },
        series: seriesData
    };

    return (
        <div>
            <ReactEcharts style={{ height: "400px", width: "100%" }} option={option} key={JSON.stringify(option)} />
        </div>
    );
};

export default MarketInformationChart;
