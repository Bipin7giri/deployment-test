"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Progress } from "antd"; // Assuming you are using the 'antd' library for the Progress component.

const SectorDistributionChart = ({ data }) => {
  const sectorNames = Object.keys(data);
  const sectorData = sectorNames.map((sector) => ({
    value: data[sector]["Total Value"],
    name: sector,
    itemStyle: {
      color: data[sector].sector_color ? data[sector].sector_color : "#7B3DD1", // Use sector_color from data, or default to '#7B3DD1'.
    },
  }));

  let option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    series: [
      {
        name: "Sector Distribution",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: sectorData,
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

// const SectorAndProgressBar = ({ data, totalValue }) => {
//   return (
//     <div className="flex">
//       <div className="left w-[50%]">
//         <div className="progress-bar pl-10 w-[100%]">
//           {Object.keys(data).length > 0 &&
//             Object.keys(data).map((sector, id) => (
//               <>
//                 <p className="lg:text-[16px] text-[22px] font-semibold">
//                   {sector}
//                 </p>

//             ))}
//         </div>
//       </div>
//       <div className="right w-[50%]">
//         {Object.keys(data).length > 0 && (
//           <SectorDistributionChart data={data} />
//         )}
//       </div>
//     </div>
//   );
// };

export default SectorDistributionChart;
