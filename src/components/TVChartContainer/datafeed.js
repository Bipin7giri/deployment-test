/* eslint-disable import/no-anonymous-default-export */
import { parseFullSymbol, makeSaralApiRequest } from "./helpers.js";

function getType(sector) {
  const result = {
    "Development Banks": 1,
    "Manufacturing And Processing": 2,
    "Micro Finance": 3,
    "Life Insurance": 4,
    "Mutual Fund": 5,
    "Commercial Banks": 6,
    "Hotels And Tourism": 7,
    Others: 8,
    "Hydro Power": 9,
    "Non Life Insurance": 10,
    Finance: 11,
    Trading: 12,
    Investment: 13,
  };
  return result[sector];
}

let isAdjustedMode = false; // Initial mode

export const fetchDataWithAdjustedMode = (adjustedMode) => {
  isAdjustedMode = adjustedMode;
};

// DatafeedConfiguration implementation
const configurationData = {
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [{ value: "Symbol", name: "Symbol", desc: "Symbol" }],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [
    // { name: 'Indices', value: 'Indices'},
    { name: "Stock", value: "Stock" },
  ],
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: [
    "1",
    "5",
    "15",
    "30",
    "45",
    "1H",
    "2H",
    "3H",
    "4H",
    "1D",
    "1W",
    "1M",
    "3M",
    "6M",
    "12M",
  ],
  // supported_resolutions: ['1D'],
};
let BAR_REPLAY = {
  ON: false,
  STATUS: "stop",
  FINAL: null,
  FUTURE_DATA: [],
  SPEED: 1000,
  INTERVAL: null,
};

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
  const data = await makeSaralApiRequest("/company/get_active_company_name/");

  let companyList = data.data;
  let allSymbols = [
    {
      symbol: "NEPSE",
      full_name: "Nepal Stock Exchange",
      description: "Nepal Stock Exchange",
      exchange: "Indices",
      type: "Indices",
      send_type: 1,
    },
    {
      symbol: "Commercial Banks",
      full_name: "Commercial Banks",
      description: "Commercial Banks",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Commercial Banks",
    },
    {
      symbol: "Development Banks",
      full_name: "Development Banks",
      description: "Development Banks",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Development Banks",
    },
    {
      symbol: "Micro Finance",
      full_name: "Micro Finance",
      description: "Micro Finance",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Micro Finance",
    },
    {
      symbol: "Manufacturing And Processing",
      full_name: "Manufacturing And Processing",
      description: "Manufacturing And Processing",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Manufacturing And Processing",
    },
    {
      symbol: "Life Insurance",
      full_name: "Life Insurance",
      description: "Life Insurance",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Life Insurance",
    },
    {
      symbol: "Mutual Fund",
      full_name: "Mutual Fund",
      description: "Mutual Fund",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Mutual Fund",
    },
    {
      symbol: "Hotels And Tourism",
      full_name: "Hotels And Tourism",
      description: "Hotels And Tourism",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Hotels And Tourism",
    },
    {
      symbol: "Others",
      full_name: "Others",
      description: "Others",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Others",
    },
    {
      symbol: "Hydro Power",
      full_name: "Hydro Power",
      description: "Hydro Power",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Hydro Power",
    },
    {
      symbol: "Non Life Insurance",
      full_name: "Non Life Insurance",
      description: "Non Life Insurance",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Non Life Insurance",
    },
    {
      symbol: "Finance",
      full_name: "Finance",
      description: "Finance",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Finance",
    },

    {
      symbol: "Trading",
      full_name: "Trading",
      description: "Trading",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Trading",
    },
    {
      symbol: "Investment",
      full_name: "Investment",
      description: "Investment",
      exchange: "Sector",
      type: "Sector",
      send_type: "Sector",
      sector: "Investment",
    },
    //   Investment
  ];
  companyList?.forEach((company) => {
    allSymbols.push({
      symbol: company.symbol,
      full_name: company.companyName,
      description: company.companyName,
      exchange: "Stock",
      type: "Stock",
      send_type: company.symbol,
    });
  });

  // console.log(data);
  // for (const exchange of configurationData.exchanges) {
  //     const pairs = data.Data[exchange.value].pairs;

  //     for (const leftPairPart of Object.keys(pairs)) {
  //         const symbols = pairs[leftPairPart].map(rightPairPart => {
  //             const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
  //             return {
  //                 symbol: symbol.short,
  //                 full_name: symbol.full,
  //                 description: symbol.short,
  //                 exchange: "Indices",
  //                 type: 'crypto',
  //             };
  //         });
  //         allSymbols = [...allSymbols, ...symbols];
  //     }
  // }
  return allSymbols;
}

