import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import moment from "moment";
import { formatMoney, formatValue } from "@/utils/formatMoney";

const StockChart = ({ selectedInterval, data, isNepse }) => {
  // Create a Set to store unique timestamps
  const uniqueTimestampsForAreaSeries = new Set();

  const filteredData = data
    ?.filter((item) => {
      // Check if the timestamp is already present in the Set
      if (uniqueTimestampsForAreaSeries.has(item.t)) {
        return false; // Skip this data point if it's a duplicate
      } else {
        uniqueTimestampsForAreaSeries.add(item.t); // Add timestamp to the Set
        return true; // Include this data point
      }
    })
    ?.map((item) => {
      return {
        ...item,
        t: Number(item.t) + 86400,
      };
    });

  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const toolTipRef = useRef(null);

  const showTooltip = (date, price, volume, point) => {
    const toolTip = toolTipRef.current;
    if (toolTip) {
      toolTip.style.display = "block";
      toolTip.style.left = point.x + 15 + "px";
      toolTip.style.top = point.y + 15 + "px";

      const formattedValue = formatValue(volume);

      if (isNepse) {
        toolTip.innerHTML = `
                <div>${date}</div>
                <div>Index: ${price}</div>
                ${
                  selectedInterval !== "1D"
                    ? `<div>Turnover: ${formattedValue}</div>`
                    : ""
                }
              `;
      } else {
        toolTip.innerHTML = `
                <div>${date}</div>
                <div>Price: ${price}</div>
                ${
                  selectedInterval !== "1D"
                    ? `<div>Volume: ${formattedValue}</div>`
                    : ""
                }
              `;
      }
    }
  };

  const hideTooltip = () => {
    const toolTip = toolTipRef.current;
    if (toolTip) {
      toolTip.style.display = "none";
    }
  };

  useEffect(() => {
    if (!chartInstance.current) {
      chartInstance.current = createChart(chartContainerRef.current, {
        layout: {
          textColor: "black",
          background: { type: "solid", color: "white" },
          overlay: true,
        },
        rightPriceScale: {
          borderVisible: false,
        },
        height: 390,
      });
    }

    const isPriceGreater = data?.[0]?.c > data?.[data.length - 1]?.c;
    const areaSeries = chartInstance.current.addAreaSeries({
      topColor: isPriceGreater
        ? "rgba(255, 98, 41, 0.3)"
        : "rgba(41, 98, 255, 0.3)",
      bottomColor: isPriceGreater
        ? "rgba(255, 98, 41, 0.05)"
        : "rgba(41, 98, 255, 0.05)",
      lineColor: isPriceGreater ? "red" : "#2962FF",
      lineWidth: 2,
    });

    areaSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.4,
      },
    });

    //set data for the area series
    areaSeries.setData(
      filteredData?.map((item) => ({
        time: item.t,
        value: item.c,
      })) || []
    );

    if (selectedInterval !== "1D") {
      const volumeSeries = chartInstance.current.addHistogramSeries({
        color: "#089981",
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });

      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });

      // Set data for the volume series
      volumeSeries.setData(
        filteredData?.map((item, index) => ({
          time: item.t,
          value: item.v,
          color:
            index === 0 || filteredData[index]?.v >= filteredData[index - 1]?.v
              ? "#089981"
              : "#F23645",
        })) || []
      );
    }

    chartInstance.current.subscribeCrosshairMove((param) => {
      const { time, point, seriesData } = param;

      if (time && point) {
        const formatted =
          selectedInterval !== "1D"
            ? moment(time * 1000).format("llll")
            : moment(time * 1000).format("hh:mm A");

        const [price, volume] = Array.from(seriesData.values())?.map(
          (value) => value.value
        );

        showTooltip(formatted, price, volume, point);
      } else {
        hideTooltip();
      }
    });

    chartInstance.current.timeScale().fitContent();

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.unsubscribeCrosshairMove();
        chartInstance.current.remove();
        chartInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div ref={chartContainerRef} className="w-full  relative ">
      <div
        ref={toolTipRef}
        className="w-[180px] h-auto absolute left-5 top-5 pointer-events-none rounded-sm bg-gray-950 text-white z-[1000] hidden p-2 text-xs text-left"
      />
    </div>
  );
};

export default StockChart;
