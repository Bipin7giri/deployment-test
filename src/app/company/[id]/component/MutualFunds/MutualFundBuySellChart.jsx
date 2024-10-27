import React from "react";
import ReactEcharts from "echarts-for-react";
import { formatMoney } from "../../../../../utils/formatMoney";
import comingSoon from '../../../../../assets/img/comingSoon.png';
import Image from "next/image";

const MutualFundBuySellChart = ({ data, title }) => {
    // Format the data for the chart
    if (!data?.length > 0 && title === "Top Buy") {
        return (
            <>
                <div className="h-full w-full flex flex-col text-center align-middle">
                    <p className="text-md font-[500]">No Mutual Fund Bought This Stock</p>
                    <Image src={comingSoon} alt="" width={600} height={600} />
                </div>
            </>
        )
    }
    if (!data?.length > 0 && title === "Top Sell") {
        return (
            <>
                <div className="h-full w-full flex flex-col text-center align-middle">
                    <p className="text-md font-[500]">No Mutual Fund Sold This Stock</p>
                    <Image src={comingSoon} alt="" width={600} height={600} />
                </div>
            </>
        )
    }
    const chartData = data?.map((item) => ({
        name: item?.investedSymbol,
        value: item?.unitDifference,
    }));

    const shouldRotateLabels = chartData?.length > 10;
    const colors = ["#336699", "#993366", "#669933", "#996633", "#663399"];

    let option = {
        // title: {
        //     text: title,
        //     left: "left",
        // },
        xAxis: {
            type: "category",
            data: chartData?.map((item) => item?.name), // Use the symbols as x-axis labels
            splitLine: {
                show: false, // Hide the x-axis background grid lines
            },
            axisLabel: {
                rotate: shouldRotateLabels ? 45 : 0, // Rotate the x-axis labels by 45 degrees if there are more than 10 data points
            },
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: false, // Hide the y-axis background grid lines
            },
        },
        tooltip: {
            trigger: "axis", // Show tooltip when hovering over bars
            axisPointer: {
                type: "shadow", // Display shadow for better visibility
            },
            formatter: "{b} :  {c} units", // Format tooltip content to show invested_symbol and total
        },
        series: [
            {
                data: chartData?.map((item) => item?.value), // Use the values as bar data
                type: "bar",
                barWidth: "40%", // Adjust the width of the bars
                itemStyle: {
                    color: function (params) {
                        // Assign the same colors to each bar based on the index
                        return colors[params.dataIndex % colors.length];
                    },
                    emphasis: {
                        color: "#3399CC", // Customize the bar color on hover
                    },
                },
                label: {
                    show: true,
                    position: "top", // Show the label at the top of the bar
                    formatter: function (params) {
                        // Display the units value
                        return formatMoney(params.value);
                    },
                    textStyle: {
                        color: "#000", // Set the label text color to black
                        fontSize: 10, // Customize the data label font size
                        fontWeight: "bold", // Make the label text bold
                    },
                },
            },
        ],
    };

    return (
        <>
            <ReactEcharts option={option} />
        </>
    );
};

export default MutualFundBuySellChart;
