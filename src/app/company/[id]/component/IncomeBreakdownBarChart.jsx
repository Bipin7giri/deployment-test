import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

const IncomeBreakdownBarChart = ({ companyBarChart }) => {
  const [option, setOption] = useState(null);
  useEffect(() => {
    if (companyBarChart) {
      const indexHeading = Object.keys(companyBarChart);
      const reversedArray = indexHeading.reverse();
      const formattedArray = reversedArray.map((item) => {
        const words = item.split(/(?=[A-Z])/);
        const formattedWords = words?.map(
          (word) => word.charAt(0).toUpperCase() + word?.slice(1)
        );
        return formattedWords.join(" ");
      });
      const yearsData = companyBarChart["netProfit"]?.map(
        (obj) => Object.keys(obj)[0]
      );

      const netProfitData = companyBarChart[`${indexHeading[0]}`]?.map(
        (obj) => Object.values(obj)[0]
      );
      const operatingProfitData = companyBarChart[`${indexHeading[1]}`]?.map(
        (obj) => Object.values(obj)[0]
      );
      const revenueData = companyBarChart[`${indexHeading[2]}`]?.map(
        (obj) => Object.values(obj)[0]
      );

      if (operatingProfitData && revenueData && netProfitData) {
        const newOption = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: formattedArray,
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: { show: true },
              dataView: { show: false, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              // restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          xAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: yearsData,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: formattedArray[0],
              type: "bar",
              barGap: 0,
              // label: labelOption,
              emphasis: {
                focus: "series",
              },
              data: netProfitData,
            },
            {
              name: formattedArray[1],
              type: "bar",
              // label: labelOption,
              emphasis: {
                focus: "series",
              },
              data: operatingProfitData,
            },
            {
              name: formattedArray[2],
              type: "bar",
              // label: labelOption,
              emphasis: {
                focus: "series",
              },
              data: revenueData,
            },
          ],
          color: [" #525FE1", "#F86F03", "#539165"],
          grid: {
            containLabel: true,
            left: "10%",
            right: "6%",
            bottom: "3%",
            top: "18%",
          },
          yAxis3D: {
            type: "category",
          },
          xAxis3D: {
            type: "category",
          },
          zAxis3D: {
            type: "value",
          },
          grid3D: {
            viewControl: {
              // Adjust the distance and angles for the 3D view
              distance: 100,
              alpha: 30,
              beta: 20,
            },
          },
        };
        setOption(newOption);
      }
    }
  }, [companyBarChart]);

  return <>{option && <ReactEcharts option={option} />}</>;
};

export default IncomeBreakdownBarChart;
