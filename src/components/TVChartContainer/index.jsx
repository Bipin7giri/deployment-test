"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";

import { widget } from "@public/static/charting_library";
import Datafeed, { fetchDataWithAdjustedMode } from "./datafeed";
import { useDispatch, useSelector } from "react-redux";
import {
  getIndicesTypeValue,
  getSectorTypeValue,
  makeSaralApiRequest,
} from "./helpers.js";
// import {
//   setChoosedTechinicalSector,
//   setChoosedTechinicalSymbol,
// } from "../../app/(market)/_redux/marketSlice";
// import { disabledCompanies } from "../../utils/disableCompanies.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clearTechnicalStorage } from "@/utils/clearTechnicalStorage";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const TVChartContainer = ({ symbol, height, setSymbol }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const chartContainerRef = useRef();

  const searchParams = useSearchParams();

  const sym = searchParams.get("symbol");

  const router = useRouter();
  const defaultProps = {
    symbol: sym ? sym : symbol ? symbol : "NEPSE",
    interval: "1D",
    // datafeedUrl: "https://demo_feed.tradingview.com",
    libraryPath: "/static/charting_library/",
    chartsStorageUrl:
      currentUser && `${process.env.NEXT_PUBLIC_BASE_URL}/tradingView`,
    chartsStorageApiVersion: "1.1",
    clientId: `sarallagani.com`,
    container: "tv_chart_container",
    // userId: "public_user_id",
    load_last_chart: true,
    disabled_features: ["drawing_templates"],
    enabled_features: [],
    userId: currentUser,
    fullscreen: false,
    theme: "Light",
    autosize: true,
  };

  // list of nepse and sectors

  const allSectors = [
    "Development Banks",
    "Manufacturing And Processing",
    "Micro Finance",
    "Life Insurance",
    "Mutual Fund",
    "Commercial Banks",
    "Hotels And Tourism",
    "Others",
    "Hydro Power",
    "Non Life Insurance",
    "Finance",
    "Trading",
    "Investment",
  ];

  const [themeMode, setThemeMode] = useState("Dark");

  const [adjustedMode, setAdjustedMode] = useState(false);

  // Use refs for drawing state
  const isDrawingSupportRef = useRef(false);
  const supportLineEntityRef = useRef();
  const isDrawingResistanceRef = useRef(false);
  const resistanceLineEntityRef = useRef();
  const isDrawingTrendLineRef = useRef(false);
  const trendLineEntityRef = useRef();
  const isDrawingFibRetracementRef = useRef(false);
  const fibRetracementEntityRef = useRef();

  let widgetOptions;
  let tvWidget;

  const handleSupportButtonClick = useCallback(async () => {
    const defaultTimestamp = 1371100000;
    isDrawingSupportRef.current = !isDrawingSupportRef.current;

    if (isDrawingSupportRef.current) {
      const resisSym = window.location.search.split("=")[1]
        ? decodeURIComponent(window.location.search.split("=")[1])
        : "NEPSE";
      let data = {};

      if (allSectors.includes(resisSym)) {
        const type = getSectorTypeValue(resisSym);
        data = await makeSaralApiRequest(
          `/sector/get_sectors_pivot_resistance_data/${type}/${defaultTimestamp}`
        );
      } else if (resisSym === "NEPSE") {
        const type = getIndicesTypeValue(resisSym);
        data = await makeSaralApiRequest(
          `/company/get_indices_pivot_resistance_data/${type}/${defaultTimestamp}`
        );
      } else {
        data = await makeSaralApiRequest(
          `/company/get_pivot_resistance_data/${resisSym}/${defaultTimestamp}`
        );
      }

      const supportLines = [];

      // Extract support levels from data and draw each line
      Object.entries(data.data).forEach(([key, value]) => {
        if (key.includes("Support Level")) {
          const label = key.replace("Support Level", "S");

          const lineEntity = tvWidget.activeChart().createMultipointShape(
            [
              {
                price: parseInt(value),
                time: new Date() / 1000,
              },
            ],
            {
              shape: "horizontal_line",
              lock: true,
              disableSelection: false,
              disableSave: false,
              disableUndo: false,
              text: label,
              overrides: {
                showLabel: "text",
                color: "#35B14F", // This sets the line color to green
                linecolor: "#35B14F", // This also sets the line color to green
                backgroundColor: "rgba(53, 177, 79, 0.25)",
                textColor: "#35B14F",
              },
            }
          );

          supportLines.push(lineEntity);
        }
      });

      // Store the array of entity objects in the ref
      supportLineEntityRef.current = supportLines;
    } else {
      const entities = supportLineEntityRef.current;

      if (entities) {
        entities.forEach((entity) => {
          tvWidget.activeChart().removeEntity(entity);
        });

        // Reset the ref after removal
        supportLineEntityRef.current = null;
      }
    }
  }, [tvWidget]);

  const handleResistanceButtonClick = useCallback(async () => {
    isDrawingResistanceRef.current = !isDrawingResistanceRef.current;
    const defaultTimestamp = 1371100000;

    if (isDrawingResistanceRef.current) {
      const resisSym = window.location.search.split("=")[1]
        ? decodeURIComponent(window.location.search.split("=")[1])
        : "NEPSE";
      let data = {};

      if (allSectors.includes(resisSym)) {
        const type = getSectorTypeValue(resisSym);
        data = await makeSaralApiRequest(
          `/sector/get_sectors_pivot_resistance_data/${type}/${defaultTimestamp}`
        );
      } else if (resisSym === "NEPSE") {
        const type = getIndicesTypeValue(resisSym);
        data = await makeSaralApiRequest(
          `/company/get_indices_pivot_resistance_data/${type}/${defaultTimestamp}`
        );
      } else {
        data = await makeSaralApiRequest(
          `/company/get_pivot_resistance_data/${resisSym}/${defaultTimestamp}`
        );
      }

      const resistanceLines = [];

      // Extract resistance levels from data and draw each line
      Object.entries(data.data).forEach(([key, value]) => {
        if (key.includes("Resistance Level")) {
          const label = key.replace("Resistance Level", "R");
          const lineEntity = tvWidget.activeChart().createMultipointShape(
            [
              {
                price: parseInt(value),
                time: new Date() / 1000,
              },
            ],
            {
              shape: "horizontal_line",
              lock: true,
              disableSelection: false,
              disableSave: false,
              disableUndo: false,
              text: label,
              overrides: {
                showLabel: "text",
                color: "#FF0000", // This sets the line color to red
                linecolor: "#FF0000", // This also sets the line color to red
                backgroundColor: "rgba(255, 0, 0, 0.25)", // Adjust the alpha value accordingly
                textColor: "#FF0000", // This sets the text color to red
              },
            }
          );

          resistanceLines.push(lineEntity);
        }
      });

      // Store the array of entity objects in the ref
      resistanceLineEntityRef.current = resistanceLines;
    } else {
      const entities = resistanceLineEntityRef.current;

      if (entities) {
        entities.forEach((entity) => {
          tvWidget.activeChart().removeEntity(entity);
        });

        // Reset the ref after removal
        resistanceLineEntityRef.current = null;
      }
    }
  }, [tvWidget]);

  const handleFibonacciRetracementButtonClick = useCallback(async () => {
    isDrawingFibRetracementRef.current = !isDrawingFibRetracementRef.current;
    const defaultTimestamp = 1371100000;
    if (isDrawingFibRetracementRef.current) {
      const resisSym = window.location.search.split("=")[1]
        ? decodeURIComponent(window.location.search.split("=")[1])
        : "NEPSE";
      let data;

      if (allSectors.includes(resisSym)) {
        const type = getSectorTypeValue(resisSym);
        data = await makeSaralApiRequest(
          `/sector/get_sectors_fibonacci_retracement/${type}/${defaultTimestamp}`
        );
      } else if (resisSym === "NEPSE") {
        const type = getIndicesTypeValue(resisSym);
        data = await makeSaralApiRequest(
          `/company/get_indices_fibonacci_retracement/${type}/${defaultTimestamp}`
        );
      } else {
        data = await makeSaralApiRequest(
          `/company/get_fibonacci_retracement/${resisSym}/${defaultTimestamp}`
        );
      }
      const fibEntity = tvWidget.activeChart().createMultipointShape(
        [
          { time: data.data[1].t, price: data.data[1].l },
          { time: data.data[0].t, price: data.data[0].h },
        ],
        {
          shape: "fib_retracement",
        }
      );

      fibRetracementEntityRef.current = fibEntity;
    } else {
      const entity = fibRetracementEntityRef.current;

      if (entity) {
        tvWidget.activeChart().removeEntity(entity);
        fibRetracementEntityRef.current = null;
      }
    }
  }, [tvWidget]);

  const handleTrendLineButtonClick = useCallback(async () => {
    isDrawingTrendLineRef.current = !isDrawingTrendLineRef.current;

    if (isDrawingTrendLineRef.current) {
      const from = Date.now() / 1000 - 60 * 24 * 3600; // 30 days ago
      const to = Date.now() / 1000;
      const s = window.location.search.split("=")[1]
        ? decodeURIComponent(window.location.search.split("=")[1])
        : "NEPSE";
      await makeSaralApiRequest(`/company/get_trend_line/${s}`);

      const trendLineEntity = tvWidget.activeChart().createMultipointShape(
        [
          { time: from, price: 2190 },
          { time: to, price: 2200 },
        ],
        {
          shape: "regression_trend",
          // lock: true,
          // disableSelection: true,
          // disableSave: true,
          // disableUndo: true,
          // text: "Trendline",
        }
      );

      trendLineEntityRef.current = trendLineEntity;
    } else {
      const entity = trendLineEntityRef.current;

      if (entity) {
        tvWidget.activeChart().removeEntity(entity);
        trendLineEntityRef.current = null;
      }
    }
  }, [tvWidget]);

  useEffect(() => {
    clearTechnicalStorage();
    widgetOptions = {
      symbol: defaultProps.symbol,
      theme: "Light",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: defaultProps.interval,
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath,
      locale: getLanguageFromURL() || "en",

      // enabled_features: ["drawing_templates"],
      enabled_features: [
        "show_spread_operators",
        "use_localstorage_for_settings",
      ],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      timezone: "Asia/Kathmandu",
      // studies: [
      //   "MACD@tv-basicstudies",
      //   "StochasticRSI@tv-basicstudies",
      //   "TripleEMA@tv-basicstudies",
      // ],
      studies_overrides: {},
      // this code is for modification the chart layout
      // disabled_features: disabledFeatures,
      // enabled_features: enableFeatures,
      // disabled_features: ['header_symbol_search', 'header_compare'],
      // disabled_features: ['header_symbol_search', 'header_compare', 'left_toolbar']
    };

    tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.createDropdown({
        title: "Multi Chart",
        tooltip: "Select Multiple Chart",
        items: [
          {
            title: "One Chart Layout",
            onSelect: () => {
              window.location.href = "/technicalchart";
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" stroke="currentColor"><circle cx="10" cy="10" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path stroke-linecap="square" d="M17.5 7.5l-7 13"/></g></svg>`,
          },
          {
            title: "Two Chart Layout",
            onSelect: () => {
              window.location.href = "/technicalchart2";
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" stroke="currentColor"><circle cx="10" cy="10" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path stroke-linecap="square" d="M17.5 7.5l-7 13"/></g></svg>`,
          },
          {
            title: "Three Chart Layout",
            onSelect: () => {
              window.location.href = "/technicalchart3";
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" stroke="currentColor"><circle cx="10" cy="10" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path stroke-linecap="square" d="M17.5 7.5l-7 13"/></g></svg>`,
          },
          {
            title: "Four Chart Layout",
            onSelect: () => {
              window.location.href = "/technicalchart4";
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" stroke="currentColor"><circle cx="10" cy="10" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path stroke-linecap="square" d="M17.5 7.5l-7 13"/></g></svg>`,
          },
          {
            title: "Six Chart Layout",
            onSelect: () => {
              window.location.href = "/technicalchart6";
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" stroke="currentColor"><circle cx="10" cy="10" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path stroke-linecap="square" d="M17.5 7.5l-7 13"/></g></svg>`,
          },
        ],
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><g fill="none" stroke="currentColor"><circle cx="10" cy="10" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path stroke-linecap="square" d="M17.5 7.5l-7 13"/></g></svg>`,
      });

      tvWidget
        .activeChart()
        .onSymbolChanged()
        .subscribe(null, async ({ name }) => {
          isDrawingSupportRef.current = false;
          isDrawingResistanceRef.current = false;
          isDrawingTrendLineRef.current = false;
          isDrawingFibRetracementRef.current = false;
          if (name == "NEPSE") {
            router.push(`/technicalchart`);
            setSymbol(null);
          } else {
            router.push(`/technicalchart?symbol=${name}`);
            setSymbol(name);
          }
        });

      tvWidget.activeChart().createStudy("MACD");
      // tvWidget.activeChart().createStudy("Relative Strength Index");

      tvWidget.headerReady().then(() => {
        let bar_replay_status = 0;
        const bar_replay = tvWidget.createButton();

        bar_replay.setAttribute("title", "Bar replay");

        bar_replay.addEventListener("click", () => {
          if (bar_replay_status == 0) {
            bar_replay.innerHTML =
              '<div data-role="button" class="button-reABrhVR" style="padding:4px"; display: inline-flex; align-items: center;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"> <path fill="none" stroke="blue" d="M13.5 20V9l-6 5.5 6 5.5zM21.5 20V9l-6 5.5 6 5.5z"></path> </svg> <span style="color: blue">Replay</span> </div>';
            tvWidget
              .activeChart()
              .requestSelectBar()
              .then((time) => {
                localStorage.setItem("bar_replay", time);
                window.location.reload();
              });
          } else {
            bar_replay.innerHTML =
              '<div data-role="button" class="button-reABrhVR" style="padding:4px"; display: inline-flex; align-items: center;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"> <path fill="none" stroke="currentColor" d="M13.5 20V9l-6 5.5 6 5.5zM21.5 20V9l-6 5.5 6 5.5z"></path> </svg> <span>Replay</span> </div>';
            tvWidget.activeChart().cancelSelectBar();
          }

          bar_replay_status = bar_replay_status == 0 ? 1 : 0;
        });

        bar_replay.innerHTML =
          '<div data-role="button" class="button-reABrhVR" style="padding:4px"; display: inline-flex; align-items: center;"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"> <path fill="none" stroke="currentColor" d="M13.5 20V9l-6 5.5 6 5.5zM21.5 20V9l-6 5.5 6 5.5z"></path> </svg> <span>Replay</span> </div>';

        // PLAY

        let bar_replay_controls_status = 0;
        let bar_replay_controls = tvWidget.createButton();
        bar_replay_controls.setAttribute("title", "Play");

        bar_replay_controls.addEventListener("click", () => {
          if (bar_replay_controls_status == 0) {
            Datafeed.bar_replay_start();
            bar_replay_controls.innerHTML =
              '<div data-role="button" class="button-reABrhVR" style="padding:4px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="M10 6h2v16h-2V6ZM9 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V6Zm7 0h2v16h-2V6Zm-1 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V6Z"></path></svg></div>';
          } else {
            Datafeed.bar_replay_stop();
            bar_replay_controls.innerHTML =
              '<div data-role="button" class="button-reABrhVR" style="padding:4px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="m10.997 6.93 7.834 6.628a.58.58 0 0 1 0 .88l-7.834 6.627c-.359.303-.897.04-.897-.44V7.37c0-.48.538-.743.897-.44Zm8.53 5.749a1.741 1.741 0 0 1 0 2.637l-7.834 6.628c-1.076.91-2.692.119-2.692-1.319V7.37c0-1.438 1.616-2.23 2.692-1.319l7.834 6.628Z"></path></svg></div>';
          }

          bar_replay_controls_status = bar_replay_controls_status == 0 ? 1 : 0;
        });

        bar_replay_controls.innerHTML =
          '<div data-role="button" class="button-reABrhVR" style="padding:4px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="m10.997 6.93 7.834 6.628a.58.58 0 0 1 0 .88l-7.834 6.627c-.359.303-.897.04-.897-.44V7.37c0-.48.538-.743.897-.44Zm8.53 5.749a1.741 1.741 0 0 1 0 2.637l-7.834 6.628c-1.076.91-2.692.119-2.692-1.319V7.37c0-1.438 1.616-2.23 2.692-1.319l7.834 6.628Z"></path></svg></div>';

        // FORWARD (STEP)

        var bar_replay_step = tvWidget.createButton();
        bar_replay_step.setAttribute("title", "Forward");

        bar_replay_step.addEventListener("click", () => {
          Datafeed.bar_replay_step();
        });

        bar_replay_step.innerHTML =
          '<div data-role="button" class="button-reABrhVR" style="padding:4px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="M20 6v16h1V6h-1Zm-3.908 7.628L9.834 7.996A.5.5 0 0 0 9 8.368v11.264a.5.5 0 0 0 .834.372l6.258-5.632a.5.5 0 0 0 0-.744Zm.67 1.487a1.5 1.5 0 0 0 0-2.23l-6.259-5.632C9.538 6.384 8 7.07 8 8.368v11.264c0 1.299 1.538 1.984 2.503 1.115l6.258-5.632Z"></path></svg></div>';

        const button = tvWidget.createButton();
        const adjustedButton = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () => {
          const newThemeMode =
            tvWidget.getTheme() === "dark" ? "light" : "dark";

          button.innerHTML = button.innerHTML === "Dark" ? "Light" : "Dark";

          tvWidget.changeTheme(newThemeMode);
        });

        adjustedButton.addEventListener("click", () => {
          setAdjustedMode((prevMode) => {
            fetchDataWithAdjustedMode(prevMode);

            return !prevMode;
          });

          tvWidget.activeChart().setChartType(adjustedMode ? 1 : 0);
        });

        button.innerHTML = themeMode;
        adjustedButton.innerHTML = adjustedMode
          ? "Adjusted Mode"
          : "Unadjusted Mode";
      });
      tvWidget.save(() => {
        console.log("saved");
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [themeMode, adjustedMode, sym, symbol]);

  const pathname = usePathname();

  return (
    <>
      {(pathname == "/technicalchart" || pathname == "/sector") && (
        <>
          <button
            className="bg-transparent hover:bg-green-500 text-green-700 hover:text-white border border-green-500 hover:border-transparent rounded px-4 py-2 m-2"
            onClick={handleSupportButtonClick}
          >
            Support
          </button>

          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent rounded px-4 py-2 m-2"
            onClick={handleResistanceButtonClick}
          >
            Resistance
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white border border-gray-500 hover:border-transparent rounded px-4 py-2 m-2"
            onClick={handleTrendLineButtonClick}
          >
            Trendline
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white border border-gray-500 hover:border-transparent rounded px-4 py-2 m-2"
            onClick={handleFibonacciRetracementButtonClick}
          >
            Fibonacci Retracement
          </button>
        </>
      )}
      <div ref={chartContainerRef} className={`${height}`} />
    </>
  );
};
