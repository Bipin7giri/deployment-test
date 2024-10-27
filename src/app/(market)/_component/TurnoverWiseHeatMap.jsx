"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const TreeMapChart = ({ data, getLevelOption }) => {
  // Define your own logic for color customization based on the value
  const getColorBasedOnValue = (value) => {
    // Add your logic here to determine the color based on the value
    // This is just a simple example; you can customize this logic

    const percentage = 3;

    if (percentage >= 5) {
      return "#30cc5a";
    } else if (percentage >= 3 && percentage < 5) {
      return "#2f9e4f";
    } else if (percentage >= 1 && percentage < 3) {
      return "#414554";
    } else if (percentage === 0) {
      return "#8b444e";
    } else if (percentage >= -1 && percentage < -3) {
      return "#8b444e";
    } else if (percentage >= -3 && percentage < -5) {
      return "#bf4045";
    } else if (percentage <= -5) {
      return "#f63538";
    }
  };

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
              totalTradeQuantity = "NaN",
              EPS = "NaN",
              BookValue = "NaN",
              RoE = "NaN",
              NetProfit = "NaN",
            } = info?.data || {};

            return [
              "Symbol: " + info?.name,
              "Turnover: " + info?.value,
              "Last Traded Price: " + lastTradedPrice,
              "Total Traded Quantity: " + totalTradeQuantity,
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
          levels: getLevelOption(),
          data: data,
          leafDepth: 3,
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

  return (
    <ReactECharts
      option={getOption()}
      style={{ height: "700px" }}
      onEvents={{
        restore: (e) => {
          console.log("clicked");
        },
      }}
    />
  );
};

function TurnoverWiseHeatMap({ heatMap, getLevelOption }) {
  // Process the data to segregate based on sector and calculate totalTradeValue
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
    sectors[sector].totalTradeQuantity += parseFloat(totalTradeQuantity);
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
      totalTradeQuantity: parseFloat(totalTradeQuantity),
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
    value: sectors[sectorName].totalTradeValue,
    children: sectors[sectorName].symbols.map((symbolData) => ({
      name: symbolData.symbol,
      value: symbolData.totalTradeValue?.toFixed(2),
      totalTradeQuantity: symbolData.totalTradeQuantity?.toFixed(2),
      percentageChange: (symbolData.percentageChange * 100)?.toFixed(2) + "%",
      lastTradedPrice: symbolData.lastTradedPrice?.toFixed(2),
      EPS: symbolData.EPS?.toFixed(2),
      BookValue: symbolData.BookValue?.toFixed(2),
      NetProfit: symbolData.NetProfit?.toFixed(2),
      RoE: (symbolData.RoE * 100)?.toFixed(2),
    })),
  }));

  return (
    <div
      className=" z-10"
      style={{
        height: "700px",
        width: "100%",
      }}
    >
      <TreeMapChart data={sectorDataArray} getLevelOption={getLevelOption} />
    </div>
  );
}

export default TurnoverWiseHeatMap;
