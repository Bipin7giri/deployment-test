/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import comingSoon from "../../../../assets/img/comingSoon.png";

const BarChartCompanyWise = ({ topData, type }) => {
  const [chartOption, setChartOption] = useState(null);

  useEffect(() => {
    let symbol = [];
    if (type === "buyer") {
      symbol = topData?.map((item) => item.buyerBrokerName);
    } else {
      symbol = topData?.map((item) => item.sellerBrokerName);
    }
    const totalAmount = topData?.map((item) => item.totalAmount);
    
    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)", // Customize the tooltip format as desired
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"], // Increase the size of the pie chart
          center: ["50%", "50%"], // Center the pie chart
          data: symbol.map((item, index) => ({
            name: item,
            value: totalAmount[index],
          })),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            show: true,
            formatter: "{b}: {c} ({d}%)", // Customize the label format as desired
            position: "outside", // Ensure labels are placed outside the chart
          },
        },
      ],
    };

    setChartOption(option);
  }, [topData, type]);

  // If no data is found, show the "coming soon" image
  if (topData && topData?.length === 0) {
    return (
      <div className="h-full w-full flex flex-col text-center align-middle justify-center">
        <img src={comingSoon} alt="coming soon" className="h-[60%] mx-auto" />
        <p className="text-md font-[500]">No Data found</p>
      </div>
    );
  }

  return (
    <div style={{ height: "300px", width: "100%" }}> {/* Increased the height */}
      {chartOption && <ReactEcharts option={chartOption} style={{ height: "100%", width: "100%" }} />}
    </div>
  );
};

export default BarChartCompanyWise;
