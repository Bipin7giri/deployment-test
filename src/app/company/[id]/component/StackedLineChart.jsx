import React from "react";
import ReactEcharts from "echarts-for-react";

/**
* @author
* @function StackedLineChart
**/

export const StackedLineChart = ({ data }) => {
    const xAxisData = [];
    const renewedPremiumData = [];
    const firstYearPremium = [];

    for (const year in data?.data) {
        for (const entry of data?.data[year]) {
            xAxisData.push(`${entry?.year}/${entry?.month}`);
            renewedPremiumData.push(entry?.renewed_premium);
            firstYearPremium.push(entry?.first_year_premium);
        }
    }

    const option = {
        xAxis: {
            type: 'category',
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        legend: {
            data: ['Renewed Premium', 'First Year Premium'],
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
        // tooltip: {
        //     trigger: 'axis',
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        series: [
            {
                name: 'Renewed Premium',
                type: 'line',
                smooth: true,
                data: renewedPremiumData,
            },
            {
                name: 'First Year Premium',
                type: 'line',
                smooth: true,
                data: firstYearPremium,
            },
        ],
    };

    return (
        <>
            <ReactEcharts style={{ width: "100%", marginRight: 40 }} option={option} key={JSON.stringify(option)} />
        </>
    )
}
