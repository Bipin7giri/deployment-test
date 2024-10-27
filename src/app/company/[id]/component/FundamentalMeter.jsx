import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

const FundamentalMeter = ({ camel, axisLabelFontSize, detailFontSize, splitLineWidth }) => {
    const [option, setOption] = useState({
        series: [
            {
                type: 'gauge',
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -15,  // Decreased distance from -30 to -15
                    length: 4,  // Decreased length from 8 to 4
                    lineStyle: {
                        color: '#fff',
                        width: 1  // Decreased width from 2 to 1
                    }
                },
                splitLine: {
                    distance: -15,  // Decreased distance from -30 to -15
                    length: 15,  // Decreased length from 30 to 15
                    lineStyle: {
                        color: '#fff',
                        width: splitLineWidth  // Decreased width from 4 to 2
                    }
                },
                axisLabel: {
                    color: 'inherit',
                    distance: 10,  // Decreased distance from 40 to 20
                    fontSize: axisLabelFontSize  // Decreased fontSize from 20 to 16
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}',
                    color: 'inherit',
                    fontSize: detailFontSize
                },
            }
        ]
    });

    useEffect(() => {
        let latestValue = parseFloat(camel?.[0]?.value);
        let isCamel = camel?.[0]?.is_camel;
        let newMax = isCamel === null ? 100 : 5;
        setOption((prevOption) => ({
            ...prevOption,
            series: [
                {
                    ...prevOption.series[0],
                    max: newMax,
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [
                                [0.3, "#FF433D"],
                                [0.7, '#37a2da'],
                                [1, "#1DCE92"]
                            ]
                        }
                    },
                    data: [
                        {
                            value: latestValue?.toFixed(2),
                        },
                    ],
                },
            ],
        }));

    }, [camel]);


    return (
        <div className="lg:w-[190px] lg:h-[170px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
            <ReactEcharts option={option} style={{ height: "100%", width: "100%" }} />
        </div>
    );
};

export default FundamentalMeter;
