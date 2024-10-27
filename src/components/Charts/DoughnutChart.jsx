import React from "react";
import ReactEcharts from "echarts-for-react";
import { formatMoney } from "../../utils/formatMoney";

const DoughnutChart = ({ data, fromWhere }) => {
  let option = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const fieldName = params.name;
        const fieldValue = params.value;

        if (fromWhere === "portfolio") {
          return `${fieldName}: Rs ${formatMoney(fieldValue)}`;
        } else if (fromWhere === "company") {
          return `${fieldName}: ${fieldValue}%`;
        }
        return params.value;
      },
    },
    legend: {
      orient: "horizontal",
      bottom: 10,
      data: [],
    },
    series: [
      {
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
            fontSize: 22,
            fontWeight: "bold",
            formatter: (params) => {
              const fieldName = params.name;
              if (fromWhere === "portfolio") {
                return `${fieldName}`;
              } else if (fromWhere === "company") {
                return `${fieldName}`;
              }
              return params.value;
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  };

  if (fromWhere === "company" && typeof window !== undefined) {
    const promoterHolding = data?.promoter
      ? data?.promoter
      : data?.promoterHolding;
    const publicHolding = data?.public ? data?.public : data?.governmentHolding;
    const screenWidth = window.innerWidth;
    const legendFontSize = screenWidth > 1024 ? 14 : 24;
    option.legend = {
      orient: "horizontal",
      bottom: 10,
      data: ["Promoter", "Public"],
      textStyle: {
        fontSize: legendFontSize,
      },
    };
    option.series[0].data = [
      { value: parseFloat(promoterHolding), name: "Promoter" },
      { value: parseFloat(publicHolding), name: "Public" },
    ];
  } else if (fromWhere === "portfolio") {
    // const { totalInvestment, totalGain } = data;
    // option.series[0].data = [
    //   { value: parseFloat(totalInvestment), name: "Investment" },
    //   { value: totalGain < 0 ? parseFloat(totalGain) * -1 : parseFloat(totalGain), name: totalGain < 0 ? "Loss" : "Gain" },
    // ];
    const { totalInvestment, totalGain } = data;

    const gainColor = "lightgreen";
    const lossColor = "#F76560";
    const investmentColor = "#3A6FF8";

    const seriesData = [
      {
        value: parseFloat(totalInvestment),
        name: "Investment",
        itemStyle: { color: investmentColor },
      },
    ];

    // Check if totalGain is positive or negative
    if (totalGain < 0) {
      seriesData.push({
        value: parseFloat(totalGain) * -1,
        name: "Loss",
        itemStyle: { color: lossColor },
      });
    } else {
      seriesData.push({
        value: parseFloat(totalGain),
        name: "Gain",
        itemStyle: { color: gainColor },
      });
    }

    option.series[0].data = seriesData;
  }

  return (
    <div>
      {fromWhere === "company" ? (
        <div>
          <h2 className="text-2xl font-bold lg:text-lg uppercase">
            {" "}
            Company Holdings{" "}
          </h2>
        </div>
      ) : (
        ""
      )}
      <ReactEcharts
        style={{
          width: "100%",
          marginTop: fromWhere === "portfolio" ? "-70px" : "0",
        }}
        option={option}
      />
    </div>
  );
};

export default DoughnutChart;
