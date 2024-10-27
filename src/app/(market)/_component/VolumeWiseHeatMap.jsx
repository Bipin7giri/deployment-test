"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const TreeMapChart = ({ data, getLevelOption }) => {
  const getOption = () => {
    return {
      tooltip: {
        formatter: function (info) {
          if (info.data.children) {
            // For sector names, don't show the tooltip
            return "";
          } else {
            // For symbols, show the tooltip with relevant information
            const {
              percentageChange = "NaN",
              lastTradedPrice = "NaN",
              totalTradeValue = "NaN",
              EPS = "NaN",
              BookValue = "NaN",
              RoE = "NaN",
              NetProfit = "NaN",
            } = info?.data || {};

            return [
              "Symbol: " + info?.name,
              "Turnover: " + totalTradeValue,
              "Last Traded Price: " + lastTradedPrice,
              "Total Traded Quantity: " + info?.value,
              "Percentage Change: " + percentageChange,
              "EPS: " + EPS,
              "Book Value: " + BookValue,
              "ROE: " + RoE,
              "Net Profit: " + NetProfit,
            ].join("<br/>");
          }
        },
      },
      series: [
        {
          name: "Sectors",
          type: "treemap",
          visibleMin: 300,
          label: {
            show: true,
            formatter: "{b}",
          },
          upperLabel: {
            show: true,
            height: 30,
          },
          itemStyle: {
            borderColor: "#fff",
          },
          roam: false,
          zoomToNodeRatio: 1,
          data: data,
          levels: getLevelOption(),
          leafDepth: 2,
        },
      ],
      toolbox: {
        feature: {
          restore: {
            title: "Restore Zoom",
          }, // Add a restore button to reset zoom
        },
      },
    };
  };

  return <ReactECharts option={getOption()} style={{ height: "700px" }} />;
};

function VolumeWiseHeatMap({ heatMap, getLevelOption }) {
  // Process the data to segregate based on sector and calculate totalTradeValue
  //   console.log("volume wise heat map", heatMap);
  const sectors = {};
  heatMap?.forEach((data) => {
    const {
      sector,
      totalTradeValue,
      symbol,
      totalTradeQuantity,
      lastTradedPrice,
      percentageChange,
      "Earnings Per Share": EPS,
      "Book Value per Share": BookValue,
      "Return on Equity": RoE,
      "Net Profit": NetProfit,
    } = data;
    if (!sectors[sector]) {
      sectors[sector] = {
        totalTradeValue: 0,
        symbols: [],
        sector,
        lastTradedPrice,
        totalTradeQuantity,
        percentageChange,
        EPS,
        BookValue,
        RoE,
        NetProfit,
      };
    }
    sectors[sector].totalTradeValue += parseFloat(totalTradeValue);
    sectors[sector].totalTradeQuantity += parseFloat(
      Number(totalTradeQuantity) ?? 0
    );
    sectors[sector].sector = sector;
    sectors[sector].lastTradedPrice = lastTradedPrice;
    sectors[sector].percentageChange = percentageChange;
    sectors[sector].EPS = EPS;
    sectors[sector].BookValue = BookValue;
    sectors[sector].NetProfit = NetProfit;
    sectors[sector].RoE = RoE;
    sectors[sector].stock = symbol;
    sectors[sector].symbols.push({
      symbol,
      totalTradeValue: parseFloat(totalTradeValue),
      totalTradeQuantity: parseFloat(Number(totalTradeQuantity) ?? 0),
      lastTradedPrice,
      percentageChange,
      EPS,
      BookValue,
      RoE,
      NetProfit,
    });
  });

  // Convert the sectors object into an array of objects as expected by TreeMapChart
  const sectorDataArray = Object.keys(sectors).map((sectorName) => ({
    name: sectorName,
    value: sectors[sectorName].totalTradeQuantity,
    children: sectors[sectorName].symbols.map((symbolData) => ({
      name: symbolData.symbol,
      totalTradeValue: symbolData.totalTradeValue?.toFixed(2),
      value: symbolData.totalTradeQuantity?.toFixed(2),
      percentageChange: (symbolData.percentageChange * 100)?.toFixed(2) + "%",
      lastTradedPrice: symbolData.lastTradedPrice?.toFixed(2),
      EPS: symbolData.EPS?.toFixed(2),
      BookValue: symbolData.BookValue?.toFixed(2),
      NetProfit: symbolData.NetProfit?.toFixed(2),
      RoE: (symbolData.RoE * 100)?.toFixed(2),
    })),
  }));
  return (
    <div className=" relative z-10" style={{ height: "700px", width: "100%" }}>
      <TreeMapChart data={sectorDataArray} getLevelOption={getLevelOption} />
    </div>
  );
}

export default VolumeWiseHeatMap;