export default {
  onReady: (callback) => {
    // console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    // console.log('[searchSymbols]: Method call', exchange);
    // console.log('usaerinput', userInput);
    const symbols = await getAllSymbols();

    const newSymbols = symbols.filter((symbol) => {
      if (
        symbol?.symbol?.toLowerCase().includes(userInput.toLowerCase()) ||
        symbol?.full_name?.toLowerCase().includes(userInput.toLowerCase())
      )
        return symbol;
    });
    // console.log('[searchSymbols]: Method call Afeter', newSymbols);
    // const newSymbols = symbols.filter((sym) => sym)
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
  ) => {
    // console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(
      (ele) => ele.full_name == symbolName || ele.symbol == symbolName
    );
    if (!symbolItem) {
      // console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback("Cannot resolve symbol");
      return;
    }
    // Symbol information object
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description + " (www.sarallagani.com)",
      type: symbolItem.type,
      timezone: "Asia/Kathmandu",
      intraday_multipliers: ["1", "5", "15", "30", "60", "120", "180", "240"],
      exchange: symbolItem.exchange,
      minmov: 1,
      // has_daily: true,
      has_intraday: true,
      industry: "Stock",
      session: "1100-1505:123456;1",
      // has_weekly_and_monthly: true,
      // weekly_multipliers: true,
      supports_search: true,
      // daily_multipliers: ["1"],
      has_empty_bars: false,
      pricescale: 100,
      has_intraday: true,
      visible_plots_set: "ohlcv",
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: "streaming",
      send_type: symbolItem.send_type,
    };

    // console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const { firstDataRequest } = periodParams;
    const defaultTimetamp = 1371100000;
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);

    if (firstDataRequest) {
      try {
        const type = getType(symbolInfo.full_name);

        let data;
        if (
          resolution.includes("D") ||
          resolution.includes("W") ||
          resolution.includes("M") ||
          resolution.includes("Y")
        ) {
          if (symbolInfo.type === "Sector") {
            data = await makeSaralApiRequest(
              `/sector/chart_data/${type}/1374192000`
            );
          } else {
            if (!isNaN(symbolInfo.send_type)) {
              if (isAdjustedMode) {
                data = await makeSaralApiRequest(
                  `/company/chart_data/${symbolInfo.send_type}/${defaultTimetamp}`
                );
              } else {
                if (symbolInfo.type === "Stock") {
                  data = await makeSaralApiRequest(
                    `/company/get_company_graph_range/${symbolInfo.send_type}/${defaultTimetamp}`
                  );
                } else {
                  data = await makeSaralApiRequest(
                    `/company/chart_data/${symbolInfo.send_type}/${defaultTimetamp}`
                  );
                }
              }
            } else {
              if (isAdjustedMode) {
                data = await makeSaralApiRequest(
                  `/company/chart_data_adjusted/${symbolInfo.send_type}`
                );
              } else {
                data = await makeSaralApiRequest(
                  `/company/get_company_graph_range/${symbolInfo.send_type}/${defaultTimetamp}`
                );
              }
            }
          }
        } else {
          if (symbolInfo.type === "Stock") {
            data = await makeSaralApiRequest(
              `/company/chart_data_resolution/${symbolInfo.name}`
            );
          } else {
            if (symbolInfo.type == "Indices") {
              data = await makeSaralApiRequest(
                `/sector/market_chart_data_minute/${symbolInfo.send_type}/${defaultTimetamp}`
              );
            } else if (symbolInfo.type == "Sector") {
              data = await makeSaralApiRequest(
                `/sector/sector_chart_data_minute/${type}/${defaultTimetamp}`
              );
            } else {
              data = await makeSaralApiRequest(
                `/company/chart_data/${symbolInfo.send_type}/${defaultTimetamp}`
              );
            }
          }
        }
        if (data.status != 200 || data.data.length === 0) {
          // "noData" should be set if there is no data in the requested period
          onHistoryCallback([], { noData: true });
          return;
        }
        let bars = [];
        let nepseData = data.data;
        let nepseREv = nepseData;

        nepseREv.forEach((bar, index, arr) => {
          // if (bar.t >= from && bar.t < to) {
          //Interchanged close and open, data coming wrong on intraday side
          if (Number(resolution)) {
            if (index + 1 !== arr.length) {
              bars = [
                ...bars,
                {
                  time: Number(resolution)
                    ? bar.t * 1000 + 24 * 60 * 60 * 1000
                    : bar.t * 1000 + 24 * 60 * 60 * 1000,
                  open: Number(resolution) ? bar.c : bar.o,
                  close: Number(resolution)
                    ? index == arr.length - 1
                      ? bar.o
                      : arr[index + 1].c
                    : bar.c,
                  low: Number(resolution)
                    ? Math.min(
                        index == arr.length - 1 ? bar.o : arr[index + 1].c,
                        bar.c
                      )
                    : bar.l,
                  high: Number(resolution)
                    ? Math.max(
                        index == arr.length - 1 ? bar.o : arr[index + 1].c,
                        bar.c
                      )
                    : bar.h,
                  volume: Number(resolution) ? 0 : bar.v,
                },
              ];
            }
          } else {
            bars = [
              ...bars,
              {
                time: Number(resolution)
                  ? bar.t * 1000 + 24 * 60 * 60 * 1000
                  : bar.t * 1000 + 24 * 60 * 60 * 1000,
                open: Number(resolution) ? bar.c : bar.o,
                close: Number(resolution)
                  ? index == arr.length - 1
                    ? bar.o
                    : arr[index + 1].c
                  : bar.c,
                low: Number(resolution)
                  ? Math.min(
                      index == arr.length - 1 ? bar.o : arr[index + 1].c,
                      bar.c
                    )
                  : bar.l,
                high: Number(resolution)
                  ? Math.max(
                      index == arr.length - 1 ? bar.o : arr[index + 1].c,
                      bar.c
                    )
                  : bar.h,
                volume: Number(resolution) ? 0 : bar.v,
              },
            ];
          }
          // }
        });
        onHistoryCallback(bars, { noData: false });
        // }
        // onHistoryCallback(bars, { noData: false });
      } catch (error) {
        // console.log('[getBars]: Get error', error);
        onErrorCallback(error);
      }
    } else {
      // Return empty result for subsequent requests as TradingView will cache and reuse the data
      onHistoryCallback([], { noData: true });
    }
  },

  bar_replay_start: () => {
    if (BAR_REPLAY.FUTURE_DATA.length === 0) {
      console.error("No future data available for replay.");
      return;
    }

    BAR_REPLAY.ON = true;
    BAR_REPLAY.STATUS = "start";

    const playNextCandle = () => {
      if (!BAR_REPLAY.ON) return; // Check if replay is still on

      const candle = BAR_REPLAY.FUTURE_DATA.shift();

      if (candle) {
        // Ensure the callback is properly invoked with candle data
        if (SUBSCRIPTIONS.has("callback")) {
          SUBSCRIPTIONS.get("callback")({
            time: candle.time * 1000, // Ensure time is in milliseconds
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close,
          });
        } else {
          console.error("Callback not found in subscriptions.");
        }

        // Schedule the next candle
        BAR_REPLAY.INTERVAL = setTimeout(playNextCandle, BAR_REPLAY.SPEED);
      } else {
        BAR_REPLAY.ON = false; // Stop replay if no more candles
        console.log("Replay finished.");
      }
    };

    playNextCandle(); // Start playing the first candle
  },

  bar_replay_stop: () => {
    BAR_REPLAY.STATUS = "stop";
    BAR_REPLAY.ON = false;
    clearTimeout(BAR_REPLAY.INTERVAL); // Clear the timeout
    console.log("Replay stopped.");
  },

  bar_replay_step: () => {
    clearTimeout(BAR_REPLAY.INTERVAL); // Stop any running timeout

    if (!BAR_REPLAY.FUTURE_DATA.length) {
      console.log("No more candles to step through.");
      return;
    }

    const candle = BAR_REPLAY.FUTURE_DATA.shift(); // Get the next candle

    if (candle) {
      if (SUBSCRIPTIONS.has("callback")) {
        SUBSCRIPTIONS.get("callback")({
          time: candle.time * 1000, // Ensure time is in milliseconds
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        });
      } else {
        console.error("Callback not found in subscriptions.");
      }
    }
  },

  bar_replay_set_speed: (speed) => {
    BAR_REPLAY.SPEED = speed; // Update the speed
    console.log(`Replay speed set to: ${speed}`);

    if (BAR_REPLAY.ON) {
      clearTimeout(BAR_REPLAY.INTERVAL);
      if (BAR_REPLAY.STATUS === "start") {
        bar_replay_start(); // Restart the replay to apply the new speed
      }
    }
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      symbolInfo,
      resolution,
      subscriberUID
    );
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
  },
};
