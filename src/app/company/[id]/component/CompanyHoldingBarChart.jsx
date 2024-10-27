import React from 'react';
import ReactEcharts from 'echarts-for-react';

const CompanyHoldingBarChart = ({ data }) => {

    const tooltipFormatter = (params) => {
        const dataIndex = params[0]?.dataIndex;
        const holding = params[0]?.value;
        const holdingType = dataIndex === 0 ? 'Promoter Holding' : 'Public Holding';
        return `${holdingType}: ${holding} %`;
    };

    const option = {
        title: {
            text: 'Company Holdings',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: tooltipFormatter,
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            max: 100, // Set the maximum value of the x-axis to 100
            axisLabel: {
                fontSize: '14px',
                fontWeight: '600',
                formatter: function (value) {
                    return value <= 100 ? value : ''; // Display the value only if it is less than or equal to 100
                },
            },
        },
        yAxis: {
            type: 'category',
            data: ['Promoter', 'Public'],
            axisLabel: {
                fontSize: '14px', // Increase the font size here
                fontWeight: '600',
            },
        },
        series: [
            {
                name: 'Holding',
                type: 'bar',
                barWidth: "50px", // Adjust the bar width here
                itemStyle: {
                    // Set colors for each bar individually
                    color: function (params) {
                        return params?.dataIndex === 0 ? '#7e9a49' : '#91c7ae';
                    },
                    barBorderRadius: [0, 10, 10, 0], // Set the border radius for the bars
                },
                data: [parseFloat(data?.promoterHolding), parseFloat(data?.publicHolding)],
            },
        ],
    };

    return (
        <>
            <div className="chart-container lg:text-[14px] text-[22px]">
                <ReactEcharts option={option} />
            </div>
        </>
    )
};

export default CompanyHoldingBarChart;
