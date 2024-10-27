import React from 'react'
import ReactEcharts from "echarts-for-react";
import nodata from '../../assets/icon/nodata.png';

/**
* @author
* @function MixLineChart
**/

export const MixLineChart = ({ data }) => {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: data?.tooltipFormatter,
        },
        legend: {
            data: data?.legend
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            }
        },
        xAxis: {
            type: 'category',
            data: data?.keys,
            axisLabel: {
                rotate: data?.keys?.length > 5 ? 45 : 0,
            },
        },
        yAxis: [
            {
                type: 'value',
                min: data?.minYxis,
                max: data?.highestTotalDividend,
                interval: data?.interval1,
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            {
                type: 'value',
                min: data?.minYxis,
                max: data?.highestYieldDividend,
                interval: data?.interval2,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: data?.legend[0],
                type: 'bar',
                barGap: 0,
                emphasis: {
                    focus: 'series'
                },
                data: data?.bonusData
            },
            {
                name: data?.legend[1],
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: data?.cashData
            },
            {
                name: data?.legend[2],
                type: 'line',
                yAxisIndex: 1,
                emphasis: {
                    focus: 'series'
                },
                data: data?.dividendYield
            },
        ],
        color: [
            "#0079FF",
            "#00DFA2",
            "#FFA500"
        ],
        grid: {
            containLabel: true,
            left: "10%",
            right: "10%",
            bottom: "3%",
            top: "18%",
        },
    };

    return (
        <>
            {data && (data.bonusData?.length > 0 || data.cashData?.length > 0 || data.dividendYield?.length > 0) ? (
                <ReactEcharts option={option} />
            ) : (
                <div className='h-[230px] flex flex-col items-center justify-center'>
                        <span className='font-bold'> No dividend found</span>
                    <img height={75} width={75} src={nodata} alt='nodata_icon' />
                </div>
            )}
        </>
    )
}
