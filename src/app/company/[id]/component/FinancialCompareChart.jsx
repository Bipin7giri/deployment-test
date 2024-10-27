import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

export default function FinancialCompareChart({ seriesData, xAxisData, isModalOpen }) {
    const [isChartVisible, setIsChartVisible] = useState(false);
    const option = {
        toolbox: {
            show: true,
            feature: {
                dataView: { show: false, readOnly: false },
                saveAsImage: { show: true },
            },
        },
        legend: {
            top: "30px",
            bottom: "10px",
        },
        xAxis: {
            type: "category",
            data: xAxisData,
        },
        yAxis: {
            type: "value",
        },
        tooltip: {
            trigger: "axis",

        },
        series: seriesData.map((series) => ({
            ...series,
            type: "line", // Ensuring the type is set to "line"
        })),
    };

    useEffect(() => {
        // Set isChartVisible to true when the modal is opened
        if (isModalOpen) {
            setIsChartVisible(true);
        }
    }, [isModalOpen]);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            {isChartVisible && seriesData?.[0]?.data?.length > 0 && xAxisData?.length > 0 ? (
                <div style={{ width: "100%" }} className="lg:h-[400px] h-[50vh]">
                    <ReactEcharts option={option} key={JSON.stringify(option)} style={{ height: "100%", width: "100%" }} />
                </div>
            ) : null}
        </div>
    );
}
