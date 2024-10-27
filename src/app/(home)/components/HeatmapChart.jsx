"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const TreeMapChart = ({ data, selectedTab, getLevelOption }) => {
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
            } = info?.data || {};

            return [
              "Symbol: " + info?.name,
              selectedTab === "Turnover"
                ? "Turnover: " + info?.value
                : "Volume: " + info?.value,
              "Last Traded Price: " + lastTradedPrice,
              "Total Traded Quantity: " + totalTradeQuantity,
              "Percentage Change: " + percentageChange,
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

const HeatmapChart = ({ heatMap, selectedTab, getLevelOption }) => {
  // Process the data to segregate based on sector and calculate totalTradeValue
  const sectors = {};
  heatMap?.forEach((data) => {
    const {
      sectorName,
      totalTradeValue,
      symbol,
      totalTradeQuantity,
      lastTradedPrice,
      percentageChange,
    } = data;
    if (!sectors[sectorName]) {
      sectors[sectorName] = {
        totalTradeValue: 0,
        symbols: [],
        sectorName,
        lastTradedPrice,
        totalTradeQuantity,
        percentageChange,
      };
    }
    sectors[sectorName].totalTradeValue += parseFloat(totalTradeValue);
    sectors[sectorName].totalTradeQuantity += parseFloat(totalTradeQuantity);
    sectors[sectorName].sectorName = sectorName;
    sectors[sectorName].lastTradedPrice = lastTradedPrice;
    sectors[sectorName].percentageChange = percentageChange;
    sectors[sectorName].stock = symbol;
    sectors[sectorName].symbols.push({
      symbol,
      totalTradeValue: parseFloat(totalTradeValue),
      totalTradeQuantity: parseFloat(totalTradeQuantity),
      lastTradedPrice,
      percentageChange,
    });
  });

  // Convert the sectors object into an array of objects as expected by TreeMapChart
  const sectorDataArray = Object.keys(sectors).map((sectorName) => ({
    name: sectorName,
    value:
      selectedTab === "Turnover"
        ? sectors[sectorName].totalTradeValue
        : sectors[sectorName].totalTradeQuantity,
    children: sectors[sectorName].symbols.map((symbolData) => ({
      name: symbolData.symbol,
      value:
        selectedTab === "Turnover"
          ? symbolData.totalTradeValue?.toFixed(2)
          : symbolData.totalTradeQuantity?.toFixed(2),
      totalTradeQuantity: symbolData.totalTradeQuantity?.toFixed(2),
      percentageChange: (symbolData.percentageChange * 100)?.toFixed(2) + "%",
      lastTradedPrice: symbolData.lastTradedPrice?.toFixed(2),
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
      <TreeMapChart
        data={sectorDataArray}
        selectedTab={selectedTab}
        getLevelOption={getLevelOption}
      />
    </div>
  );
};

export default HeatmapChart;
