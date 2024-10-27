"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { formatMoney } from "../../../utils/formatMoney";

function ProductWiseLoan({ data }) {
  if (data !== undefined && data !== null) {
    const loanTypes = Object?.keys(data)
      ?.filter(
        (key) =>
          key !== "id" &&
          key !== "period" &&
          key !== "Total" &&
          key !== "sector"
      )
      ?.map((key) => {
        const value = parseFloat(
          String(data[key] || "0")
            ?.trim()
            ?.replace(/,/g, "")
        );
        return {
          name: key,
          value: isNaN(value) ? 0 : value,
        };
      });

    const shouldRotateLabels = loanTypes.length > 4;
    const colors = ["#336699", "#993366", "#669933", "#996633", "#663399"];

    const option = {
      // title: {
      //     text: "Productwise Loan",
      //     left: "left",
      // },
      xAxis: {
        type: "category",
        data: loanTypes.map((loan) => loan.name), // Use the names as x-axis labels
        splitLine: {
          show: false, // Hide the x-axis background grid lines
        },
        axisLabel: {
          rotate: shouldRotateLabels ? 12 : 0, // Rotate the x-axis labels by 45 degrees if there are more than 10 data points
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false, // Hide the y-axis background grid lines
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: "{b} :  {c} units",
      },
      series: [
        {
          data: loanTypes.map((loan) => loan.value),
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
            show: true,
            position: "top",
            formatter: function (params) {
              return formatMoney(params.value);
            },
            textStyle: {
              color: "#000",
              fontSize: 10,
              fontWeight: "bold",
            },
          },
        },
      ],
    };

    return (
      <>
        <div>
          <h2 className="pl-[30px] text-2xl font-bold lg:text-lg uppercase pb-[20px] ">
            Productwise Loan
          </h2>
          <ReactEcharts option={option} />
        </div>
      </>
    );
  }
}

export default ProductWiseLoan;
