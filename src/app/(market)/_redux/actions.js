const entities = "[market]";

const marketActions = {
  GET_LIVE_MARKET_DATA: `${entities} GET_LIVE_MARKET_DATA`,
  liveMarketData: () => ({
    type: marketActions.GET_LIVE_MARKET_DATA,
  }),
  GET_CAPITALIZATION_LOGIC: `${entities} GET_CAPITALIZATION_LOGIC`,
  getCapitalizationLogic: () => ({
    type: marketActions.GET_CAPITALIZATION_LOGIC,
  }),

  GET_FILTER_MARKET_LIVE_DATA: `${entities} GET_FILTER_MARKET_LIVE_DATA`,
  getFilterMarketLiveData: (payload) => ({
    type: marketActions.GET_FILTER_MARKET_LIVE_DATA,
    payload,
  }),

  GET_FLOORSHEET_DATA: `${entities} GET_FLOORSHEET_DATA`,
  getFloorsheetData: (payload) => ({
    type: marketActions.GET_FLOORSHEET_DATA,
    payload,
  }),

  GET_BROKER_STOCK_BUYING: `${entities} GET_BROKER_STOCK_BUYING`,
  getBrokerStockBuying: (payload) => ({
    type: marketActions.GET_BROKER_STOCK_BUYING,
    payload,
  }),

  GET_BROKER_STOCK_SELLING: `${entities} GET_BROKER_STOCK_SELLING`,
  getBrokerStockSelling: (payload) => ({
    type: marketActions.GET_BROKER_STOCK_SELLING,
    payload,
  }),

  GET_ALL_BROKER_DATA_BY_SYMBOL: `${entities} GET_ALL_BROKER_DATA_BY_SYMBOL`,
  getAllBrokerDataBySymbol: (payload) => ({
    type: marketActions.GET_ALL_BROKER_DATA_BY_SYMBOL,
    payload,
  }),

  GET_STOCK_BUYING_BROKER_BY_SYMBOL: `${entities} GET_STOCK_BUYING_BROKER_BY_SYMBOL`,
  getStockBuyingBrokerBySymbol: (payload) => ({
    type: marketActions.GET_STOCK_BUYING_BROKER_BY_SYMBOL,
    payload,
  }),

  GET_STOCK_SELLING_BROKER_BY_SYMBOL: `${entities} GET_STOCK_SELLING_BROKER_BY_SYMBOL`,
  getStockSellingBrokerBySymbol: (payload) => ({
    type: marketActions.GET_STOCK_SELLING_BROKER_BY_SYMBOL,
    payload,
  }),

  GET_STOCK_DETAILS_BY_SECTOR: `${entities} GET_STOCK_DETAILS_BY_SECTOR`,
  getStockDetailsBySector: (payload) => ({
    type: marketActions.GET_STOCK_DETAILS_BY_SECTOR,
    payload,
  }),

  GET_HEAT_MAP_DATA: `${entities} GET_HEAT_MAP_DATA`,
  getHeatMapData: (payload) => ({
    type: marketActions.GET_HEAT_MAP_DATA,
    payload,
  }),
  GET_HEAT_MAP_DATA_BY_SECTOR: `${entities} GET_HEAT_MAP_DATA_BY_SECTOR`,
  getHeatMapDataBySector: (payload) => ({
    type: marketActions.GET_HEAT_MAP_DATA_BY_SECTOR,
    payload,
  }),

  GET_SECTOR_CHART_DATA: `${entities} GET_SECTOR_CHART_DATA`,
  getSectorChartData: (payload) => ({
    type: marketActions.GET_SECTOR_CHART_DATA,
    payload,
  }),

  GET_NEPSE_CHART_DATA: `${entities} GET_NEPSE_CHART_DATA`,
  getNepseChartData: (payload) => ({
    type: marketActions.GET_NEPSE_CHART_DATA,
    payload,
  }),

  GET_NRB_TRANSACTION_DATA: `${entities} GET_NRB_TRANSACTION_DATA`,
  getNrbTransactionData: (payload) => ({
    type: marketActions.GET_NRB_TRANSACTION_DATA,
    payload,
  }),

  GET_PRODUCTWISE_LOAN: `${entities} GET_PRODUCTWISE_LOAN`,
  getProductWiseLoan: (payload) => ({
    type: marketActions.GET_PRODUCTWISE_LOAN,
    payload,
  }),

  GET_DIVIDEND_CHECKER: `${entities} GET_DIVIDEND_CHECKER`,
  getDividendChecker: (payload) => ({
    type: marketActions.GET_DIVIDEND_CHECKER,
    payload,
  }),

  GET_AGM_SGM: `${entities} GET_AGM_SGM`,
  getAgmSgm: (payload) => ({
    type: marketActions.GET_AGM_SGM,
    payload,
  }),
};
export default marketActions;
