import React, { useEffect, useRef } from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/treemap";
import "echarts/lib/component/tooltip";

const GradientMappingChart = ({ dataAltMant }) => {
    const data = dataAltMant
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                formatter: function (params) {
                    let name = params.name;
                    let value = params.value[0];
                    return [
                        '<div className="tooltip-title">' +
                        echarts.format.encodeHTML(name) +
                        '</div>',
                        'Key: &nbsp;&nbsp;' + name + '<br>',
                        'Value: &nbsp;&nbsp;' + value + '<br>',
                    ].join('');
                }
            },
            series: [
                {
                    type: 'treemap',
                    roam: false, // Disable zoom functionality
                    data: Object.entries(data)?.map(([name, value], index) => ({
                        name: name + ' (' + (typeof value === 'number' ? value.toFixed(1) : '') + ')',
                        value: [value, index, 0], // Add index and 0 for color mapping
                    })),
                    itemStyle: {
                        emphasis: {
                            borderWidth: 1,
                            borderColor: '#fff',
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        // Additional CSS styles for hover effect
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                    }
                }
            ]
        };


        chart.setOption(option);

        // Cleanup the chart when the component unmounts
        return () => {
            chart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: "auto", height: "500px" }} />;
};

export default GradientMappingChart;
