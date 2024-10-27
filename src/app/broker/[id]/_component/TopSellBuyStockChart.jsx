import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { formatMoney } from "../../../../utils/formatMoney";

const TopSellBuyStockChart = ({ topData }) => {
    const [chartOption, setChartOption] = useState(null);

    useEffect(() => {
        let stockName = topData?.map((item) => item.symbol);
        const totalAmount = topData?.map((item) => item.totalAmount);
        const colors = ["#336699", "#993366", "#669933", "#996633", "#663399"];

        const option = {
            xAxis: {
                type: "category",
                data: stockName,
                axisLabel: {
                    textStyle: {
                        color: "#666",
                    },
                },
            },
            yAxis: [
                {
                    type: "value",
                    axisLabel: {
                        textStyle: {
                            color: "#666",
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
            ],
            grid: {
                containLabel: true,
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
                formatter: function (params) {
                    const dataIndex = params[0].dataIndex;
                    const amountValue = totalAmount[dataIndex];
                    return `Symbol: ${stockName[dataIndex]}<br>Total Amount: Rs ${formatMoney(amountValue)}`;
                },
            },
            series: [
                {
                    data: totalAmount,
                    type: "bar",
                    barWidth: "40%",
                    itemStyle: {
                        color: function (params) {
                            return colors[params.dataIndex % colors.length];
                        },
                        emphasis: {
                            color: "#3399CC",
                        },
                    },
                    label: {
                        show: false,
                        position: "inside",
                        rotate: 90,
                        formatter: function (params) {
                            return "Rs " + formatMoney(totalAmount[params.dataIndex]);
                        },
                        textStyle: {
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: "bold",
                        },
                    },
                },
            ],
        };

        setChartOption(option);
    }, [topData]);

    return (
        <div style={{ height: "auto", width: "100%" }}>
            {chartOption && <ReactEcharts option={chartOption} />}
        </div>
    );
};

export default TopSellBuyStockChart;
